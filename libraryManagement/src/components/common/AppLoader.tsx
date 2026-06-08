import {
    useEffect,
    useState,
} from "react";

import {
    View,
    Text,
} from "react-native";

import {
    MaterialIcons,
} from "@expo/vector-icons";

import Animated, {

    Easing,

    useAnimatedStyle,

    useSharedValue,

    withRepeat,

    withSequence,

    withTiming,

} from "react-native-reanimated";

interface AppLoaderProps {



    subtitle?: string;

    variant?:
        | "admin"
        | "vendor"
        | "user";
}

const LOADER_ITEMS = {

    admin: [

        {
            icon:
                "dashboard",

            label:
                "Dashboard",
        },

        {
            icon:
                "groups",

            label:
                "Users",
        },

        {
            icon:
                "local-library",

            label:
                "Libraries",
        },

        {
            icon:
                "payments",

            label:
                "Revenue",
        },
    ],

    vendor: [

        {
            icon:
                "store",

            label:
                "Vendor",
        },

        {
            icon:
                "local-library",

            label:
                "Libraries",
        },

        {
            icon:
                "event-seat",

            label:
                "Slots",
        },

        {
            icon:
                "account-balance-wallet",

            label:
                "Earnings",
        },
    ],

    user: [

        {
            icon:
                "person",

            label:
                "Profile",
        },

        {
            icon:
                "menu-book",

            label:
                "Libraries",
        },

        {
            icon:
                "event-seat",

            label:
                "Bookings",
        },

        {
            icon:
                "calendar-month",

            label:
                "Schedule",
        },
    ],
};

export default function AppLoader({



    subtitle = "Please wait...",

    variant = "user",

}: AppLoaderProps) {

    const items =
        LOADER_ITEMS[
            variant
        ];

    const [

        currentIndex,

        setCurrentIndex,

    ] = useState(0);

    const scale =
        useSharedValue(1);

    const opacity =
        useSharedValue(1);

    useEffect(() => {

        scale.value =
            withRepeat(

                withSequence(

                    withTiming(
                        1.08,
                        {
                            duration: 700,
                        }
                    ),

                    withTiming(
                        1,
                        {
                            duration: 700,
                        }
                    )
                ),

                -1
            );

        opacity.value =
            withRepeat(

                withSequence(

                    withTiming(
                        0.7,
                        {
                            duration: 700,
                        }
                    ),

                    withTiming(
                        1,
                        {
                            duration: 700,
                        }
                    )
                ),

                -1
            );

    }, []);

    useEffect(() => {

        const interval =
            setInterval(
                () => {

                    setCurrentIndex(
                        (
                            prev
                        ) =>

                            (
                                prev +
                                1
                            ) %

                            items.length
                    );

                },

                1200
            );

        return () =>
            clearInterval(
                interval
            );

    }, [items.length]);

    const animatedStyle =
        useAnimatedStyle(
            () => ({

                opacity:
                    opacity.value,

                transform: [

                    {
                        scale:
                            scale.value,
                    },
                ],
            })
        );

    const currentItem =
        items[
            currentIndex
        ];

    return (

        <View className="flex-1 items-center justify-center bg-background px-8">

            <Animated.View

                style={
                    animatedStyle
                }

                className="h-24 w-24 items-center justify-center rounded-3xl bg-card shadow-sm"
            >

                <MaterialIcons

                    name={
                        currentItem.icon as any
                    }

                    size={42}

                    color="#8B5CF6"
                />

            </Animated.View>

            <Text className="mt-6 text-xl font-medium text-primary">
                {`Loading ${currentItem.label} ...`}

            </Text>

            <Text className="mt-2 text-center text-muted-foreground">

                {subtitle}

            </Text>

            {/* Progress Indicators */}

            <View className="mt-8 flex-row items-center">

                {items.map(
                    (
                        _,
                        index
                    ) => (

                        <View

                            key={
                                index
                            }

                            className={`mx-1 h-2.5 rounded-full ${
                                index ===
                                currentIndex

                                    ? "w-8 bg-primary"

                                    : "w-2.5 bg-border"
                            }`}
                        />
                    )
                )}

            </View>

        </View>
    );
}