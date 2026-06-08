import {
    apiConnector,
} from "../api/apiConnector";

import {
    ADMIN_API,
} from "../api/apis";

export const getRevenue =
    async (
        token: string
    ) => {

        const response =
            await apiConnector(

                "GET",

                ADMIN_API.REVENUE,

                undefined,

                {
                    Authorization:
                        `Bearer ${token}`,
                }
            );

        return response.data.data;
    };