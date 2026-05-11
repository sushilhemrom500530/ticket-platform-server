import express from "express";
import { PaymentController } from "./payment.controller";
import { PaymentValidation } from "./payment.validation";
import validateRequest from "../../shared/validateRequest";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create",
  auth("admin", "user", "organizer"),
  validateRequest(PaymentValidation.createPaymentSchema),
  PaymentController.createPayment
);

router.post(
  "/verify",
  auth("admin", "user", "organizer"),
  validateRequest(PaymentValidation.verifyPaymentSchema),
  PaymentController.verifyPayment
);

export const PaymentRoutes = router;
