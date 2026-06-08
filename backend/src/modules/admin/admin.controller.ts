import type {
    Request,
    Response,
} from "express";

import {

    getVendorApplicationsService,
    approveVendorService,
    rejectVendorService,
    getBookingsService, getDashboardService, getLibrariesAdminService, getRevenueService, getUsersService, toggleLibraryService,
    getUserDetailsService

} from "./admin.service";

import { usersQuerySchema } from "./admin.validation"
import { GetUsersQuery } from "./admin.types";

export const getVendorApplications =
    async (
        req: Request,
        res: Response
    ) => {

        const applications =
            await getVendorApplicationsService();

        return res.status(200).json({

            success: true,

            data:
                applications,
        });
    };

export const approveVendor =
    async (
        req: Request,
        res: Response
    ) => {

        await approveVendorService(
            req.params.id as string
        );

        return res.status(200).json({

            success: true,

            message:
                "Vendor approved successfully",
        });
    };

export const rejectVendor =
    async (
        req: Request,
        res: Response
    ) => {

        await rejectVendorService(

            req.params.id as string,

            req.body.rejectionReason
        );

        return res.status(200).json({

            success: true,

            message:
                "Vendor rejected successfully",
        });
    };

export const getDashboard =
    async (
        req: Request,
        res: Response
    ) => {

        const data =
            await getDashboardService();

        return res.json({

            success: true,

            data,
        });
    };

export const getUsers =
    async (
        req: Request<
            {},
            {},
            {},
            GetUsersQuery
        >,

        res: Response
    ) => {

        const page =
            Number(
                req.query.page
            ) || 1;

        const limit =
            Number(
                req.query.limit
            ) || 20;

        const role =
            req.query.role;

        const data =
            await getUsersService(

                page,

                limit,

                role
            );

        return res.json({

            success: true,

            data,
        });
    };
export const getLibraries =
    async (
        req: Request,
        res: Response
    ) => {

        const data =
            await getLibrariesAdminService();

        return res.json({

            success: true,

            data,
        });
    };

export const toggleLibraryStatus =
    async (
        req: Request,
        res: Response
    ) => {

        const data =
            await toggleLibraryService(

                req.params.id as string
            );

        return res.json({

            success: true,

            data,
        });
    };

export const getBookings =
    async (
        req: Request,
        res: Response
    ) => {

        const data =
            await getBookingsService(

                Number(
                    req.query.page
                ) || 1,

                Number(
                    req.query.limit
                ) || 10,

                req.query.status as string
            );

        return res.json({

            success: true,

            data,
        });
    };

export const getRevenue =
    async (
        req: Request,
        res: Response
    ) => {

        const data =
            await getRevenueService();

        return res.json({

            success: true,

            data,
        });
    };

export const getUserDetails =
    async (
        req: Request,
        res: Response
    ) => {

        const data =
            await getUserDetailsService(

                req.params.id as string
            );

        return res.json({

            success: true,

            data,
        });
    };

