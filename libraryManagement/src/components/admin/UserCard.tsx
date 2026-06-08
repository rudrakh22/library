import { MaterialIcons } from "@expo/vector-icons";
import { View ,Text, TouchableOpacity} from "react-native";
import RoleBadge from "./RoleBadge";
import { router } from "expo-router";

export default function UserCard({
    user,
}: any) {
    return (

        <TouchableOpacity
        onPress={()=>{
            router.push({
                pathname:"/admin/users/[id]",
                params:{
                    id:user.id
                }
            })
        }}
        className="mx-5 mt-4 rounded-3xl bg-card p-5">

            <View className="flex-row items-center">

                <View className="h-14 w-14 items-center justify-center rounded-full bg-primary/10">

                    <MaterialIcons

                        name={
                            user.role ===
                            "VENDOR"

                                ? "store"

                                : "person"
                        }

                        size={28}

                        color="#8B5CF6"
                    />

                </View>

                <View className="ml-4 flex-1">

                    <Text className="text-lg font-semibold text-foreground">

                        {
                            user.firstName ||
                            user.lastName

                                ? `${user.firstName ?? ""} ${user.lastName ?? ""}`

                                : "Unnamed User"
                        }

                    </Text>

                    <Text className="mt-1 text-muted-foreground">

                        {
                            user.email
                        }

                    </Text>

                </View>

                <RoleBadge

                    role={
                        user.role
                    }
                />

            </View>

        </TouchableOpacity>
    );
}