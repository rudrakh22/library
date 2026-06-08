import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";
import * as Linking from "expo-linking";

const useSocialAuth = () => {
    const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
    const { startSSOFlow } = useSSO();
    const redirectUrl = Linking.createURL("/sso-callback");
    const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple" | "oauth_facebook") => {
        if (loadingStrategy) return;

        setLoadingStrategy(strategy);

        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy,
                redirectUrl
            });

            if (!createdSessionId || !setActive) {
                Alert.alert("Sign-in incomplete", "Sign-in did not complete. Please try again.");
                return;
            }

            await setActive({ session: createdSessionId });
        } catch (error) {
            console.log("💥 Error in social auth:", error);
            Alert.alert("Error", "Failed to sign in. Please try again.");
        } finally {
            setLoadingStrategy(null);
        }
    };

    return { handleSocialAuth, loadingStrategy };
};

export default useSocialAuth;