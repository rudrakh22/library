import {
    useQuery,
} from "@tanstack/react-query";

import {
    useAuth,
} from "@clerk/expo";

import {
    getRevenue,
} from "@/services/admin/getRevenue";

export const useAdminRevenue =
    () => {

        const {
            getToken,
        } = useAuth();

        return useQuery({

            queryKey: [
                "admin-revenue",
            ],

            queryFn:
                async () => {

                    const token =
                        await getToken();

                    if (!token) {

                        throw new Error(
                            "Unauthorized"
                        );
                    }

                    return getRevenue(
                        token
                    );
                },
        });
    };