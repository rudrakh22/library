import {
    useAuth,
} from "@clerk/expo";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import Toast from "react-native-toast-message";

import {
    rejectVendor,
} from "@/services/admin/rejectVendor";

interface RejectVendorPayload {

    vendorId: string;

    rejectionReason: string;
}

export const useRejectVendor =
    () => {

        const {
            getToken,
        } = useAuth();

        const queryClient =
            useQueryClient();

        return useMutation({

            mutationFn: async ({
                vendorId,
                rejectionReason,
            }: RejectVendorPayload) => {

                const token =
                    await getToken();

                if (!token) {

                    throw new Error(
                        "Authentication token not found"
                    );
                }

                return rejectVendor(
                    token,
                    vendorId,
                    rejectionReason
                );
            },

            onSuccess: () => {

                Toast.show({

                    type: "success",

                    text1:
                        "Vendor Rejected",

                    text2:
                        "Vendor application rejected successfully",
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
                        "Rejection Failed",

                    text2:
                        error?.response
                            ?.data
                            ?.message ||

                        "Failed to reject vendor",
                });
            },
        });
    };