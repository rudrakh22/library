import {
    Slot,
} from "expo-router";

import {
    ProtectedRoute,
} from "@/components/auth/ProtectedRoute";

export default function AdminLayout() {

    return (

        <ProtectedRoute
            allowedRole="ADMIN"
        >
            <Slot />
        </ProtectedRoute>

    );
}