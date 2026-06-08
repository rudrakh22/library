import { z } from "zod";

export const applyVendorSchema =
    z.object({

        businessName:
            z.string()
                .trim()
                .min(
                    3,
                    "Business name must be at least 3 characters"
                )
                .max(
                    100,
                    "Business name cannot exceed 100 characters"
                ),

        gstNumber:
            z.string()
                .trim()
                .optional(),

        panNumber:
            z.string()
                .trim()
                .optional(),

        documentUrl:
            z.string()
                .url(
                    "Invalid document URL"
                )
                .optional(),
    });