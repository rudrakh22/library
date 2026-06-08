import {
    useQuery,
} from "@tanstack/react-query";

import {
    useAuth,
} from "@clerk/expo";

import {
    getDashboard,
} from "@/services/admin/getDashboard";

export const useAdminDashboard =
    () => {

        const {
            getToken,
        } = useAuth();

        return useQuery({

            queryKey: [
                "admin-dashboard",
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

                    return getDashboard(
                        token
                    );
                },
        });
    };