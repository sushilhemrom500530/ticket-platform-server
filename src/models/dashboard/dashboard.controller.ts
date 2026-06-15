import { Request, Response } from "express";
import { DashboardService } from "./dashboard.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const getAnalytics = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.getAnalytics();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Analytics fetched successfully",
    data: result,
  });
});

export const DashboardController = {
  getAnalytics,
};
