import {
    View,
    Text,
    ScrollView,
} from "react-native";

import {
    MaterialIcons,
} from "@expo/vector-icons";

import {
    useLocalSearchParams,
} from "expo-router";

import Screen from "@/components/common/Screen";
import AppLoader from "@/components/common/AppLoader";

import {
    useAdminUserDetails,
} from "@/hooks/admin/useAdminUserDetails";

export default function UserDetailsScreen() {

    const {
        id,
    } = useLocalSearchParams<{
        id: string;
    }>();

    const {

        data: user,

        isLoading,

    } = useAdminUserDetails(
        id
    );

    if (
        isLoading
    ) {

        return (

            <AppLoader

                variant="admin"

                subtitle="Loading user details..."
            />
        );
    }

    if (
        !user
    ) {

        return (

            <Screen>

                <View className="flex-1 items-center justify-center">

                    <Text>

                        User not found
                    </Text>

                </View>

            </Screen>
        );
    }

    return (

        <Screen>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    paddingBottom: 40,
                }}
            >

                {/* Profile */}

                <View className="mx-5 mt-5 rounded-3xl bg-card p-6">

                    <View className="items-center">

                        <View className="h-24 w-24 items-center justify-center rounded-full bg-primary/10">

                            <MaterialIcons

                                name={
                                    user.role ===
                                    "VENDOR"

                                        ? "store"

                                        : "person"
                                }

                                size={50}

                                color="#8B5CF6"
                            />

                        </View>

                        <Text className="mt-4 text-2xl font-bold text-foreground">

                            {
                                user.firstName ||
                                user.lastName

                                    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`

                                    : "Unnamed User"
                            }

                        </Text>

                        <Text className="mt-2 text-muted-foreground">

                            {user.email}

                        </Text>

                    </View>

                </View>

                {/* User Information */}

                <SectionTitle
                    title="Information"
                />

                <InfoCard>

                    <InfoRow

                        label="Role"

                        value={
                            user.role
                        }
                    />

                    <InfoRow

                        label="Email"

                        value={
                            user.email
                        }
                    />

                    <InfoRow

                        label="Phone"

                        value={
                            user.phone ??
                            "Not Added"
                        }
                    />

                    <InfoRow

                        label="Joined"

                        value={
                            new Date(
                                user.createdAt
                            ).toLocaleDateString()
                        }
                    />

                </InfoCard>

                {/* Statistics */}

                <SectionTitle
                    title="Statistics"
                />

                <View className="mx-5 flex-row justify-between">

                    <StatCard

                        title="Bookings"

                        value={
                            user.totalBookings ??
                            0
                        }

                        icon="event-seat"
                    />

                    <StatCard

                        title="Spent"

                        value={`₹${

                            user.totalSpent ??
                            0
                        }`}

                        icon="payments"
                    />

                </View>

                {/* Vendor Section */}

                {
                    user.role ===
                    "VENDOR" &&

                    user.vendorProfile && (

                        <>

                            <SectionTitle
                                title="Vendor Profile"
                            />

                            <InfoCard>

                                <InfoRow

                                    label="Business"

                                    value={
                                        user.vendorProfile.businessName
                                    }
                                />

                                <InfoRow

                                    label="GST"

                                    value={
                                        user.vendorProfile.gstNumber ??
                                        "-"
                                    }
                                />

                                <InfoRow

                                    label="Status"

                                    value={
                                        user.vendorProfile.verificationStatus
                                    }
                                />

                            </InfoCard>

                        </>
                    )
                }

            </ScrollView>

        </Screen>
    );
}

function SectionTitle({
    title,
}: {
    title: string;
}) {

    return (

        <Text className="mx-5 mt-6 mb-3 text-xl font-bold text-foreground">

            {title}

        </Text>
    );
}

function InfoCard({
    children,
}: {
    children: React.ReactNode;
}) {

    return (

        <View className="mx-5 rounded-3xl bg-card p-5">

            {children}

        </View>
    );
}

function InfoRow({

    label,

    value,

}: {

    label: string;

    value: string;
}) {

    return (

        <View className="mb-4 flex-row justify-between">

            <Text className="text-muted-foreground">

                {label}

            </Text>

            <Text className="font-medium text-foreground">

                {value}

            </Text>

        </View>
    );
}

function StatCard({

    title,

    value,

    icon,

}: {

    title: string;

    value: string | number;

    icon: keyof typeof MaterialIcons.glyphMap;
}) {

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