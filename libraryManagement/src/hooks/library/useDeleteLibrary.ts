import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    useAuth,
} from "@clerk/expo";

import {
    deleteLibrary,
} from "@/services/library/deleteLibrary";

export const useDeleteLibrary =
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

                    return deleteLibrary(

                        token,

                        libraryId
                    );
                },

            onSuccess:
                () => {

                    queryClient.invalidateQueries({

                        queryKey: [
                            "libraries",
                        ],
                    });
                },
        });
    };