import { EventTicket } from "../event-ticket/event.ticket.model";
import { Payment } from "./payment.model";
import { BkashService } from "./bkash.service";
import { NagadService } from "./nagad.service";
import AppError from "../../errors/AppError";
import httpStatus from "http-status-codes";
import { Event } from "../event/event.model";
import { generateTicketNumber } from "../../utils/generateTicketNumber";
import { generateQRCode } from "../../utils/generateQRCode";

export const PaymentService = {
  createPaymentIntent: async (
    userId: string,
    eventId: string,
    quantity: number,
    method: "bkash" | "nagad",
    callbackURL: string
  ) => {
    // 1. Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      throw new AppError(httpStatus.NOT_FOUND, "Event not found");
    }

    if (!event.isPremium) {
      throw new AppError(httpStatus.BAD_REQUEST, "Free events do not require payment");
    }

    // 2. Check ticket availability
    if (event.soldTickets + quantity > event.totalTickets) {
      throw new AppError(httpStatus.BAD_REQUEST, "Not enough tickets available");
    }

    const unitPrice = event.price || 0;
    const vat = unitPrice * 0.05 * quantity; // Mock 5% VAT
    const serviceCharge = 20 * quantity; // Mock 20 BDT service charge per ticket
    const totalFare = (unitPrice * quantity) + vat + serviceCharge;

    // 3. Generate ticket number and QR
    const ticketNumber = generateTicketNumber();
    const qrCode = await generateQRCode(ticketNumber);

    // 4. Create pending ticket
    const ticket = await EventTicket.create({
      event: event._id,
      user: userId,
      ticketNumber,
      qrCode,
      status: "pending",
      price: unitPrice,
      quantity,
      vat,
      serviceCharge,
      totalFare,
      pnrNumber: ticketNumber.substring(0, 10).toUpperCase(),
    });

    // 5. Create pending payment record
    const payment = await Payment.create({
      user: userId,
      event: event._id,
      ticket: ticket._id,
      transactionId: `TXN_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      method,
      amount: totalFare,
      status: "pending",
    });

    let gatewayResponse;

    // 6. Initiate payment with respective gateway
    if (method === "bkash") {
      gatewayResponse = await BkashService.createPayment(
        payment.amount,
        payment.transactionId,
        callbackURL
      );
    } else if (method === "nagad") {
      gatewayResponse = await NagadService.createPayment(
        payment.amount,
        payment.transactionId,
        callbackURL
      );
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid payment method");
    }

    // Update payment with intent/ref id
    payment.paymentIntent =
      method === "bkash"
        ? (gatewayResponse as any).paymentID
        : (gatewayResponse as any).paymentRefId;
    await payment.save();

    return {
      payment,
      ticketId: ticket._id,
      redirectURL: gatewayResponse?.redirectURL,
    };
  },

  verifyPayment: async (
    paymentIntent: string,
    method: "bkash" | "nagad"
  ) => {
    const payment = await Payment.findOne({ paymentIntent });
    if (!payment) {
      throw new AppError(httpStatus.NOT_FOUND, "Payment intent not found");
    }

    if (payment.status === "paid") {
      return payment;
    }

    let verificationResult;
    if (method === "bkash") {
      verificationResult = await BkashService.executePayment(paymentIntent);
    } else if (method === "nagad") {
      verificationResult = await NagadService.verifyPayment(paymentIntent);
    }

    if (verificationResult?.status === "Completed" || verificationResult?.status === "Success") {
      payment.status = "paid";
      payment.paidAt = new Date();
      payment.transactionId = (verificationResult as any).trxID || (verificationResult as any).trxId || payment.transactionId;
      await payment.save();

      // Update ticket status and event sold tickets
      if (payment.ticket) {
        const ticket = await EventTicket.findByIdAndUpdate(payment.ticket, {
          status: "paid",
          paymentId: payment._id,
          transactionId: payment.transactionId,
        });

        if (ticket) {
          await Event.findByIdAndUpdate(payment.event, {
            $inc: { soldTickets: ticket.quantity }
          });
        }
      }

      return payment;
    }

    payment.status = "failed";
    await payment.save();
    throw new AppError(httpStatus.BAD_REQUEST, "Payment verification failed");
  },
};
