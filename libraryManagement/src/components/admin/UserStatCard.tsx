import {
    View,
    Text,
} from "react-native";

import {
    MaterialIcons,
} from "@expo/vector-icons";

interface Props {

    title: string;

    value: number;

    icon: keyof typeof MaterialIcons.glyphMap;
}

export default function UserStatCard({

    title,

    value,

    icon,

}: Props) {

    return (

        <View className="w-[48%] rounded-3xl bg-card p-4">

            <MaterialIcons

                name={icon}

                size={24}

                color="#8B5CF6"
            />

            <Text className="mt-3 text-2xl font-bold text-foreground">

                {value}

            </Text>

            <Text className="text-muted-foreground">

                {title}

            </Text>

        </View>
    );
}