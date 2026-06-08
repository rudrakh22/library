import {
    View,
    Text,
    Pressable,
    ScrollView,
    Alert,
} from "react-native";

import {
    MaterialIcons,
} from "@expo/vector-icons";

import {
    useClerk,
} from "@clerk/expo";

import Screen from "@/components/common/Screen";
import AppLoader from "@/components/common/AppLoader";

import {
    useCurrentUser,
} from "@/hooks/user/useCurrentUser";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { router } from "expo-router";

export default function AdminProfileScreen() {

    const {
        signOut,
    } = useClerk();

    const {

        data: user,

        isLoading,

    } = useCurrentUser();

    const completedFields = [

        user?.firstName,

        user?.lastName,

        user?.phone,

    ].filter(Boolean).length;

    const profilePercentage =
        Math.round(
            (completedFields / 3) * 100
        );

    const [

        showLogoutDialog,

        setShowLogoutDialog,

    ] = useState(false);

    if (isLoading) {

        return (

            <AppLoader

                variant="admin"
                subtitle="Fetching administrator details..."
            />
        );
    }

    return (

        <Screen>

            <ScrollView

                className="flex-1 bg-background"

                contentContainerStyle={{
                    paddingBottom: 30,
                }}
            >

                {/* Header */}

                <View className="px-5 pt-4">

                    <Text className="text-3xl font-bold text-foreground">

                        Profile

                    </Text>

                    <Text className="mt-1 text-muted-foreground">

                        Administrator Account

                    </Text>

                </View>

                {/* Profile Card */}

                <View className="mx-5 mt-6 overflow-hidden rounded-3xl bg-card">

                    {/* Top Gradient Section */}

                    <View className="items-center  px-6 py-8">

                        <View className="h-28 w-28 items-center justify-center rounded-full border-4 border-white/20 bg-white/10">

                            <MaterialIcons
                                name="admin-panel-settings"
                                size={54}
                                color="white"
                            />

                        </View>

                        <Text className="mt-4 text-2xl font-bold text-white">

                            {
                                user?.firstName ||
                                    user?.lastName

                                    ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`

                                    : "Administrator"
                            }

                        </Text>

                        <Text className="mt-1 text-white/80">

                            {user?.email}

                        </Text>

                        <View className="mt-4 rounded-full bg-white/15 px-4 py-2">

                            <Text className="font-semibold text-white">

                                Administrator

                            </Text>

                        </View>

                    </View>

                    {/* Stats */}

                    <View className="flex-row border-b border-border">

                        <View className="flex-1 items-center py-4">

                            <Text className="text-xl font-bold text-foreground">

                                {user?.role}

                            </Text>

                            <Text className="text-muted-foreground">

                                Role

                            </Text>

                        </View>

                        <View className="w-px bg-border" />

                        <View className="flex-1 items-center py-4">

                            <Text className="text-xl font-bold text-foreground">

                                {user?.phone ? "✓" : "—"}

                            </Text>

                            <Text className="text-muted-foreground">

                                Phone

                            </Text>

                        </View>

                    </View>

                    {/* Actions */}

                    <View className="p-5">

                        <Pressable

                            onPress={() =>
                                router.push(
                                    "/profile/edit"
                                )
                            }

                            className="flex-row items-center justify-center rounded-2xl bg-primary py-4"
                        >

                            <MaterialIcons

                                name="edit"

                                size={20}

                                color="white"
                            />

                            <Text className="ml-2 font-semibold text-primary-foreground">

                                Edit Profile

                            </Text>

                        </Pressable>

                    </View>

                </View>

                {/* Profile Completion */}

                <View className="mx-5 mt-5 rounded-3xl bg-card p-5">

                    <Text className="font-semibold text-foreground">

                        Profile Completion

                    </Text>

                    <View className="mt-3 h-3 rounded-full bg-secondary">

                        <View

                            style={{
                                width:
                                    `${profilePercentage}%`,
                            }}

                            className="h-3 rounded-full bg-primary"
                        />

                    </View>

                    <Text className="mt-2 text-muted-foreground">

                        {profilePercentage}% Complete

                    </Text>

                </View>

                {/* Account Information */}

                <View className="mx-5 mt-5 rounded-3xl bg-card p-5">

                    <Text className="mb-4 text-lg font-semibold text-foreground">

                        Account Information

                    </Text>

                    <ProfileRow

                        icon="email"

                        label="Email"

                        value={user?.email}
                    />

                    <ProfileRow

                        icon="person"

                        label="Role"

                        value={user?.role}
                    />

                    <ProfileRow

                        icon="phone"

                        label="Phone"

                        value={
                            user?.phone ||
                            "Not Added"
                        }
                    />

                    {
                        !user?.phone && (

                            <Pressable

                                onPress={() =>
                                    router.push(
                                        "/profile/edit"
                                    )
                                }

                                className="mt-2 rounded-xl bg-primary/10 px-4 py-3"
                            >

                                <Text className="font-medium text-primary">

                                    Add Phone Number

                                </Text>

                            </Pressable>
                        )
                    }

                </View>

                {/* Admin Actions */}

                <View className="mx-5 mt-5 rounded-3xl bg-card p-5">

                    <Text className="mb-4 text-lg font-semibold text-foreground">

                        Admin Actions

                    </Text>

                    <ActionItem

                        icon="dashboard"

                        title="Dashboard"

                        onPress={() =>
                            router.push(
                                "/admin"
                            )
                        }
                    />

                    <ActionItem

                        icon="verified-user"

                        title="Vendor Applications"

                        onPress={() =>
                            router.push(
                                "/admin/vendors"
                            )
                        }
                    />

                    <ActionItem

                        icon="groups"

                        title="Manage Users"

                        onPress={() =>
                            router.push(
                                "/admin/users"
                            )
                        }
                    />

                    <ActionItem

                        icon="local-library"

                        title="Manage Libraries"

                        onPress={() =>
                            router.push(
                                "/admin/libraries"
                            )
                        }
                    />

                    <ActionItem

                        icon="payments"

                        title="Revenue Dashboard"

                        onPress={() =>
                            router.push(
                                "/admin/revenue"
                            )
                        }
                    />

                </View>

                {/* Danger Zone */}

                <View className="mx-5 mt-5 rounded-3xl border border-destructive/20 bg-card p-5">

                    <Text className="text-lg font-semibold text-destructive">

                        Danger Zone

                    </Text>

                    <Text className="mt-1 text-muted-foreground">

                        These actions affect your current session.

                    </Text>

                    <Pressable

                        className="mt-5 flex-row items-center rounded-2xl bg-destructive/10 p-4"

                        onPress={() =>
                            setShowLogoutDialog(
                                true
                            )
                        }
                    >

                        <MaterialIcons

                            name="logout"

                            size={22}

                            color="#ef4444"
                        />

                        <View className="ml-3 flex-1">

                            <Text className="font-semibold text-destructive">

                                Logout Account

                            </Text>

                            <Text className="text-xs text-muted-foreground">

                                Sign out from this device

                            </Text>

                        </View>

                        <MaterialIcons

                            name="chevron-right"

                            size={22}

                            color="#ef4444"
                        />

                    </Pressable>

                </View>

            </ScrollView>
            <ConfirmDialog

                visible={
                    showLogoutDialog
                }

                title="Logout Account"

                description="Are you sure you want to logout from your account?"

                confirmText="Logout"

                onCancel={() =>
                    setShowLogoutDialog(
                        false
                    )
                }

                onConfirm={async () => {

                    setShowLogoutDialog(
                        false
                    );

                    await signOut();
                }}
            />

        </Screen>
    );
}

function ProfileRow({

    icon,

    label,

    value,

}: {

    icon: keyof typeof MaterialIcons.glyphMap;

    label: string;

    value?: string;
}) {

    return (

        <View className="mb-4 flex-row items-center">

            <MaterialIcons

                name={icon}

                size={20}

                color="#8B5CF6"
            />

            <View className="ml-3 flex-1">

                <Text className="text-muted-foreground">

                    {label}

                </Text>

                <Text className="font-medium text-foreground">

                    {value}
                </Text>

            </View>

        </View>
    );
}

function ActionItem({

    icon,

    title,

    onPress,

}: {

    icon: keyof typeof MaterialIcons.glyphMap;

    title: string;

    onPress: () => void;
}) {

    return (

        <Pressable

            onPress={onPress}

            className="mb-4 flex-row items-center"
        >

            <MaterialIcons

                name={icon}

                size={22}

                color="#8B5CF6"
            />

            <Text className="ml-3 flex-1 text-foreground">

                {title}

            </Text>

            <MaterialIcons

                name="chevron-right"

                size={22}

                color="#8B5CF6"
            />

        </Pressable>
    );
}