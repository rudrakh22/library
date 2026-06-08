import {
    apiConnector,
} from "../api/apiConnector";

import {
    LIBRARY_API,
} from "../api/apis";


export const getLibrary =
    async (
        id: string
    ) => {

        const response =
            await apiConnector(

                "GET",

                LIBRARY_API.GET_BY_ID(id)
            );

        return response.data.data;
    };