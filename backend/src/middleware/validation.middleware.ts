import type {
    ZodType,
} from "zod";

import type {
    Request,
    Response,
    NextFunction,
} from "express";

import {
    ZodError,
} from "zod";

export const validate =
    (
        schema: ZodType,
        source:
            "body" |
            "params" |
            "query" =
            "body"
    ) =>
        async (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {

            try {

                schema.parse(
                    req[source]
                );

                next();

            } catch (error) {

                if (
                    error instanceof
                    ZodError
                ) {

                    return res.status(400).json({

                        success: false,

                        message:
                            "Validation failed",

                        errors:
                            error.issues,
                    });
                }

                next(error);
            }
        };