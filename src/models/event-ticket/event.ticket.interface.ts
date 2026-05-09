import { Types } from "mongoose";

export interface IEventTicket {
    event: Types.ObjectId;

    user: Types.ObjectId;

    ticketNumber: string;

    qrCode: string;

    status:
    | "pending"
    | "paid"
    | "checked_in"
    | "cancelled"
    | "expired";

    isUsed: boolean;

    usedAt?: Date;

    price: number;

    paymentId?: string;

    transactionId?: string;
}