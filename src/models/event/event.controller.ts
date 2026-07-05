import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EventService } from "./event.service";
import { StatusCodes } from "http-status-codes";

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const eventData = { ...req.body };

  const files: any = req.body.files || {};

  if (files.image) {
    eventData.image = Array.isArray(files.image) ? files.image[0] : files.image;
  } else if (!eventData.image) {
    eventData.image = "https://placehold.co/600x400?text=Event+Image";
  }

  if (files["organizers.photo"] && Array.isArray(eventData.organizers)) {
    const orgPhotos = Array.isArray(files["organizers.photo"])
      ? files["organizers.photo"]
      : [files["organizers.photo"]];

    let photoIndex = 0;
    eventData.organizers.forEach((organizer: any) => {
      if (photoIndex < orgPhotos.length) {
        organizer.photo = orgPhotos[photoIndex];
        photoIndex++;
      }
    });
  }


  if (files["performers.profilePhoto"] && Array.isArray(eventData.performers)) {
    const perfPhotos = Array.isArray(files["performers.profilePhoto"])
      ? files["performers.profilePhoto"]
      : [files["performers.profilePhoto"]];

    let photoIndex = 0;
    eventData.performers.forEach((performer: any) => {
      if (photoIndex < perfPhotos.length) {
        performer.profilePhoto = perfPhotos[photoIndex];
        photoIndex++;
      }
    });
  }

  const result = await EventService.createEvent(eventData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Event created successfully",
    data: result,
  });
});

const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.getAllEvents(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Events retrieved successfully",
    data: result,
  });
});

const getSingleEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EventService.getSingleEvent(id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Event fetched successfully",
    data: result,
  });
});

const getSingleEventWithUsers = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EventService.getSingleEventWithUsers(
    id as string,
    req.query as any
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Event fetched successfully",
    data: result,
  });
});

const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const eventData = { ...req.body };
  const files: any = req.body.files || {};

  if (files.image) {
    eventData.image = Array.isArray(files.image) ? files.image[0] : files.image;
  }

  if (files["organizers.photo"] && Array.isArray(eventData.organizers)) {
    const orgPhotos = Array.isArray(files["organizers.photo"])
      ? files["organizers.photo"]
      : [files["organizers.photo"]];

    let photoIndex = 0;
    eventData.organizers.forEach((organizer: any) => {
      if (photoIndex < orgPhotos.length) {
        organizer.photo = orgPhotos[photoIndex];
        photoIndex++;
      }
    });
  }

  if (files["performers.profilePhoto"] && Array.isArray(eventData.performers)) {
    const perfPhotos = Array.isArray(files["performers.profilePhoto"])
      ? files["performers.profilePhoto"]
      : [files["performers.profilePhoto"]];

    let photoIndex = 0;
    eventData.performers.forEach((performer: any) => {
      if (photoIndex < perfPhotos.length) {
        performer.profilePhoto = perfPhotos[photoIndex];
        photoIndex++;
      }
    });
  }

  const result = await EventService.updateEvent(id as string, eventData as any);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Event updated successfully",
    data: result,
  });
});

const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EventService.deleteEvent(id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Event deleted successfully",
    data: result,
  });
});

export const EventController = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  getSingleEventWithUsers,
  updateEvent,
  deleteEvent,
};
