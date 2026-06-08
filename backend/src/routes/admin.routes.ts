import {
    Router,
} from "express";

import {
    authenticate,
} from "../middleware/auth.middleware";

import {
    authorize,
} from "../middleware/role.middleware";

import {
    validate,
} from "../middleware/validation.middleware";

import {

    getVendorApplications,

    approveVendor,

    rejectVendor,
    getDashboard,
    getUsers,
    getLibraries,
    toggleLibraryStatus,
    getBookings,
    getRevenue

} from "../modules/admin/admin.controller";

import {

    vendorIdParamsSchema,


    rejectVendorSchema,

} from "../modules/admin/admin.validation";
import {libraryParamsSchema} from "../modules/library/library.validation"

const router =
    Router();

router.get(
    "/dashboard",
    authenticate,
    authorize("ADMIN"),
    getDashboard
);

router.get(
    "/users",
    authenticate,
    authorize("ADMIN"),
    getUsers
);

router.get(
    "/libraries",
    authenticate,
    authorize("ADMIN"),
    getLibraries
);

router.patch(
    "/libraries/:id/toggle",
    authenticate,
    authorize("ADMIN"),
    validate(
        libraryParamsSchema,
        "params"
    ),
    toggleLibraryStatus
);

router.get(
    "/bookings",
    authenticate,
    authorize("ADMIN"),
    getBookings
);

router.get(
    "/revenue",
    authenticate,
    authorize("ADMIN"),
    getRevenue
);

router.get(

    "/vendor-applications",

    authenticate,

    authorize(
        "ADMIN"
    ),

    getVendorApplications
);

router.patch(

    "/vendor/:id/approve",

    authenticate,

    authorize(
        "ADMIN"
    ),

    validate(

        vendorIdParamsSchema,

        "params"
    ),

    approveVendor
);

router.patch(

    "/vendor/:id/reject",

    authenticate,

    authorize(
        "ADMIN"
    ),

    validate(

        vendorIdParamsSchema,

        "params"
    ),

    validate(

        rejectVendorSchema
    ),

    rejectVendor
);








export default router;