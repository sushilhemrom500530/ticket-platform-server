
import cron from "node-cron";
import { IEvent } from "../models/event/event.interface";
import { Event } from "../models/event/event.model";
import { EventTicket } from "../models/event-ticket/event.ticket.model";

const autoExpireEvents = () => {
    // Every 5 minutes
    cron.schedule("*/5 * * * *", async () => {
        try {
            const now = new Date();

            // Find all expired events
            const expiredEvents = await Event.find({
                date: { $lt: now },
            }).select("_id");

            if (!expiredEvents.length) return;

            const eventIds = expiredEvents.map((event: IEvent) => event._id);

            // Expire all unused paid tickets
            const result = await EventTicket.updateMany(
                {
                    event: { $in: eventIds },
                    status: "paid",
                    entryStatus: "not_used",
                },
                {
                    $set: {
                        status: "expired",
                    },
                }
            );

            console.log(
                `Expired ${result.modifiedCount} tickets for ${eventIds.length} events`
            );
        } catch (error) {
            console.error("Auto Expire Event Cron Error:", error);
        }
    });
};
export const startJobs = () => {
    autoExpireEvents();
};