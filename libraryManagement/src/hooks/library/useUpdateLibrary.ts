import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    useAuth,
} from "@clerk/expo";

import {
    updateLibrary,
} from "@/services/library/updateLibrary";
import { CreateLibraryDto } from "@/services/library/library.types";

interface UpdateLibraryPayload {

    libraryId: string;

    data: CreateLibraryDto;
}

export const useUpdateLibrary =
    () => {

        const queryClient =
            useQueryClient();

        const {
            getToken,
        } = useAuth();

        return useMutation({

            mutationFn:
                async (
                    payload: UpdateLibraryPayload
                ) => {

                    const token =
                        await getToken();

                    if (!token) {

                        throw new Error(
                            "Unauthorized"
                        );
                    }

                    return updateLibrary(

                        token,

                        payload.libraryId,

                        payload.data
                    );
                },

            onSuccess:
                (_, variables) => {

                    queryClient.invalidateQueries({

                        queryKey: [
                            "libraries",
                        ],
                    });

                    queryClient.invalidateQueries({

                        queryKey: [

                            "library",

                            variables.libraryId,
                        ],
                    });
                },
        });
    };