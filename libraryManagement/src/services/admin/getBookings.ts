import {
    apiConnector,
} from "../api/apiConnector";

import {
    ADMIN_API,
} from "../api/apis";

interface GetBookingsParams {

    page?: number;

    limit?: number;

    status?: string;
}

export const getBookings =
    async (
        token: string,
        params?: GetBookingsParams
    ) => {

        const response =
            await apiConnector(

                "GET",

                ADMIN_API.BOOKINGS,

                undefined,

                {
                    Authorization:
                        `Bearer ${token}`,
                },

                params
            );

        return response.data.data;
    };