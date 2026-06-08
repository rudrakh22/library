import { z } from "zod";

export const vendorIdParamsSchema =
    z.object({

        id:
            z.string()
                .uuid(
                    "Invalid vendor id"
                ),
    });

export const rejectVendorSchema =
    z.object({

        rejectionReason:
            z.string()
                .trim()
                .min(
                    5,
                    "Rejection reason must be at least 5 characters"
                )
                .max(
                    500,
                    "Rejection reason cannot exceed 500 characters"
                ),
    });



export const usersQuerySchema =
    z.object({

        page:
            z.coerce.number()
                .positive()
                .optional(),

        limit:
            z.coerce.number()
                .positive()
                .optional(),

        role:
            z.enum([
                "USER",
                "VENDOR",
                "ADMIN",
            ])
                .optional(),
    });

    export type UsersQuery =
    z.infer<
        typeof usersQuerySchema
    >;

export const bookingsQuerySchema =
    z.object({

        page:
            z.coerce.number()
                .positive()
                .optional(),

        limit:
            z.coerce.number()
                .positive()
                .optional(),

        status:
            z.enum([
                "PENDING",
                "CONFIRMED",
                "CANCELLED",
                "EXPIRED",
                "REFUNDED",
            ])
                .optional(),
    });

export const userIdParamsSchema =
    z.object({

        id: z.uuid(),
    });

export type UserIdParams =
    z.infer<
        typeof userIdParamsSchema
    >;


    