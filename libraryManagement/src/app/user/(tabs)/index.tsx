import {
    ScrollView,
    Text,
    View,
    TextInput,
    Pressable,
} from "react-native";

import {
    Feather,
    MaterialIcons,
} from "@expo/vector-icons";

import {
    router,
} from "expo-router";

import {
    useCurrentUser,
} from "@/hooks/user/useCurrentUser";

import {
    useLibraries,
} from "@/hooks/library/useLibraries";

export default function HomeScreen() {

    const {
        data: user,
    } = useCurrentUser();

    const {
        data: libraries,
        isLoading,
    } = useLibraries();

    return (

        <ScrollView
            className="flex-1 bg-background"
            showsVerticalScrollIndicator={false}
        >

            {/* Hero */}

            <View className="mx-4 mt-4 rounded-3xl bg-primary p-6">

                <Text className="text-3xl font-bold text-primary-foreground">

                    Hello{" "}
                    {user?.firstName ??
                        "Reader"} 👋

                </Text>

                <Text className="mt-2 text-base text-primary-foreground/80">

                    Find your ideal study space and reserve your seat instantly.

                </Text>

            </View>

            {/* Search */}

            <View className="mx-4 mt-5 flex-row items-center rounded-2xl border border-border bg-card px-4 py-3">

                <Feather
                    name="search"
                    size={20}
                />

                <TextInput

                    placeholder="Search libraries..."

                    placeholderTextColor="#888"

                    className="ml-3 flex-1 text-foreground"
                />

            </View>

            {/* Quick Actions */}

            <Text className="mx-4 mt-6 mb-3 text-xl font-bold text-foreground">

                Quick Actions

            </Text>

            <View className="mx-4 flex-row justify-between">

                <Pressable

                    onPress={() =>
                        router.push(
                            "/user/libraries"
                        )
                    }

                    className="w-[31%] rounded-2xl bg-card p-4"
                >

                    <MaterialIcons
                        name="local-library"
                        size={28}
                    />

                    <Text className="mt-3 font-semibold text-foreground">

                        Browse

                    </Text>

                </Pressable>

                <Pressable

                    onPress={() =>
                        router.push(
                            "/user/bookings"
                        )
                    }

                    className="w-[31%] rounded-2xl bg-card p-4"
                >

                    <MaterialIcons
                        name="event-seat"
                        size={28}
                    />

                    <Text className="mt-3 font-semibold text-foreground">

                        Bookings

                    </Text>

                </Pressable>

                <Pressable

                    onPress={() =>
                        router.push(
                            "/"
                        )
                    }

                    className="w-[31%] rounded-2xl bg-card p-4"
                >

                    <MaterialIcons
                        name="store"
                        size={28}
                    />

                    <Text className="mt-3 font-semibold text-foreground">

                        Vendor

                    </Text>

                </Pressable>

            </View>

            {/* Libraries */}

            <Text className="mx-4 mt-8 mb-3 text-xl font-bold text-foreground">

                Popular Libraries

            </Text>

            {isLoading && (

                <Text className="mx-4 text-muted-foreground">

                    Loading libraries...

                </Text>
            )}

            {libraries?.slice(0, 5)?.map(
                (library: any) => (

                    <Pressable

                        key={library.id}

                        onPress={() =>
                            router.push(
                                `/user/library/${library.id}`
                            )
                        }

                        className="mx-4 mb-4 rounded-3xl bg-card p-4"
                    >

                        <Text className="text-lg font-bold text-foreground">

                            {library.name}

                        </Text>

                        <Text className="mt-1 text-muted-foreground">

                            {library.address}

                        </Text>

                        <View className="mt-4 flex-row items-center justify-between">

                            <Text className="text-primary">

                                View Details

                            </Text>

                            <MaterialIcons
                                name="arrow-forward-ios"
                                size={16}
                            />

                        </View>

                    </Pressable>
                )
            )}

        </ScrollView>
    );
}