import {
    apiConnector,
} from "../api/apiConnector";

import {
    ADMIN_API,
} from "../api/apis";

export const getVendorApplications =
    async (
        token: string
    ) => {

        const response =
            await apiConnector(

                "GET",

                ADMIN_API.VENDOR_APPLICATIONS,

                undefined,

                {
                    Authorization:
                        `Bearer ${token}`,
                }
            );

        return response.data.data;
    };