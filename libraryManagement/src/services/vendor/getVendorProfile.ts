import {
    apiConnector,
} from "../api/apiConnector";

import {
    VENDOR_API,
} from "../api/apis";

export const getVendorProfile =
    async (
        token: string
    ) => {

        const response =
            await apiConnector(

                "GET",

                VENDOR_API.PROFILE,

                undefined,

                {
                    Authorization:
                        `Bearer ${token}`,
                }
            );

        return response.data.data;
    };