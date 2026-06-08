import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    useAuth,
} from "@clerk/expo";

import {
    createLibrary,
} from "@/services/library/createLibrary";
import { CreateLibraryDto } from "@/services/library/library.types";

export const useCreateLibrary =
    () => {

        const queryClient =
            useQueryClient();

        const {
            getToken,
        } = useAuth();

        return useMutation({

            mutationFn:
                async (
                    data: CreateLibraryDto
                ) => {

                    const token =
                        await getToken();

                    if (!token) {

                        throw new Error(
                            "Unauthorized"
                        );
                    }

                    return createLibrary(

                        token,

                        data
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