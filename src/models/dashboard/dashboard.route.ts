import express from "express";
import { DashboardController } from "./dashboard.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/analytics",
  auth("admin", "organizer"),
  DashboardController.getAnalytics
);

export const DashboardRoutes = router;
