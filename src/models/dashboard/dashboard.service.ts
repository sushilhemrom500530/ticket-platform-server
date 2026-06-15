import { Payment } from "../payment/payment.model";
import { User } from "../user/user.model";
import { Ticket } from "../ticket/ticket.model";
import { Event } from "../event/event.model";

const getAnalytics = async () => {
  const [
    totalSalesResult,
    newUsers,
    ticketsSoldResult,
    activeEvents
  ] = await Promise.all([
    Payment.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]),
    User.countDocuments({ role: "user" }),
    Ticket.aggregate([
      { $match: { status: "active" } },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ]),
    Event.countDocuments({ date: { $gte: new Date() } })
  ]);

  const totalSales = totalSalesResult[0]?.total || 0;
  const ticketsSold = ticketsSoldResult[0]?.total || 0;

  // Mock revenue growth data for the chart (for professional visualization)
  const revenueGrowth = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 4500 },
    { name: "May", revenue: 6000 },
    { name: "Jun", revenue: 5500 }
  ];

  const userDistribution = [
    { name: "New Users", value: 400 },
    { name: "Returning Users", value: 300 }
  ];

  return {
    totalSales,
    newUsers,
    ticketsSold,
    activeEvents,
    revenueGrowth,
    userDistribution
  };
};

export const DashboardService = {
  getAnalytics,
};
