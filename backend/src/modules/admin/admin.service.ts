import { prisma } from "../../config/prisma";
import { GetUsersQuery } from "./admin.types";
import type {
    UsersQuery,
} from "./admin.validation";

export const getVendorApplicationsService =
    async () => {

        return prisma.vendorProfile.findMany({

            where: {

                verificationStatus:
                    "PENDING",

                deletedAt:
                    null,
            },

            include: {

                user: true,
            },

            orderBy: {

                createdAt:
                    "desc",
            },
        });
    };

export const approveVendorService =
    async (
        vendorProfileId: string
    ) => {

        const vendor =
            await prisma.vendorProfile.findUnique({

                where: {

                    id:
                        vendorProfileId,
                },
            });

        if (!vendor) {

            throw new Error(
                "Vendor application not found"
            );
        }

        return prisma.$transaction(

            async (tx) => {

                await tx.vendorProfile.update({

                    where: {

                        id:
                            vendorProfileId,
                    },

                    data: {

                        verificationStatus:
                            "APPROVED",
                    },
                });

                await tx.user.update({

                    where: {

                        id:
                            vendor.userId,
                    },

                    data: {

                        role:
                            "VENDOR",
                    },
                });

                await tx.vendorWallet.create({

                    data: {

                        vendorId:
                            vendor.id,
                    },
                });

                await tx.vendorCommission.create({

                    data: {

                        vendorId:
                            vendor.id,

                        type:
                            "PERCENTAGE",

                        value: 10,
                    },
                });

                return true;
            }
        );
    };

export const rejectVendorService =
    async (
        vendorProfileId: string,
        rejectionReason: string
    ) => {

        const vendor =
            await prisma.vendorProfile.findUnique({

                where: {

                    id:
                        vendorProfileId,
                },
            });

        if (!vendor) {

            throw new Error(
                "Vendor application not found"
            );
        }

        return prisma.vendorProfile.update({

            where: {

                id:
                    vendorProfileId,
            },

            data: {

                verificationStatus:
                    "REJECTED",

                // add this field to schema if needed
                rejectionReason,
            },
        });
    };

export const getDashboardService =
    async () => {

        const [

            pendingVendors,

            approvedVendors,

            totalUsers,

            totalLibraries,

            totalBookings,

            revenue,

        ] = await Promise.all([

            prisma.vendorProfile.count({

                where: {

                    verificationStatus:
                        "PENDING",
                },
            }),

            prisma.vendorProfile.count({

                where: {

                    verificationStatus:
                        "APPROVED",
                },
            }),

            prisma.user.count(),

            prisma.library.count({

                where: {

                    deletedAt:
                        null,
                },
            }),

            prisma.booking.count(),

            prisma.payment.aggregate({

                _sum: {

                    amount:
                        true,
                },

                where: {

                    status:
                        "SUCCESS",
                },
            }),
        ]);

        return {

            pendingVendors,

            approvedVendors,

            totalUsers,

            totalLibraries,

            totalBookings,

            totalRevenue:

                revenue._sum.amount ??
                0,
        };
    };

import {
    Prisma,
    Role,
} from "@prisma/client";

export const getUsersService =
    async (

        page = 1,

        limit = 20,

        role?: GetUsersQuery["role"]

    ) => {

        const skip =
            (page - 1) *
            limit;

        const where: Prisma.UserWhereInput =

            role

                ? {
                    role:
                        role as Role,
                }

                : {

                    role: {

                        in: [

                            "USER",

                            "VENDOR",
                        ],
                    },
                };

        const [

            users,

            total,

        ] = await Promise.all([

            prisma.user.findMany({

                where,

                skip,

                take:
                    limit,

                orderBy: {

                    createdAt:
                        "desc",
                },
            }),

            prisma.user.count({

                where,
            }),
        ]);

        return {

            users,

            total,

            page,

            limit,

            hasMore:

                page *
                limit <
                total,
        };
    };
export const getLibrariesAdminService =
    async () => {

        return prisma.library.findMany({

            where: {

                deletedAt:
                    null,
            },

            include: {

                vendor: {

                    include: {

                        user:
                            true,
                    },
                },

                images:
                    true,
            },

            orderBy: {

                createdAt:
                    "desc",
            },
        });
    };

export const toggleLibraryService =
    async (
        libraryId: string
    ) => {

        const library =
            await prisma.library.findUnique({

                where: {

                    id:
                        libraryId,
                },
            });

        if (!library) {

            throw new Error(
                "Library not found"
            );
        }

        return prisma.library.update({

            where: {

                id:
                    libraryId,
            },

            data: {

                isActive:
                    !library.isActive,
            },
        });
    };

export const getBookingsService =
    async (

        page = 1,

        limit = 10,

        status?: string

    ) => {

        const skip =
            (page - 1) *
            limit;

        const where = {

            ...(status && {
                bookingStatus:
                    status as any,
            }),
        };

        const [

            bookings,

            total,

        ] = await Promise.all([

            prisma.booking.findMany({

                where,

                skip,

                take:
                    limit,

                include: {

                    user:
                        true,

                    slot: {

                        include: {

                            library:
                                true,
                        },
                    },

                    payment:
                        true,
                },

                orderBy: {

                    createdAt:
                        "desc",
                },
            }),

            prisma.booking.count({

                where,
            }),
        ]);

        return {

            bookings,

            total,

            page,

            limit,
        };
    };

export const getRevenueService =
    async () => {

        const totalRevenue =
            await prisma.payment.aggregate({

                _sum: {

                    amount:
                        true,
                },

                where: {

                    status:
                        "SUCCESS",
                },
            });

        const today =
            new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );

        const todayRevenue =
            await prisma.payment.aggregate({

                _sum: {

                    amount:
                        true,
                },

                where: {

                    status:
                        "SUCCESS",

                    paidAt: {

                        gte:
                            today,
                    },
                },
            });

        return {

            todayRevenue:

                todayRevenue
                    ._sum.amount ??
                0,

            totalRevenue:

                totalRevenue
                    ._sum.amount ??
                0,
        };
    };

export const getUserDetailsService =
    async (
        userId: string
    ) => {

        const user =
            await prisma.user.findUnique({

                where: {

                    id:
                        userId,
                },

                include: {

                    vendorProfile:
                        true,

                    bookings: {

                        include: {

                            payment:
                                true,
                        },
                    },
                },
            });

        if (!user) {

            throw new Error(
                "User not found"
            );
        }

        const totalBookings =
            user.bookings.length;

        const activeBookings =
            user.bookings.filter(

                booking =>

                    booking.bookingStatus ===
                    "CONFIRMED"
            ).length;

        const totalSpent =
            user.bookings.reduce(

                (
                    sum,
                    booking
                ) =>

                    sum +

                    Number(
                booking
                    .payment
                    ?.amount ??
                0
            ),

                0
            );

        return {

            ...user,

            totalBookings,

            activeBookings,

            totalSpent,
        };
    };