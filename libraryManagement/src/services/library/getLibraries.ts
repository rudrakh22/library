import {
    apiConnector,
} from "../api/apiConnector";

import {
    LIBRARY_API,
} from "../api/apis";


export const getLibraries =
    async () => {

        const response =
            await apiConnector(

                "GET",

                LIBRARY_API.GET_ALL
            );

        return response.data.data;
    };