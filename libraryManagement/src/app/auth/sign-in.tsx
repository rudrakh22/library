import useSocialAuth from "@/hooks/auth/useSocialAuth";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native"
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native"
import { router } from "expo-router";

export default function SignInScreen() {
    const { handleSocialAuth, loadingStrategy } = useSocialAuth();
    const isGoogleClicked = loadingStrategy === "oauth_google";
    const isAppleClicked = loadingStrategy === "oauth_apple";
    const isFacebookClicked = loadingStrategy === "oauth_facebook";

    const isLoading = isGoogleClicked || isAppleClicked || isFacebookClicked;

    return (
        <ScrollView>
            <SafeAreaView className="flex-1 bg-primary dark:bg-secondary" edges={["top"]}>
                {/* decorative elements */}
                <View className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-primary/70 dark:bg-primary/20" />

                <View className="absolute right-[-74px] top-40 h-72 w-72 rounded-full bg-primary/50 dark:bg-primary/20" />

                <View className="px-6 pt-4">

                    <Text className="text-center text-5xl font-extrabold tracking-tight text-primary-foreground uppercase font-mono dark:text-foreground">
                        Library
                        <Text className="text-violet-300 dark:text-primary">
                            Hub
                        </Text>
                    </Text>

                    <Text className="mt-1 text-center text-[14px] text-primary-foreground/80 dark:text-foreground/75">
                        Book your study space anytime.
                    </Text>

                    <View className="mt-6 rounded-[30px] border border-white/20 bg-white/10 p-3">

                        <Image
                            source={require("../../../assets/images/auth.png")}
                            style={{
                                width: "100%",
                                height: 300,
                            }}
                            contentFit="cover"
                        />

                    </View>

                </View>
                <View className="mt-8 flex-1 rounded-t-[36px] bg-card px-6 pb-8 pt-6">
                    <View className="self-center rounded-full bg-secondary px-3 py-1">

                        <Text className="text-xs font-semibold uppercase tracking-[1px] text-secondary-foreground">
                            Welcome To LibraryHub
                        </Text>

                    </View>

                    <Text className="mt-2 text-center text-sm leading-6 text-muted-foreground">
                        Find libraries, reserve seats, manage bookings, and access your study space seamlessly.
                    </Text>

                    <View className="mt-6">
                        <Pressable
                            className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${isLoading ? "opacity-70" : ""
                                }`}
                            disabled={isLoading}
                            onPress={() => handleSocialAuth("oauth_google")}
                        >
                            <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
                                <Image
                                    source={require("../../../assets/images/google.png")}
                                    style={{ width: 20, height: 20 }}
                                />
                            </View>

                            <Text className="ml-3 flex-1 text-lg font-semibold text-card-foreground">
                                {isGoogleClicked ? "Connecting Google..." : "Continue with Google"}
                            </Text>

                            {isGoogleClicked ? (
                                <ActivityIndicator size="small" color="#5f6e66" />
                            ) : (
                                <FontAwesome name="angle-right" size={18} color="#5f6e66" />
                            )}
                        </Pressable>
                    </View>

                    <View className="mt-2">
                        <Pressable
                            className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${isLoading ? "opacity-70" : ""
                                }`}
                            disabled={isLoading}
                            onPress={() => handleSocialAuth("oauth_apple")}
                        >
                            <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
                                <FontAwesome6 name="apple" size={22} color="#111" />
                            </View>

                            <Text className="ml-3 flex-1 text-lg font-semibold text-card-foreground">
                                {isAppleClicked ? "Connecting Apple..." : "Continue with Apple"}
                            </Text>

                            {isAppleClicked ? (
                                <ActivityIndicator size="small" color="#5f6e66" />
                            ) : (
                                <FontAwesome name="angle-right" size={18} color="#5f6e66" />
                            )}
                        </Pressable>
                    </View>

                    <View className="mt-2">
                        <Pressable
                            className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${isLoading ? "opacity-70" : ""
                                }`}
                            disabled={isLoading}
                            onPress={() => handleSocialAuth("oauth_facebook")}
                        >
                            <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
                                <FontAwesome6 name="facebook" size={22} color="#111" />
                            </View>

                            <Text className="ml-3 flex-1 text-lg font-semibold text-card-foreground">
                                {isFacebookClicked ? "Connecting Facebook..." : "Continue with Facebook"}
                            </Text>

                            {isFacebookClicked ? (
                                <ActivityIndicator size="small" color="#5f6e66" />
                            ) : (
                                <FontAwesome name="angle-right" size={18} color="#5f6e66" />
                            )}
                        </Pressable>
                    </View>

                    {/* Divider */}
                    <View className="mt-4 flex-row items-center">
                        <View className="flex-1 h-[1px] bg-border" />
                        <Text className="mx-3 text-xs text-muted-foreground">or</Text>
                        <View className="flex-1 h-[1px] bg-border" />
                    </View>
                    <Text className="mt-3 text-center text-sm leading-5 text-muted-foreground">
                        By continuing, you agree to our Terms and Privacy Policy.
                    </Text>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}