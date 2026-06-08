import { Router } from "express";

import userRoutes
    from "./user.routes";

import vendorRoutes
    from "./vendor.routes";

import adminRoutes
    from "./admin.routes";

// import libraryRoutes
//     from "./library.routes";

// import bookingRoutes
//     from "./booking.routes";

// import paymentRoutes
//     from "./payment.routes";

// import walletRoutes
//     from "./wallet.routes";

// import notificationRoutes
//     from "./notification.routes";

const router =
    Router();

router.use(
    "/user",
    userRoutes
);

router.use(
    "/vendor",
    vendorRoutes
);

router.use(
    "/admin",
    adminRoutes
);

// router.use(
//     "/libraries",
//     libraryRoutes
// );

// router.use(
//     "/bookings",
//     bookingRoutes
// );

// router.use(
//     "/payments",
//     paymentRoutes
// );

// router.use(
//     "/wallet",
//     walletRoutes
// );

// router.use(
//     "/notifications",
//     notificationRoutes
// );

export default router;