import { model, Schema } from "mongoose";
import { IEvent } from "./event.interface";

const organizerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  photo: {
    type: String,
    required: false
  },
},);

const performerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  passion: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  profilePhoto: {
    type: String,
    required: false
  },
},);

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    },
    totalTickets: {
      type: Number,
      required: true,
      min: 1,
    },
    soldTickets: {
      type: Number,
      default: 0,
    },
    organizers: [organizerSchema],
    performers: [performerSchema],
  },
  { timestamps: true }
);

export const Event = model<IEvent>("Event", eventSchema);
