import { model, Schema } from "mongoose";
import { IEventTicket } from "./event.ticket.interface";

const eventTicketSchema = new Schema<IEventTicket>(
    {
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
            index: true,
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        ticketNumber: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        qrCode: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "paid",
                "checked_in",
                "cancelled",
                "expired",
            ],
            default: "paid",
        },

        isUsed: {
            type: Boolean,
            default: false,
        },

        usedAt: {
            type: Date,
        },

        paymentId: {
            type: String,
        },

        transactionId: {
            type: String,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const EventTicket = model<IEventTicket>(
    "EventTicket",
    eventTicketSchema
);