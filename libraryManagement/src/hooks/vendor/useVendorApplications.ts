import {
    useQuery,
} from "@tanstack/react-query";

import {
    useAuth,
} from "@clerk/expo";

import {
    getVendorApplications,
} from "@/services/admin/getVendorApplications";
import {
    QUERY_KEYS,
} from "@/constants/queryKeys";
export const useVendorApplications =
    () => {

        const {
            getToken,
        } = useAuth();

        return useQuery({

            queryKey: QUERY_KEYS.VENDOR_APPLICATIONS,

            queryFn:
                async () => {

                    const token =
                        await getToken();

                    if (!token) {

                        throw new Error(
                            "Unauthorized"
                        );
                    }

                    return getVendorApplications(
                        token
                    );
                },
        });
    };