import {
    apiConnector,
} from "../api/apiConnector";

import {
    ADMIN_API,
} from "../api/apis";

export const getDashboard =
    async (
        token: string
    ) => {

        const response =
            await apiConnector(

                "GET",

                ADMIN_API.DASHBOARD,

                undefined,

                {
                    Authorization:
                        `Bearer ${token}`,
                }
            );

        return response.data.data;
    };