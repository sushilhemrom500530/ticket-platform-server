import AppError from "../../errors/AppError";
import { IBanner } from "./banner.interface";
import { Banner } from "./banner.model";
import { StatusCodes } from "http-status-codes";

const createBanner = async (payload: IBanner) => {
  const result = await Banner.create(payload);
  return result;
};

const getAllBanners = async () => {
  const result = await Banner.find().sort({ createdAt: -1 });
  return result;
};

const updateBanner = async (id: string, payload: Partial<IBanner>) => {
  const result = await Banner.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Banner not found!");
  }
  return result;
};

const deleteBanner = async (id: string) => {
  const result = await Banner.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Banner not found!");
  }
  return result;
};

export const BannerService = {
  createBanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
};
