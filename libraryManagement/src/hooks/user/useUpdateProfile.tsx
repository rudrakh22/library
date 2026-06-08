// hooks/user/useUpdateProfile.ts

import {
    useAuth,
} from "@clerk/expo";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import Toast from "react-native-toast-message";

import {
    updateProfile,
} from "@/services/user/updateProfile";

export const useUpdateProfile =
    () => {

        const {
            getToken,
        } = useAuth();

        const queryClient =
            useQueryClient();

        return useMutation({

            mutationFn: async (
                data: {

                    firstName?: string;

                    lastName?: string;

                    phone?: string;
                }
            ) => {

                const token =
                    await getToken();

                if (!token) {

                    throw new Error(
                        "Token not found"
                    );
                }

                return updateProfile(
                    token,
                    data
                );
            },

            onSuccess: () => {

                Toast.show({

                    type: "success",

                    text1:
                        "Profile Updated",
                });

                queryClient.invalidateQueries({

                    queryKey: [
                        "current-user",
                    ],
                });
            },
        });
    };