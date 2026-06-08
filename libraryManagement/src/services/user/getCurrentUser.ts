import {
    apiConnector,
} from "../api/apiConnector";

import {
    USER_API,
} from "../api/apis";

export const getCurrentUser =
    async (
        token: string
    ) => {

        const response =
            await apiConnector(

                "GET",

                USER_API.CURRENT_USER,

                undefined,

                {
                    Authorization:
                        `Bearer ${token}`,
                }
            );

        return response.data.data;
    };