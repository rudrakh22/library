import {
    apiConnector,
} from "../api/apiConnector";

import {
    ADMIN_API,
} from "../api/apis";

export const rejectVendor =
    async (
        token: string,
        vendorId: string,
        rejectionReason: string
    ) => {

        const response =
            await apiConnector(

                "PATCH",

                ADMIN_API.REJECT_VENDOR(
                    vendorId
                ),

                {
                    rejectionReason,
                },

                {
                    Authorization:
                        `Bearer ${token}`,
                }
            );

        return response.data;
    };