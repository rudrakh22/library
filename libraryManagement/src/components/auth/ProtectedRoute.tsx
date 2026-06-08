import {
    Redirect,
} from "expo-router";

import {
    useAuth,
} from "@clerk/expo";

import {
    ActivityIndicator,
    View,
} from "react-native";

import {
    useCurrentUser,
} from "@/hooks/user/useCurrentUser";

interface ProtectedRouteProps {

    allowedRole:
    | "USER"
    | "VENDOR"
    | "ADMIN";

    children:
    React.ReactNode;
}

export function ProtectedRoute({
    allowedRole,
    children,
}: ProtectedRouteProps) {

    const {
        isLoaded,
        isSignedIn,
    } = useAuth();

    const {
        data: currentUser,
        isLoading,
    } = useCurrentUser();

    if (
        !isLoaded ||
        isLoading
    ) {

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator
                    size="large"
                />
            </View>
        );
    }

    if (!isSignedIn) {

        return (
            <Redirect
                href="/auth/sign-in"
            />
        );
    }

    if (
        currentUser?.role !==
        allowedRole
    ) {

        return (
            <Redirect
                href="/"
            />
        );
    }

    return children;
}