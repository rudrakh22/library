import {
    Slot,
} from "expo-router";

import {
    ProtectedRoute,
} from "@/components/auth/ProtectedRoute";

export default function VendorLayout() {

    return (

        <ProtectedRoute
            allowedRole="VENDOR"
        >
            <Slot />
        </ProtectedRoute>

    );
}