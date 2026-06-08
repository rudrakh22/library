import {
    useQuery,
} from "@tanstack/react-query";

import {
    useAuth,
} from "@clerk/expo";

import {
    getBookings,
} from "@/services/admin/getBookings";

export const useAdminBookings =
    (
        page = 1,
        limit = 10,
        status?: string
    ) => {

        const {
            getToken,
        } = useAuth();

        return useQuery({

            queryKey: [

                "admin-bookings",

                page,

                limit,

                status,
            ],

            queryFn:
                async () => {

                    const token =
                        await getToken();

                    if (!token) {

                        throw new Error(
                            "Unauthorized"
                        );
                    }

                    return getBookings(

                        token,

                        {
                            page,
                            limit,
                            status,
                        }
                    );
                },
        });
    };