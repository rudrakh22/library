import {
    apiConnector,
} from "../api/apiConnector";

import {
    ADMIN_API,
} from "../api/apis";

interface GetUsersParams {

    page?: number;

    limit?: number;

    role?: string;
}

export const getUsers =
    async (
        token: string,
        params?: GetUsersParams
    ) => {

        const response =
            await apiConnector(

                "GET",

                ADMIN_API.USERS,

                undefined,

                {
                    Authorization:
                        `Bearer ${token}`,
                },

                params
            );

        return response.data.data;
    };