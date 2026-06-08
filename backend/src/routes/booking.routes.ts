import { Router } from "express";

import {
    authenticate,
} from "../middleware/auth.middleware";

import {
    createBooking,
    getMyBookings,
    cancelBooking,
    getBookingById,
} from "../modules/booking/booking.controller";

const router =
    Router();

router.post(
    "/",
    authenticate,
    createBooking
);

router.get(
    "/my-bookings",
    authenticate,
    getMyBookings
);

router.get(
    "/:id",
    authenticate,
    getBookingById
);

router.patch(
    "/:id/cancel",
    authenticate,
    cancelBooking
);

export default router;