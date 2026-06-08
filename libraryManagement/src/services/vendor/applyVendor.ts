import {
    apiConnector,
} from "../api/apiConnector";

import {
    VENDOR_API,
} from "../api/apis";

export interface ApplyVendorPayload {

    businessName: string;

    gstNumber?: string;

    panNumber?: string;

    documentUrl?: string;
}

export const applyVendor =
    async (
        token: string,
        data: ApplyVendorPayload
    ) => {

        const response =
            await apiConnector(

                "POST",

                VENDOR_API.APPLY,

                data,

                {
                    Authorization:
                        `Bearer ${token}`,
                }
            );

        return response.data.data;
    };