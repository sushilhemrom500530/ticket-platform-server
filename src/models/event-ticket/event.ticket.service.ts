import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { Event } from "../event/event.model";
import { generateTicketNumber } from "../../utils/generateTicketNumber";
import { generateQRCode } from "../../utils/generateQRCode";
import { EventTicket } from "./event.ticket.model";

const checkEventJoined = async (
    eventId: string,
    userId: string
) => {
    const ticket = await EventTicket.findOne({
        event: eventId,
        user: userId,
        status: { $in: ["paid", "pending"] }, // optional
    }).select("_id ticketNumber status");

    return {
        isJoined: !!ticket,
        ticket,
    };
};

const purchaseTicket = async (
    userId: string,
    payload: {
        eventId: string;
        paymentId?: string;
        transactionId?: string;
    }
) => {
    // Find event
    const event = await Event.findById(payload.eventId);

    if (!event) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "Event not found"
        );
    }

    // Generate ticket number
    const ticketNumber = generateTicketNumber();

    // Generate QR code
    const qrCode = await generateQRCode(ticketNumber);

    // Create ticket
    const ticket = await EventTicket.create({
        event: payload.eventId,
        user: userId,

        ticketNumber,
        qrCode,

        status: "paid",

        isUsed: false,

        price: event.price || 0,

        paymentId: payload.paymentId,

        transactionId: payload.transactionId,
    });

    return ticket;
};

const verifyTicket = async (ticketNumber: string) => {
    const ticket = await EventTicket.findOne({
        ticketNumber,
    })
        .populate("event")
        .populate("user");

    if (!ticket) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "Invalid ticket"
        );
    }

    return ticket;
};

const checkInTicket = async (ticketNumber: string) => {
    const ticket = await EventTicket.findOne({
        ticketNumber,
    });

    if (!ticket) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "Invalid ticket"
        );
    }

    if (ticket.isUsed) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "Ticket already used"
        );
    }

    ticket.isUsed = true;

    ticket.entryStatus = "checked_in";

    ticket.usedAt = new Date();

    await ticket.save();

    return ticket;
};

const getAllTicket = async (query: any) => {
    const filter: Record<string, unknown> = {
        status: "paid"
    };

    if (query.eventId) {
        filter.event = query.eventId;
    }

    if (query.userId) {
        filter.user = query.userId;
    }

    if (query.status) {
        filter.status = query.status;
    }

    const result = await EventTicket.find(filter)
        .populate("event")
        .sort({ createdAt: -1 });

    return result;
};

const myTickets = async (userId: string) => {
    const result = await EventTicket.find({
        user: userId,
    })
        .populate("event")
        .sort({ createdAt: -1 });

    return result;
};

const getTicketById = async (id: string, userId: string) => {
    const ticket = await EventTicket.findOne({ _id: id, user: userId })
        .populate("event")
        .populate("user");

    if (!ticket) {
        throw new AppError(StatusCodes.NOT_FOUND, "Ticket not found");
    }

    return ticket;
};

export const EventTicketService = {
    checkEventJoined,
    purchaseTicket,
    verifyTicket,
    getTicketById,
    checkInTicket,
    myTickets,
    getAllTicket,
};