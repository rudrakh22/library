import { Router } from "express";

import { authenticate }
    from "../middleware/auth.middleware";

import {
    getCurrentUser,
    updateProfile,
} from "../modules/user/user.controller";
import { updateProfileSchema } from "../modules/user/user.validation";
import { validate } from "../middleware/validation.middleware";

const router =
    Router();

router.get(
    "/me",
    authenticate,
    getCurrentUser
);

router.patch(
    "/profile",
    authenticate,
    validate(
        updateProfileSchema
    ),
    updateProfile
);

export default router;