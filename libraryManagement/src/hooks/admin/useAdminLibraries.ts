import {
    useQuery,
} from "@tanstack/react-query";

import {
    useAuth,
} from "@clerk/expo";

import {
    getLibrariesAdmin,
} from "@/services/admin/getLibraries";

export const useAdminLibraries =
    () => {

        const {
            getToken,
        } = useAuth();

        return useQuery({

            queryKey: [
                "admin-libraries",
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

                    return getLibrariesAdmin(
                        token
                    );
                },
        });
    };