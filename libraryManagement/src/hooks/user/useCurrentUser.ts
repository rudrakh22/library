import {
    useAuth,
} from "@clerk/expo";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    getCurrentUser,
} from "@/services/user/getCurrentUser";

import {
    QUERY_KEYS,
} from "@/constants/queryKeys";

export const useCurrentUser =
    () => {

        const {
            isSignedIn,getToken
        } = useAuth();
        return useQuery({

            queryKey:
                QUERY_KEYS.CURRENT_USER,

            queryFn:
                async () => {

                    const token =
                        await getToken();

                    if (!token) {

                        throw new Error(
                            "No token found"
                        );
                    }

                    return getCurrentUser(
                        token
                    );
                },

            enabled:
                !!isSignedIn,

            staleTime:
                1000 * 60 * 5,
        });
    };