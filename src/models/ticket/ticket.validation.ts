import { z } from "zod";

const purchaseTicket = z.object({
  body: z.object({
    eventId: z.string({ required_error: "Event ID is required" }),
    quantity: z.number({ required_error: "Quantity is required" }).min(1),
  }),
});

export const ticketValidation = {
  purchaseTicket,
};
