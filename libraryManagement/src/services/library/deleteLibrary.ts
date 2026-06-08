import {
    apiConnector,
} from "../api/apiConnector";

import {
    LIBRARY_API,
} from "../api/apis";

export const deleteLibrary =
    async (
        token: string,
        id: string
    ) => {

        const response =
            await apiConnector(

                "DELETE",

                LIBRARY_API.DELETE(id),

                undefined,

                {
                    Authorization:
                        `Bearer ${token}`,
                }
            );

        return response.data;
    };