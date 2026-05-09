import { model, Schema } from "mongoose";
import { IEventTicket } from "./event.join.user.interface";

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
                "refunded",
            ],
            default: "pending",
            index: true,
        },

        isUsed: {
            type: Boolean,
            default: false,
            index: true,
        },

        usedAt: {
            type: Date,
        },

        checkedInBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        paymentId: {
            type: String,
        },

        transactionId: {
            type: String,
            index: true,
        },

        quantity: {
            type: Number,
            default: 1,
            min: 1,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        currency: {
            type: String,
            default: "BDT",
        },

        purchaseDate: {
            type: Date,
            default: Date.now,
        },

        expiresAt: {
            type: Date,
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