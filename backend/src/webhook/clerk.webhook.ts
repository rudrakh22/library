import type {
    Request,
    Response,
} from "express";

import {
    Webhook,
} from "svix";

import type {
    WebhookEvent,
} from "@clerk/backend/webhooks";

import {
    WEBHOOK_SECRET,
} from "../config/env.config";

import {
    prisma,
} from "../config/prisma";

export const clerkWebhook = async (
    req: Request,
    res: Response
) => {

    try {

        if (!WEBHOOK_SECRET) {

            throw new Error(
                "WEBHOOK_SECRET is missing"
            );
        }

        const svixId =
            req.headers["svix-id"];

        const svixTimestamp =
            req.headers["svix-timestamp"];

        const svixSignature =
            req.headers["svix-signature"];

        if (
            !svixId ||
            !svixTimestamp ||
            !svixSignature
        ) {

            return res
                .status(400)
                .json({

                    success: false,

                    message:
                        "Missing svix headers",
                });
        }

        const payload =
            req.body.toString();

        const webhook =
            new Webhook(
                WEBHOOK_SECRET
            );

        const event =
            webhook.verify(

                payload,

                {
                    "svix-id":
                        String(
                            svixId
                        ),

                    "svix-timestamp":
                        String(
                            svixTimestamp
                        ),

                    "svix-signature":
                        String(
                            svixSignature
                        ),
                }

            ) as WebhookEvent;

        switch (
            event.type
        ) {

            case "user.created": {

                const email =
                    event.data
                        .email_addresses?.find(

                            (email) =>

                                email.id ===
                                event.data
                                    .primary_email_address_id

                        )
                        ?.email_address ??
                    "";

                await prisma.user.upsert({

                    where: {

                        clerkId:
                            event.data.id,
                    },

                    update: {

                        email,

                        firstName:
                            event.data.first_name,

                        lastName:
                            event.data.last_name,

                        imageUrl:
                            event.data.image_url,
                    },

                    create: {

                        clerkId:
                            event.data.id,

                        email,

                        firstName:
                            event.data.first_name,

                        lastName:
                            event.data.last_name,

                        imageUrl:
                            event.data.image_url,

                        role:
                            "USER",
                    },
                });

                break;
            }

            case "user.updated": {

                const email =
                    event.data
                        .email_addresses?.find(

                            (email) =>

                                email.id ===
                                event.data
                                    .primary_email_address_id

                        )
                        ?.email_address ??
                    "";

                await prisma.user.update({

                    where: {

                        clerkId:
                            event.data.id,
                    },

                    data: {

                        email,

                        firstName:
                            event.data.first_name,

                        lastName:
                            event.data.last_name,

                        imageUrl:
                            event.data.image_url,
                    },
                });

                break;
            }

            case "user.deleted": {

                if (
                    !event.data.id
                ) {

                    break;
                }

                await prisma.user.deleteMany({

                    where: {

                        clerkId:
                            event.data.id,
                    },
                });

                break;
            }

            default:
                break;
        }

        return res.status(200).json({

            success: true,
        });

    } catch (error) {

        console.error(
            "Clerk Webhook Error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                "Webhook processing failed",
        });
    }
};