import { IMenubar } from "./menubar.interface";
import { Menubar } from "./menubar.model";
import ApiError from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";

const createMenubar = async (payload: IMenubar) => {
  const result = await Menubar.create(payload);
  return result;
};

const getAllMenubars = async () => {
  const result = await Menubar.find().sort({ order: 1, createdAt: 1 });
  return result;
};

const updateMenubar = async (id: string, payload: Partial<IMenubar>) => {
  const result = await Menubar.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Menubar not found!");
  }
  return result;
};

const deleteMenubar = async (id: string) => {
  const result = await Menubar.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Menubar not found!");
  }
  return result;
};

export const MenubarService = {
  createMenubar,
  getAllMenubars,
  updateMenubar,
  deleteMenubar,
};
