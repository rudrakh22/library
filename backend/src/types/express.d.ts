import "express";

export type UserRole =
    | "USER"
    | "VENDOR"
    | "ADMIN";

declare global {

    namespace Express {

        interface Request {

            user?: {

                id: string;

                clerkId: string;

                role: UserRole;
            };
        }
    }
}

export {};