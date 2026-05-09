import { Document, Types } from "mongoose";

export interface IEventJoinUser extends Document {
    event: Types.ObjectId;
    user: Types.ObjectId;
    status: "Pending" | "Accepted" | "Rejected";
    ticketNumber: string;
    qrCode: string;

    createdAt?: Date;
    updatedAt?: Date;
}
