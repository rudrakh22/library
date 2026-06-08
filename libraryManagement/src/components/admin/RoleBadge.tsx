import { View,Text } from "react-native";

export default function RoleBadge({
    role,
}: {
    role: string;
}) {

    return role ===
        "VENDOR"

        ? (

            <View className="rounded-full bg-green-100 px-3 py-1">

                <Text className="font-medium text-green-700">

                    Vendor

                </Text>

            </View>

        )

        : (

            <View className="rounded-full bg-blue-100 px-3 py-1">

                <Text className="font-medium text-blue-700">

                    User

                </Text>

            </View>

        );
}