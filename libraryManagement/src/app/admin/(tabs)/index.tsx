import {
    ScrollView,
    Text,
    View,
    Pressable,
    RefreshControl,
    ActivityIndicator,
} from "react-native";

import {
    MaterialIcons,
} from "@expo/vector-icons";

import {
    router,
} from "expo-router";

import {
    useAdminDashboard,
} from "@/hooks/admin/useAdminDashboard";

import Screen from "@/components/common/Screen";
import AppLoader from "@/components/common/AppLoader";

const PRIMARY_COLOR =
    "#8B5CF6";

export default function AdminDashboardScreen() {

    const {

        data,

        isLoading,

        refetch,

        isRefetching,

    } = useAdminDashboard();

    if (isLoading) {

        return (

            <Screen>
                <AppLoader
                    variant="admin"
                    subtitle="Fetching latest platform statistics..."
                />
            </Screen>
        );
    }

    const stats = [

        {
            title:
                "Pending Vendors",

            value:
                data?.pendingVendors ??
                0,

            icon:
                "pending-actions",
        },

        {
            title:
                "Approved Vendors",

            value:
                data?.approvedVendors ??
                0,

            icon:
                "verified",
        },

        {
            title:
                "Total Users",

            value:
                data?.totalUsers ??
                0,

            icon:
                "groups",
        },

        {
            title:
                "Libraries",

            value:
                data?.totalLibraries ??
                0,

            icon:
                "local-library",
        },
    ];

    const revenueStats = [

        {
            title:
                "Today's Revenue",

            value:
                `₹${data?.todayRevenue ?? 0}`,
        },

        {
            title:
                "Total Revenue",

            value:
                `₹${data?.totalRevenue ?? 0}`,
        },

        {
            title:
                "Today's Bookings",

            value:
                data?.todayBookings ??
                0,
        },

        {
            title:
                "Total Bookings",

            value:
                data?.totalBookings ??
                0,
        },
    ];

    return (

        <Screen>

            <ScrollView

                className="flex-1 bg-background"

                contentContainerStyle={{
                    paddingBottom: 30,
                }}

                showsVerticalScrollIndicator={
                    false
                }

                refreshControl={

                    <RefreshControl

                        refreshing={
                            isRefetching
                        }

                        onRefresh={
                            refetch
                        }
                    />
                }
            >

                {/* Header */}

                <View className="px-5 pt-2">

                    <Text className="text-3xl font-bold text-foreground">

                        Admin Dashboard

                    </Text>

                    <Text className="mt-1 text-muted-foreground">

                        Monitor platform activity and revenue

                    </Text>

                </View>

                {/* Hero */}

                <View className="mx-5 mt-5 rounded-3xl bg-primary p-5">

                    <Text className="text-xl font-bold text-primary-foreground">

                        Welcome Back 👋

                    </Text>

                    <Text className="mt-2 text-primary-foreground/80">

                        Manage vendors, libraries, bookings and revenue.

                    </Text>

                </View>

                {/* Overview */}

                <Text className="mx-5 mt-8 mb-3 text-xl font-bold text-foreground">

                    Overview

                </Text>

                <View className="mx-5 flex-row flex-wrap justify-between">

                    {stats.map(
                        (
                            item
                        ) => (

                            <View

                                key={
                                    item.title
                                }

                                className="mb-4 w-[48%] rounded-3xl bg-card p-4"
                            >

                                <MaterialIcons

                                    name={
                                        item.icon as any
                                    }

                                    size={26}

                                    color={
                                        PRIMARY_COLOR
                                    }
                                />

                                <Text className="mt-4 text-3xl font-bold text-foreground">

                                    {item.value}

                                </Text>

                                <Text className="mt-1 text-muted-foreground">

                                    {item.title}

                                </Text>

                            </View>
                        )
                    )}

                </View>

                {/* Revenue */}

                <Text className="mx-5 mt-2 mb-3 text-xl font-bold text-foreground">

                    Revenue

                </Text>

                <View className="mx-5 flex-row flex-wrap justify-between">

                    {revenueStats.map(
                        (
                            item
                        ) => (

                            <View

                                key={
                                    item.title
                                }

                                className="mb-4 w-[48%] rounded-3xl bg-card p-4"
                            >

                                <Text className="text-2xl font-bold text-foreground">

                                    {item.value}

                                </Text>

                                <Text className="mt-1 text-muted-foreground">

                                    {item.title}

                                </Text>

                            </View>
                        )
                    )}

                </View>

                {/* Quick Actions */}

                <Text className="mx-5 mt-2 mb-3 text-xl font-bold text-foreground">

                    Quick Actions

                </Text>

                <View className="mx-5 flex-row flex-wrap justify-between">

                    <DashboardActionCard

                        title="Vendor Applications"

                        icon="verified-user"

                        onPress={() =>
                            router.push(
                                "/admin/vendors"
                            )
                        }
                    />

                    <DashboardActionCard

                        title="Libraries"

                        icon="local-library"

                        onPress={() =>
                            router.push(
                                "/admin/libraries"
                            )
                        }
                    />

                    <DashboardActionCard

                        title="Bookings"

                        icon="event-seat"

                        onPress={() =>
                            router.push(
                                "/admin/bookings"
                            )
                        }
                    />

                    <DashboardActionCard

                        title="Revenue"

                        icon="payments"

                        onPress={() =>
                            router.push(
                                "/admin/revenue"
                            )
                        }
                    />

                </View>

                {/* Platform Status */}

                <Text className="mx-5 mt-2 mb-3 text-xl font-bold text-foreground">

                    Platform Status

                </Text>

                <View className="mx-5 rounded-3xl bg-card p-5">

                    <View className="mt-5 flex-row items-center justify-between">

                        <Text className="text-foreground">

                            Pending Approvals

                        </Text>

                        <Text className="font-bold text-primary">

                            {
                                data?.pendingVendors ??
                                0
                            }

                        </Text>

                    </View>

                    <View className="mt-4 flex-row items-center justify-between">

                        <Text className="text-foreground">

                            Active Libraries

                        </Text>

                        <Text className="font-bold text-primary">

                            {
                                data?.totalLibraries ??
                                0
                            }

                        </Text>

                    </View>

                </View>

            </ScrollView>

        </Screen>
    );
}

function DashboardActionCard({

    title,

    icon,

    onPress,

}: {

    title: string;

    icon: keyof typeof MaterialIcons.glyphMap;

    onPress: () => void;
}) {

    return (

        <Pressable

            onPress={onPress}

            className="mb-4 w-[48%] rounded-3xl bg-card p-5"
        >

            <MaterialIcons

                name={icon}

                size={28}

                color="#8B5CF6"
            />

            <Text className="mt-3 font-semibold text-foreground">

                {title}

            </Text>

        </Pressable>
    );
}