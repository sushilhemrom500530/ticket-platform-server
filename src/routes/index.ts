import express from "express";
// import { UserRoutes } from "../modules/user/user.route";
// import { AuthRoutes } from "./../modules/auth/auth.route";
// import { NotificationRoutes } from "./../modules/notifications/notification.route";
// import { CommonRoutes } from "./../modules/common/common.route";

const router = express.Router();

const apiRoutes: any[] = [
  //   {
  //     path: "/auth",
  //     route: AuthRoutes,
  //   },
  //   {
  //     path: "/user",
  //     route: UserRoutes,
  //   },
  //   {
  //     path: "/notification",
  //     route: NotificationRoutes,
  //   },
  //   {
  //     path: "/common",
  //     route: CommonRoutes,
  //   },
];

apiRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
