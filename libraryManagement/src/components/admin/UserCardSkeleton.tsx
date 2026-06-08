import {
    View,
} from "react-native";

import Skeleton from "@/components/common/Skeleton";

export default function UserCardSkeleton() {

    return (

        <View className="mx-5 mt-4 rounded-3xl bg-card p-5">

            <View className="flex-row items-center">

                <Skeleton

                    width={56}

                    height={56}

                    radius={28}
                />

                <View className="ml-4 flex-1">

                    <Skeleton

                        width="60%"

                        height={18}
                    />

                    <Skeleton

                        width="80%"

                        height={14}

                        className="mt-3"
                    />

                    <Skeleton

                        width="35%"

                        height={12}

                        className="mt-3"
                    />

                </View>

            </View>

        </View>
    );
}