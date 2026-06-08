import { prisma } from "../../config/prisma";

export const getCurrentUserService =
    async (
        userId: string
    ) => {

        return prisma.user.findUnique({

            where: {
                id: userId,
            },

            include: {

                vendorProfile: true,
            },
        });
    };

export const updateProfileService =
    async (

        userId: string,

        data: {

            firstName?: string;

            lastName?: string;

            phone?: string;
        }
    ) => {

        return prisma.user.update({

            where: {
                id: userId,
            },

            data,
        });
    };