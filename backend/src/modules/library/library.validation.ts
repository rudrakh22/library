import { z } from "zod";

export const createLibrarySchema =
    z.object({

        name:
            z.string()
                .trim()
                .min(3)
                .max(100),

        description:
            z.string()
                .optional(),

        address:
            z.string()
                .trim()
                .min(5),

        city:
            z.string()
                .optional(),

        state:
            z.string()
                .optional(),

        pincode:
            z.string()
                .optional(),

        latitude:
            z.number()
                .optional(),

        longitude:
            z.number()
                .optional(),

        openingMinutes:
            z.number()
                .int()
                .optional(),

        closingMinutes:
            z.number()
                .int()
                .optional(),
    });

export const updateLibrarySchema =
    createLibrarySchema.partial();

export const libraryParamsSchema =
    z.object({

        id:
            z.uuid(),
    });