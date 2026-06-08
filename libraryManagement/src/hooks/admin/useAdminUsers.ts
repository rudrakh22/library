import {
    useInfiniteQuery,
} from "@tanstack/react-query";

import {
    useAuth,
} from "@clerk/expo";

import {
    getUsers,
} from "@/services/admin/getUsers";

export const useAdminUsers =
    (
        role?: string
    ) => {

        const {
            getToken,
        } = useAuth();

        return useInfiniteQuery({

            queryKey: [

                "admin-users",

                role,
            ],

            initialPageParam: 1,

            queryFn: async ({
                pageParam,
            }) => {

                const token =
                    await getToken();

                if (!token) {

                    throw new Error(
                        "Unauthorized"
                    );
                }

                return getUsers(

                    token,

                    {
                        page:
                            pageParam,

                        limit:
                            20,

                        role,
                    }
                );
            },

            getNextPageParam: (
                lastPage
            ) => {

                const {

                    page,

                    total,

                    limit,

                } = lastPage;

                const hasMore =

                    page *
                    limit <
                    total;

                return hasMore

                    ? page + 1

                    : undefined;
            },
        });
    };