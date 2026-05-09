import { Types } from "mongoose";

export type TicketStatus =
    | "pending"
    | "paid"
    | "checked_in"
    | "cancelled"
    | "expired"
    | "refunded";

export interface IEventTicket {
    event: Types.ObjectId;

    user: Types.ObjectId;

    ticketNumber: string;

    qrCode: string;

    status: TicketStatus;

    isUsed: boolean;

    usedAt?: Date;

    checkedInBy?: Types.ObjectId;

    paymentId?: string;

    transactionId?: string;

    quantity: number;

    price: number;

    currency: string;

    purchaseDate: Date;

    expiresAt?: Date;
}