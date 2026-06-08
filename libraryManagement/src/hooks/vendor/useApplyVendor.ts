import {
    useMutation,
} from "@tanstack/react-query";

import {
    useAuth,
} from "@clerk/expo";

import {

    applyVendor,

    ApplyVendorPayload,

} from "@/services/vendor/applyVendor";

export const useApplyVendor =
    () => {

        const {
            getToken,
        } = useAuth();

        return useMutation({

            mutationFn:
                async (
                    data: ApplyVendorPayload
                ) => {

                    const token =
                        await getToken();

                    if (!token) {

                        throw new Error(
                            "Unauthorized"
                        );
                    }

                    return applyVendor(
                        token,
                        data
                    );
                },
        });
    };