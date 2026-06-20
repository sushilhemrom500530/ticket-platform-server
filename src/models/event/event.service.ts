import { Event } from "./event.model";
import AppError from "./../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { Category } from "../category/category.model";
import { EventTicket } from "../event-ticket/event.ticket.model";
import { Types } from "mongoose";

const createEvent = async (payload: any) => {
  const result = await Event.create(payload);
  return result;
};

const getAllEvents = async (query: any) => {
  const {
    category,
    isPremium,
    search,
    limit = 10,
    page = 1,
  } = query;

  const filter: any = {};

  // category wise filter
  if (query.categoryId) {
    const idsArray = typeof query.categoryId === 'string' ? query.categoryId.split(',') : query.categoryId;
    filter.categoryId = { $in: idsArray };
  } else if (category) {
    const categoriesArray = typeof category === 'string' ? category.split(',') : category;
    const categoryData = await Category.find({
      name: { $in: categoriesArray.map((c: string) => new RegExp(`^${c}$`, 'i')) },
    });
    if (categoryData.length > 0) {
      filter.categoryId = { $in: categoryData.map(c => c._id) };
    }
  }

  // premium filter
  if (isPremium !== undefined && isPremium !== "" && isPremium !== "all") {
    const typesArray = typeof isPremium === 'string' ? isPremium.split(',') : [isPremium];
    if (typesArray.includes("true") && typesArray.includes("false")) {
      // both selected, no filter needed
    } else if (typesArray.includes("true")) {
      filter.isPremium = true;
    } else if (typesArray.includes("false")) {
      filter.isPremium = false;
    }
  }

  // search filter
  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const events = await Event.find(filter)
    .populate("categoryId")
    .skip(skip)
    .limit(Number(limit))
    .sort({ date: 1 })
    .lean();

  const total = await Event.countDocuments(filter);

  return {
    meta: {
      totalResult: total,
      currentPage: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
    results: events,
  };
};

const getSingleEvent = async (id: string) => {
  const result = await Event.findById(id).populate("categoryId").lean();
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Event not found");
  }
  return result;
};

const getSingleEventWithUsers = async (
  eventId: string,
  query: Record<string, any>
) => {
  const {
    searchTerm,
    page = 1,
    limit = 10,
    status,
    ticketNumber,
  } = query;

  const event = await Event.findById(eventId)
    .populate("categoryId")
    .lean();

  if (!event) {
    throw new AppError(StatusCodes.NOT_FOUND, "Event not found");
  }

  const skip = (Number(page) - 1) * Number(limit);

  const ticketFilter: any = {
    event: new Types.ObjectId(eventId),
  };

  if (status) {
    ticketFilter.status = status;
  }

  if (ticketNumber) {
    ticketFilter.ticketNumber = {
      $regex: ticketNumber,
      $options: "i",
    };
  }

  const tickets = await EventTicket.find(ticketFilter)
    .populate({
      path: "user",
      select: "name email phone profileImage",
      match: searchTerm
        ? {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } },
            { phone: { $regex: searchTerm, $options: "i" } },
          ],
        }
        : {},
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .lean();

  // remove tickets where user didn't match search
  const filteredTickets = tickets.filter((ticket) => ticket.user);

  const total = await EventTicket.countDocuments(ticketFilter);

  return {
    event,
    attendees: filteredTickets,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
  };
};

const updateEvent = async (id: string, payload: any) => {
  const result = await Event.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Event not found");
  }
  return result;
};

const deleteEvent = async (id: string) => {
  const result = await Event.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Event not found");
  }
  return result;
};

export const EventService = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  getSingleEventWithUsers,
  updateEvent,
  deleteEvent,
};
