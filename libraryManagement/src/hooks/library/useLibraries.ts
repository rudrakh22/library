import {
    useQuery,
} from "@tanstack/react-query";

import {
    getLibraries,
} from "@/services/library/getLibraries";

export const useLibraries =
    () => {

        return useQuery({

            queryKey: [
                "libraries",
            ],

            queryFn:
                getLibraries,
        });
    };