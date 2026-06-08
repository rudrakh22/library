import type {
    Request,
    Response,
} from "express";

import {

    applyVendorService,

    getVendorProfileService,

    getVendorApplicationStatusService,

} from "./vendor.service";

export const applyVendor =
    async (
        req: Request,
        res: Response
    ) => {

        const vendor =
            await applyVendorService(

                req.user!.id,

                req.body
            );

        return res.status(201).json({

            success: true,

            data: vendor,
        });
    };

export const getVendorProfile =
    async (
        req: Request,
        res: Response
    ) => {

        const profile =
            await getVendorProfileService(

                req.user!.id
            );

        return res.status(200).json({

            success: true,

            data: profile,
        });
    };

export const getVendorApplicationStatus =
    async (
        req: Request,
        res: Response
    ) => {

        const application =
            await getVendorApplicationStatusService(

                req.user!.id
            );

        return res.status(200).json({

            success: true,

            data: application,
        });
    };