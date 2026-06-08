import { prisma } from "../../config/prisma";

import type {

    CreateLibraryDto,

    UpdateLibraryDto,

} from "./library.types";

export const createLibraryService =
    async (
        userId: string,
        data: CreateLibraryDto
    ) => {

        const vendor =
            await prisma.vendorProfile.findUnique({

                where: {
                    userId,
                },
            });

        if (!vendor) {

            throw new Error(
                "Vendor profile not found"
            );
        }

        return prisma.library.create({

            data: {

                vendorId:
                    vendor.id,

                ...data,
            },
        });
    };

export const getLibrariesService =
    async () => {

        return prisma.library.findMany({

            where: {

                deletedAt:
                    null,

                isActive:
                    true,
            },

            include: {

                images: true,
            },

            orderBy: {

                createdAt:
                    "desc",
            },
        });
    };

export const getLibraryByIdService =
    async (
        libraryId: string
    ) => {

        return prisma.library.findUnique({

            where: {

                id:
                    libraryId,
            },

            include: {

                images: true,

                slots: true,
            },
        });
    };

export const updateLibraryService =
    async (
        libraryId: string,
        userId: string,
        data: UpdateLibraryDto
    ) => {

        const vendor =
            await prisma.vendorProfile.findUnique({

                where: {
                    userId,
                },
            });

        if (!vendor) {

            throw new Error(
                "Vendor not found"
            );
        }

        return prisma.library.update({

            where: {

                id:
                    libraryId,

                vendorId:
                    vendor.id,
            },

            data,
        });
    };

export const deleteLibraryService =
    async (
        libraryId: string,
        userId: string
    ) => {

        const vendor =
            await prisma.vendorProfile.findUnique({

                where: {
                    userId,
                },
            });

        if (!vendor) {

            throw new Error(
                "Vendor not found"
            );
        }

        return prisma.library.update({

            where: {

                id:
                    libraryId,
            },

            data: {

                deletedAt:
                    new Date(),
            },
        });
    };