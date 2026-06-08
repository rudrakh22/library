import {
    apiConnector,
} from "../api/apiConnector";

import {
    LIBRARY_API,
} from "../api/apis";
import { CreateLibraryDto } from "./library.types";



export const updateLibrary =
    async (
        token: string,
        id: string,
        data: CreateLibraryDto
    ) => {

        const response =
            await apiConnector(

                "PATCH",

                LIBRARY_API.UPDATE(id),

                data,

                {
                    Authorization:
                        `Bearer ${token}`,
                }
            );

        return response.data.data;
    };