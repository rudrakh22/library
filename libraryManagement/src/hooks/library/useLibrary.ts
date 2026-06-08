import {
    useQuery,
} from "@tanstack/react-query";

import {
    getLibrary,
} from "@/services/library/getLibrary";

export const useLibrary =
    (
        libraryId: string
    ) => {

        return useQuery({

            queryKey: [

                "library",

                libraryId,
            ],

            queryFn:
                () =>
                    getLibrary(
                        libraryId
                    ),

            enabled:
                !!libraryId,
        });
    };