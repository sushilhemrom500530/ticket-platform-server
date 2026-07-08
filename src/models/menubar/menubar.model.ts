import { model, Schema } from "mongoose";
import { IMenubar } from "./menubar.interface";

const menubarSchema = new Schema<IMenubar>(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    href: {
      type: String,
      required: true,
      trim: true,
    },
    isEvent: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Menubar = model<IMenubar>("Menubar", menubarSchema);
