import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MenubarService } from "./menubar.service";
import { StatusCodes } from "http-status-codes";

const createMenubar = catchAsync(async (req: Request, res: Response) => {
  const result = await MenubarService.createMenubar(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Menubar created successfully",
    data: result,
  });
});

const getAllMenubars = catchAsync(async (req: Request, res: Response) => {
  const result = await MenubarService.getAllMenubars();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Menubars retrieved successfully",
    data: result,
  });
});

const updateMenubar = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MenubarService.updateMenubar(id as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Menubar updated successfully",
    data: result,
  });
});

const deleteMenubar = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MenubarService.deleteMenubar(id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Menubar deleted successfully",
    data: result,
  });
});

export const MenubarController = {
  createMenubar,
  getAllMenubars,
  updateMenubar,
  deleteMenubar,
};
