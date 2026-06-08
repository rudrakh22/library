import { apiConnector } from "../api/apiConnector";
import { USER_API } from "../api/apis";



export const updateProfile =
    async (

        token: string,

        data: {

            firstName?: string;

            lastName?: string;

            phone?: string;
        }
    ) => {

        const response =
            await apiConnector(

                "PATCH",

                USER_API.UPDATE_PROFILE,

                data,

                {
                    Authorization:
                        `Bearer ${token}`,
                }
            );

        return response.data.data;
    };