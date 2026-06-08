import { Router } from "express";

import {
    authenticate,
} from "../middleware/auth.middleware";

import {
    getNotifications,
    markNotificationRead,
} from "../modules/notification/notification.controller";

const router =
    Router();

router.get(
    "/",
    authenticate,
    getNotifications
);

router.patch(
    "/:id/read",
    authenticate,
    markNotificationRead
);

export default router;