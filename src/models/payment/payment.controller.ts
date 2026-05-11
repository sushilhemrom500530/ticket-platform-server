import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { PaymentService } from "./payment.service";
import { JwtUserPayload } from "../../middlewares/auth";

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const { eventId, quantity, method, callbackURL } = req.body;
  const { id: userId } = req.user as JwtUserPayload;

  const result = await PaymentService.createPaymentIntent(
    userId,
    eventId,
    quantity,
    method,
    callbackURL
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initiated successfully",
    data: result,
  });
});

const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  const { paymentIntent, method } = req.body;

  const result = await PaymentService.verifyPayment(paymentIntent, method);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment verified successfully",
    data: result,
  });
});

export const PaymentController = {
  createPayment,
  verifyPayment,
};
