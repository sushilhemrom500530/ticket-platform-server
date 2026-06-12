import express from "express";
import { MenubarValidation } from "./menubar.validation";
import { MenubarController } from "./menubar.controller";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../shared/validateRequest";

const router = express.Router();

router.post(
  "/create",
  auth("admin"),
  validateRequest(MenubarValidation.createMenubarZodSchema),
  MenubarController.createMenubar
);

router.get("/get-all", MenubarController.getAllMenubars);

router.patch(
  "/update/:id",
  auth("admin"),
  validateRequest(MenubarValidation.updateMenubarZodSchema),
  MenubarController.updateMenubar
);

router.delete(
  "/delete/:id",
  auth("admin"),
  MenubarController.deleteMenubar
);

export const MenubarRoutes = router;
