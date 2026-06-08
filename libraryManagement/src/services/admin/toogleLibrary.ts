import {
    apiConnector,
} from "../api/apiConnector";

import {
    ADMIN_API,
} from "../api/apis";

export const toggleLibrary =
    async (
        token: string,
        libraryId: string
    ) => {

        const response =
            await apiConnector(

                "PATCH",

                ADMIN_API.TOGGLE_LIBRARY(
                    libraryId
                ),

                {},

                {
                    Authorization:
                        `Bearer ${token}`,
                }
            );

        return response.data.data;
    };