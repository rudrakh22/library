import {
    useMemo,
    useState,
} from "react";

import {
    View,
    Text,
    FlatList,
    TextInput,
    RefreshControl,
    ActivityIndicator,
} from "react-native";

import {
    MaterialIcons,
} from "@expo/vector-icons";

import Screen from "@/components/common/Screen";

import UserStatCard from "@/components/admin/UserStatCard";
import RoleChip from "@/components/admin/RoleChip";
import UserCard from "@/components/admin/UserCard";
import UserCardSkeleton from "@/components/admin/UserCardSkeleton";

import {
    useAdminUsers,
} from "@/hooks/admin/useAdminUsers";

type UserFilterType =

    | "ALL"

    | "USER"

    | "VENDOR";

export default function UsersScreen() {

    const [

        search,

        setSearch,

    ] = useState("");

    const [

        selectedRole,

        setSelectedRole,

    ] = useState<UserFilterType>(
        "ALL"
    );

    const {

        data,

        isLoading,

        isFetching,

        fetchNextPage,

        hasNextPage,

        isFetchingNextPage,

        refetch,

        isRefetching,

    } = useAdminUsers(

        selectedRole ===
        "ALL"

            ? undefined

            : selectedRole
    );

    const users =
        useMemo(
            () =>

                data?.pages.flatMap(
                    page =>
                        page.users
                ) ?? [],

            [data]
        );

    const filteredUsers =
        useMemo(
            () => {

                const query =
                    search.toLowerCase();

                return users.filter(

                    (
                        user: any
                    ) => {

                        const fullName =

                            `${user.firstName ?? ""} ${user.lastName ?? ""}`
                                .toLowerCase();

                        const email =

                            user.email
                                ?.toLowerCase() ??
                            "";

                        return (

                            fullName.includes(
                                query
                            ) ||

                            email.includes(
                                query
                            )
                        );
                    }
                );

            },

            [
                users,
                search,
            ]
        );

    const totalUsers =
        users.filter(
            (
                user: any
            ) =>
                user.role ===
                "USER"
        ).length;

    const totalVendors =
        users.filter(
            (
                user: any
            ) =>
                user.role ===
                "VENDOR"
        ).length;

    const showSkeletons = 

        isLoading ||

        (
            isFetching &&

            users.length === 0
        );

    const listData =

        showSkeletons

            ? Array.from({
                length: 6,
            })

            : filteredUsers;

    return (

        <Screen>

            <FlatList

                data={listData}

                keyExtractor={(
                    item: any,
                    index
                ) =>

                    showSkeletons

                        ? `skeleton-${index}`

                        : item.id
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

                ListHeaderComponent={

                    <View>

                        {/* Header */}

                        <View className="px-5 pt-4">

                            <Text className="text-3xl font-bold text-foreground">

                                Users

                            </Text>

                            <Text className="mt-1 text-muted-foreground">

                                Manage users and vendors

                            </Text>

                        </View>

                        {/* Stats */}

                        <View className="mx-5 mt-5 flex-row justify-between">

                            <UserStatCard

                                title="Users"

                                value={
                                    totalUsers
                                }

                                icon="groups"
                            />

                            <UserStatCard

                                title="Vendors"

                                value={
                                    totalVendors
                                }

                                icon="store"
                            />

                        </View>

                        {/* Search */}

                        <View className="mx-5 mt-5 flex-row items-center rounded-2xl bg-card px-4">

                            <MaterialIcons

                                name="search"

                                size={22}

                                color="#8B5CF6"
                            />

                            <TextInput

                                value={
                                    search
                                }

                                onChangeText={
                                    setSearch
                                }

                                placeholder="Search users..."

                                placeholderTextColor="#9CA3AF"

                                className="ml-3 flex-1 py-4 text-foreground"
                            />

                        </View>

                        {/* Chips */}

                        <View className="mt-5 px-5">

                            <FlatList

                                horizontal

                                data={[
                                    "ALL",
                                    "USER",
                                    "VENDOR",
                                ]}

                                keyExtractor={(
                                    item
                                ) =>
                                    item
                                }

                                showsHorizontalScrollIndicator={
                                    false
                                }

                                renderItem={({
                                    item,
                                }) => (

                                    <RoleChip

                                        label={
                                            item ===
                                            "ALL"

                                                ? "All"

                                                : item ===
                                                  "USER"

                                                ? "Users"

                                                : "Vendors"
                                        }

                                        selected={
                                            selectedRole ===
                                            item
                                        }

                                        onPress={() =>
                                            setSelectedRole(
                                                item as UserFilterType
                                            )
                                        }
                                    />
                                )}
                            />

                        </View>

                    </View>
                }

                renderItem={({
                    item,
                }) =>

                    showSkeletons

                        ? (

                            <UserCardSkeleton />
                        )

                        : (

                            <UserCard
                                user={item}
                            />
                        )
                }

                ListEmptyComponent={

                    !showSkeletons

                        ? (
                            <EmptyState />
                        )

                        : null
                }

                onEndReached={() => {

                    if (

                        hasNextPage &&

                        !isFetchingNextPage

                    ) {

                        fetchNextPage();
                    }
                }}

                onEndReachedThreshold={
                    0.5
                }

                ListFooterComponent={

                    isFetchingNextPage

                        ? (

                            <View className="py-6">

                                <ActivityIndicator />

                            </View>

                        )

                        : null
                }

                contentContainerStyle={{
                    paddingBottom:
                        30,
                }}
            />

        </Screen>
    );
}

function EmptyState() {

    return (

        <View className="mx-5 mt-20 items-center rounded-3xl bg-card p-8">

            <MaterialIcons

                name="groups"

                size={64}

                color="#8B5CF6"
            />

            <Text className="mt-4 text-xl font-bold text-foreground">

                No Users Found

            </Text>

            <Text className="mt-2 text-center text-muted-foreground">

                No users match your search criteria.

            </Text>

        </View>
    );
}