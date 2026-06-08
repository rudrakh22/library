import { prisma } from "../../config/prisma";

import type {
    ApplyVendorDto,
} from "./vendor.types";

export const applyVendorService =
    async (
        userId: string,
        data: ApplyVendorDto
    ) => {

        const existingApplication =
            await prisma.vendorProfile.findUnique({

                where: {
                    userId,
                },
            });

        if (existingApplication) {

            throw new Error(
                "Vendor application already exists"
            );
        }

        return prisma.vendorProfile.create({

            data: {

                userId,

                businessName:
                    data.businessName,

                gstNumber:
                    data.gstNumber ?? null,

                panNumber:
                    data.panNumber ?? null,

                documentUrl:
                    data.documentUrl ?? null,
            },
        });
    };

export const getVendorProfileService =
    async (
        userId: string
    ) => {

        return prisma.vendorProfile.findUnique({

            where: {
                userId,
            },

            include: {

                wallet: true,

                commission: true,

                libraries: true,
            },
        });
    };

export const getVendorApplicationStatusService =
    async (
        userId: string
    ) => {

        return prisma.vendorProfile.findUnique({

            where: {
                userId,
            },

            select: {

                id: true,

                verificationStatus:
                    true,

                businessName:
                    true,
            },
        });
    };