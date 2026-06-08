import {
    useAuth,
} from "@clerk/expo";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import Toast from "react-native-toast-message";

import {
    approveVendor,
} from "@/services/admin/approveVendor";

export const useApproveVendor =
    () => {

        const {
            getToken,
        } = useAuth();

        const queryClient =
            useQueryClient();

        return useMutation({

            mutationFn: async (
                vendorId: string
            ) => {

                const token =
                    await getToken();

                if (!token) {

                    throw new Error(
                        "Authentication token not found"
                    );
                }

                return approveVendor(
                    vendorId,
                    token
                );
            },

            onSuccess: () => {

                Toast.show({

                    type: "success",

                    text1:
                        "Vendor Approved",

                    text2:
                        "Vendor has been approved successfully",
                });

                queryClient.invalidateQueries({

                    queryKey: [
                        "vendor-applications",
                    ],
                });

                queryClient.invalidateQueries({

                    queryKey: [
                        "admin-dashboard",
                    ],
                });
            },

            onError: (
                error: any
            ) => {

                Toast.show({

                    type: "error",

                    text1:
                        "Approval Failed",

                    text2:
                        error?.response
                            ?.data
                            ?.message ||

                        "Failed to approve vendor",
                });
            },
        });
    };