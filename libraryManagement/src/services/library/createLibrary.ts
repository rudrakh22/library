import {
    apiConnector,
} from "../api/apiConnector";

import {
    LIBRARY_API,
} from "../api/apis";
import { CreateLibraryDto } from "./library.types";

export const createLibrary =
    async (
        token: string,
        data: CreateLibraryDto
    ) => {

        const response =
            await apiConnector(

                "POST",

                LIBRARY_API.CREATE,

                data,

                {
                    Authorization:
                        `Bearer ${token}`,
                }
            );

        return response.data.data;
    };