import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    useAuth,
} from "@clerk/expo";

import {
    toggleLibrary,
} from "@/services/admin/toogleLibrary";

export const useToggleLibrary =
    () => {

        const queryClient =
            useQueryClient();

        const {
            getToken,
        } = useAuth();

        return useMutation({

            mutationFn:
                async (
                    libraryId: string
                ) => {

                    const token =
                        await getToken();

                    if (!token) {

                        throw new Error(
                            "Unauthorized"
                        );
                    }

                    return toggleLibrary(

                        token,

                        libraryId
                    );
                },

            onSuccess:
                () => {

                    queryClient.invalidateQueries({

                        queryKey: [
                            "admin-libraries",
                        ],
                    });

                    queryClient.invalidateQueries({

                        queryKey: [
                            "libraries",
                        ],
                    });
                },
        });
    };