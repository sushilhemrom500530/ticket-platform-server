import { Document, Types } from "mongoose";

export interface IOrganizer {
  name: string;
  contactNumber: string;
  address: string;
  description?: string;
  photo?: string;
}

export interface IPerformer {
  name: string;
  contactNumber: string;
  address: string;
  passion: string;
  bio: string;
  description?: string;
  profilePhoto?: string;
}

export interface IEvent extends Document {
  title: string;
  description: string;
  categoryId: Types.ObjectId;
  date: Date;
  location: string;
  image: string;
  isPremium: boolean;
  price?: number;
  totalTickets: number;
  soldTickets: number;

  organizers: IOrganizer[];
  performers: IPerformer[];

  createdAt?: Date;
  updatedAt?: Date;
}