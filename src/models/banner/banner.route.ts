import express from "express";
import { BannerValidation } from "./banner.validation";
import { BannerController } from "./banner.controller";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../shared/validateRequest";

const router = express.Router();

router.post(
  "/create",
  auth("admin"),
  validateRequest(BannerValidation.createBannerZodSchema),
  BannerController.createBanner
);

router.get("/get-all", BannerController.getAllBanners);

router.patch(
  "/update/:id",
  auth("admin", "user"),
  validateRequest(BannerValidation.updateBannerZodSchema),
  BannerController.updateBanner
);

router.delete(
  "/delete/:id",
  auth("admin"),
  BannerController.deleteBanner
);

export const BannerRoutes = router;
