import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { JwtUserPayload } from "../../middlewares/auth";
import { EventTicketService } from "./event.ticket.service";

const checkEventJoined = catchAsync(
    async (req: Request, res: Response) => {
        const { id: userId } = req.user as JwtUserPayload;

        const result =
            await EventTicketService.checkEventJoined(
                req.params.id as string,
                userId as string,
            );

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Event joined checked successfully",
            data: result,
        });
    }
);

const purchaseTicket = catchAsync(
    async (req: Request, res: Response) => {
        const { id: userId } = req.user as JwtUserPayload;

        const result =
            await EventTicketService.purchaseTicket(
                userId,
                req.body
            );

        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: "Ticket purchased successfully",
            data: result,
        });
    }
);

const verifyTicket = catchAsync(
    async (req: Request, res: Response) => {
        const { ticketNumber } = req.params;

        const result =
            await EventTicketService.verifyTicket(
                ticketNumber as string
            );

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Ticket verified successfully",
            data: result,
        });
    }
);

const checkInTicket = catchAsync(
    async (req: Request, res: Response) => {
        const { ticketNumber } = req.params;

        const result =
            await EventTicketService.checkInTicket(
                ticketNumber as string
            );

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Ticket checked in successfully",
            data: result,
        });
    }
);

const getAllTicket = catchAsync(
    async (req: Request, res: Response) => {
        const result = await EventTicketService.getAllTicket(req.query as any);

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Tickets retrieved successfully",
            data: result,
        });
    }
);

const myTickets = catchAsync(
    async (req: Request, res: Response) => {
        const { id: userId } = req.user as JwtUserPayload;

        const result =
            await EventTicketService.myTickets(userId);

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "My tickets retrieved successfully",
            data: result,
        });
    }
);

const getTicketById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id: userId } = req.user as JwtUserPayload;

    const result = await EventTicketService.getTicketById(
        id as string,
        userId as string
    );

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Ticket retrieved successfully",
        data: result,
    });
});

export const EventTicketController = {
    checkEventJoined,
    purchaseTicket,
    verifyTicket,
    getTicketById,
    checkInTicket,
    myTickets,
    getAllTicket,
};