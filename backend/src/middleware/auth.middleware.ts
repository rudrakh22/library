import {
    NextFunction,
    Request,
    Response,
} from "express";

import { verifyToken } from "@clerk/express";

import {
    prisma,
} from "../config/prisma";
import { CLERK_JWT_KEY } from "../config/env.config";


export const authenticate =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const authHeader =
                req.headers.authorization;

            if (
                !authHeader ||
                !authHeader.startsWith(
                    "Bearer "
                )
            ) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Unauthorized",
                });
            }

            const token =
                authHeader.replace(
                    "Bearer ",
                    ""
                );

            const payload =
                await verifyToken(
                    token,
                    {
                        jwtKey:CLERK_JWT_KEY
                    }
                );

            const clerkId =
                payload.sub;

            if (!clerkId) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid token",
                });
            }

            const user =
                await prisma.user.findUnique({

                    where: {
                        clerkId,
                    },

                    select: {

                        id: true,

                        clerkId: true,

                        role: true,
                    },
                });

            if (!user) {

                return res.status(404).json({

                    success: false,

                    message:
                        "User not found",
                });
            }

            req.user = user;

            next();

        } catch {

            return res.status(401).json({

                success: false,

                message:
                    "Unauthorized",
            });
        }
    };