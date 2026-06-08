import {
    Slot,
} from "expo-router";

import {
    ProtectedRoute,
} from "@/components/auth/ProtectedRoute";

export default function UserLayout() {
    return (
        <ProtectedRoute
            allowedRole="USER"
        >
            <Slot />
        </ProtectedRoute>

    );
}