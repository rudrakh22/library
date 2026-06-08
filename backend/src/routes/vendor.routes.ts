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

    applyVendor,

    getVendorProfile,

    getVendorApplicationStatus,

} from "../modules/vendor/vendor.controller";

import {

    applyVendorSchema,

} from "../modules/vendor/vendor.validation";

const router =
    Router();

router.post(

    "/apply",

    authenticate,

    authorize(
        "USER"
    ),

    validate(
        applyVendorSchema
    ),

    applyVendor
);

router.get(

    "/application-status",

    authenticate,

    getVendorApplicationStatus
);

router.get(

    "/profile",

    authenticate,

    authorize(
        "VENDOR"
    ),

    getVendorProfile
);

export default router;