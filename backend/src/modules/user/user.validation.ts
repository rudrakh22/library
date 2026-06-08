// modules/user/user.validation.ts

import { z } from "zod";

export const updateProfileSchema =
    z.object({

        firstName:
            z.string()
                .min(2)
                .max(50)
                .optional(),

        lastName:
            z.string()
                .min(2)
                .max(50)
                .optional(),

        phone:
            z.string()
                .min(10)
                .max(15)
                .optional(),
    });