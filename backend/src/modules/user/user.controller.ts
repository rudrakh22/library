import type {
    Request,
    Response,
} from "express";


import {
    getCurrentUserService,
    updateProfileService,
} from "./user.service";

export const getCurrentUser =
    async (
        req: Request,
        res: Response
    ) => {

        const user =
            await getCurrentUserService(
                req.user!.id
            );

        return res.status(200).json({

            success: true,

            data: user,
        });
    };

export const updateProfile =
    async (

        req: Request,

        res: Response
    ) => {

        const updatedUser =
            await updateProfileService(

                req.user!.id,

                req.body
            );

        return res.json({

            success: true,

            data: updatedUser,
        });
    };