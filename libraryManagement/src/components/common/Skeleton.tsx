import {
    View,
    StyleSheet,
    DimensionValue,
} from "react-native";

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    Easing,
} from "react-native-reanimated";


import {
    useEffect,
} from "react";

import {
    LinearGradient,
} from "expo-linear-gradient";

import {
    useColorScheme,
} from "react-native";

type SkeletonProps = {
    width: DimensionValue;
    height: number;
    radius?: number;
    className?: string;
};

export default function Skeleton({
    width,
    height,
    radius = 12,
    className = "",
}: SkeletonProps) {

    const colorScheme =
        useColorScheme();

    const translateX =
        useSharedValue(-300);

    useEffect(() => {

        translateX.value =
            withRepeat(
                withTiming(300, {
                    duration: 1400,
                    easing:
                        Easing.linear,
                }),
                -1,
                false
            );

    }, []);

    const animatedStyle =
        useAnimatedStyle(() => {

            return {
                transform: [
                    {
                        translateX:
                            translateX.value,
                    },
                ],
            };

        });

    const baseColor =
        colorScheme === "dark"
            ? "hsl(150 31% 9%)"
            : "hsl(138 47% 97%)";

    const highlightColor =
        colorScheme === "dark"
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.6)";

    return (

        <View
            className={`overflow-hidden ${className}`}
            style={{
                width,
                height,
                borderRadius: radius,
                backgroundColor:
                    baseColor,
            }}
        >

            <Animated.View
                style={[
                    animatedStyle,
                ]}
            >

                <LinearGradient
                    colors={[
                        "transparent",
                        highlightColor,
                        "transparent",
                    ]}
                    start={{
                        x: 0,
                        y: 0,
                    }}
                    end={{
                        x: 1,
                        y: 0,
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />

            </Animated.View>

        </View>
    );
}