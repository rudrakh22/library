import {
    ActivityIndicator,
    View,
} from "react-native";

import {
    useAuth,
} from "@clerk/expo";

import {
    Redirect,
} from "expo-router";

export default function SSOCallback() {

    const {
        isLoaded,
        isSignedIn,
    } = useAuth();

    if (!isLoaded) {

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }

    if (!isSignedIn) {

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <Redirect href="/" />
    );
}