import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BannerService } from "./banner.service";
import { StatusCodes } from "http-status-codes";

const createBanner = catchAsync(async (req: Request, res: Response) => {
  const result = await BannerService.createBanner(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Banner created successfully",
    data: result,
  });
});

const getAllBanners = catchAsync(async (req: Request, res: Response) => {
  const result = await BannerService.getAllBanners();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Banners retrieved successfully",
    data: result,
  });
});

const updateBanner = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BannerService.updateBanner(id as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Banner updated successfully",
    data: result,
  });
});

const deleteBanner = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BannerService.deleteBanner(id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Banner deleted successfully",
    data: result,
  });
});

export const BannerController = {
  createBanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
};
