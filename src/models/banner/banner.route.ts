import express from "express";
import { BannerValidation } from "./banner.validation";
import { BannerController } from "./banner.controller";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../shared/validateRequest";
import { multiUploadHandler } from "../../middlewares/fileUploadHandler";

const router = express.Router();

router.post(
  "/create",
  auth("admin"),
  multiUploadHandler([{ name: "image", maxCount: 1 }]),
  (req, res, next) => {
    if (req.body && req.body.data) {
      const files = (req.body as any).files;
      req.body = JSON.parse(req.body.data);
      if (files) {
        (req.body as any).files = files;
      }
    }
    next();
  },
  validateRequest(BannerValidation.createBannerZodSchema),
  BannerController.createBanner
);

router.get("/get-all", BannerController.getAllBanners);

router.patch(
  "/update/:id",
  auth("admin", "user"),
  multiUploadHandler([{ name: "image", maxCount: 1 }]),
  (req, res, next) => {
    if (req.body && req.body.data) {
      const files = (req.body as any).files;
      req.body = JSON.parse(req.body.data);
      if (files) {
        (req.body as any).files = files;
      }
    }
    next();
  },
  validateRequest(BannerValidation.updateBannerZodSchema),
  BannerController.updateBanner
);

router.delete(
  "/delete/:id",
  auth("admin"),
  BannerController.deleteBanner
);

export const BannerRoutes = router;
