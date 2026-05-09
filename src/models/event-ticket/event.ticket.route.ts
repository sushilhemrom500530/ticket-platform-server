import express from "express";
import { EventTicketController } from "./event.ticket.controller";
import { auth } from "./../../middlewares/auth";
import validateRequest from "./../../shared/validateRequest";
import { eventTicketValidation } from "./event.ticket.validation";

const router = express.Router();

router.post(
    "/",
    auth("admin", "parent", "teen"),
    validateRequest(eventTicketValidation.createEventTicket),
    EventTicketController.createEventTicket
);

router.get("/", auth("admin", "parent", "teen"), EventTicketController.getAllEventTickets);

router.get("/:id", auth("admin", "parent", "teen"), EventTicketController.getSingleEventTicket);

router.put("/:id", auth("admin", "parent", "teen"), validateRequest(eventTicketValidation.updateEventTicket), EventTicketController.updateEventTicket);

router.delete("/:id", auth("admin"), EventTicketController.deleteEventTicket);

export const EventTicketRoutes = router;