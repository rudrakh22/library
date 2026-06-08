import {
    useAuth,
} from "@clerk/expo";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    getVendorApplications,
} from "@/services/admin/getVendorApplications";

export const useVendorApplications =
    () => {

        const {
            getToken,
        } = useAuth();

        return useQuery({

            queryKey: [
                "vendor-applications",
            ],

            queryFn: async () => {

                const token =
                    await getToken();

                if (!token) {

                    throw new Error(
                        "Authentication token not found"
                    );
                }

                return getVendorApplications(
                    token
                );
            },
        });
    };