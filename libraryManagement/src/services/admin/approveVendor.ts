import {
    apiConnector,
} from "../api/apiConnector";

import {
    ADMIN_API,
} from "../api/apis";

export const approveVendor =
    async (
        token: string,
        vendorId: string
    ) => {

        const response =
            await apiConnector(

                "PATCH",

                ADMIN_API.APPROVE_VENDOR(
                    vendorId
                ),

                {},

                {
                    Authorization:
                        `Bearer ${token}`,
                }
            );

        return response.data;
    };