import {
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView,
} from "react-native";

import {
    Controller,
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    router,
} from "expo-router";

import Screen from "@/components/common/Screen";
import AppLoader from "@/components/common/AppLoader";

import {
    useCurrentUser,
} from "@/hooks/user/useCurrentUser";

import {
    useUpdateProfile,
} from "@/hooks/user/useUpdateProfile";

import {

    updateProfileSchema,

    UpdateProfileFormData,

} from "@/utils/vallidations/profile.vallidation";

export default function EditProfileScreen() {

    const {

        data: user,

        isLoading,

    } = useCurrentUser();

    const updateProfile =
        useUpdateProfile();

    const {

        control,

        handleSubmit,

        formState: {
            errors,
        },

    } = useForm<UpdateProfileFormData>({

        resolver:
            zodResolver(
                updateProfileSchema
            ),

        values: {

            firstName:
                user?.firstName ??
                "",

            lastName:
                user?.lastName ??
                "",

            phone:
                user?.phone ??
                "",
        },
    });

    const onSubmit =
        (
            data:
                UpdateProfileFormData
        ) => {

            updateProfile.mutate(

                data,

                {

                    onSuccess: () => {

                        router.back();
                    },
                }
            );
        };

    if (isLoading) {

        return (

            <AppLoader

                variant="user"

                subtitle="Loading profile..."
            />
        );
    }

    return (

        <Screen>

            <ScrollView

                className="flex-1 bg-background"

                contentContainerStyle={{
                    paddingBottom: 40,
                }}
            >

                <View className="px-5 pt-4">

                    <Text className="text-3xl font-bold text-foreground">

                        Edit Profile

                    </Text>

                    <Text className="mt-1 text-muted-foreground">

                        Keep your profile information up to date

                    </Text>

                </View>

                <View className="mx-5 mt-6 rounded-3xl bg-card p-5">

                    {/* First Name */}

                    <Text className="mb-2 font-medium text-foreground">

                        First Name

                    </Text>

                    <Controller

                        control={control}

                        name="firstName"

                        render={({ field }) => (

                            <TextInput

                                value={
                                    field.value
                                }

                                onChangeText={
                                    field.onChange
                                }

                                placeholder="Enter first name"

                                className="rounded-2xl border border-border bg-background p-4 text-foreground"
                            />
                        )}
                    />

                    {errors.firstName && (

                        <Text className="mt-1 text-red-500">

                            {
                                errors
                                    .firstName
                                    .message
                            }

                        </Text>
                    )}

                    {/* Last Name */}

                    <Text className="mb-2 mt-5 font-medium text-foreground">

                        Last Name

                    </Text>

                    <Controller

                        control={control}

                        name="lastName"

                        render={({ field }) => (

                            <TextInput

                                value={
                                    field.value
                                }

                                onChangeText={
                                    field.onChange
                                }

                                placeholder="Enter last name"

                                className="rounded-2xl border border-border bg-background p-4 text-foreground"
                            />
                        )}
                    />

                    {errors.lastName && (

                        <Text className="mt-1 text-red-500">

                            {
                                errors
                                    .lastName
                                    .message
                            }

                        </Text>
                    )}

                    {/* Phone */}

                    <Text className="mb-2 mt-5 font-medium text-foreground">

                        Phone Number

                    </Text>

                    <Controller

                        control={control}

                        name="phone"

                        render={({ field }) => (

                            <TextInput

                                value={
                                    field.value
                                }

                                onChangeText={(value) => {

                                    field.onChange(

                                        value.replace(
                                            /[^0-9]/g,
                                            ""
                                        )
                                    );
                                }}

                                keyboardType="phone-pad"

                                placeholder="Enter phone number"

                                className="rounded-2xl border border-border bg-background p-4 text-foreground"
                            />
                        )}
                    />

                    {errors.phone && (

                        <Text className="mt-1 text-red-500">

                            {
                                errors
                                    .phone
                                    .message
                            }

                        </Text>
                    )}

                    <Pressable

                        disabled={
                            updateProfile.isPending
                        }

                        onPress={handleSubmit(
                            onSubmit
                        )}

                        className="mt-8 rounded-2xl bg-primary py-4"
                    >

                        <Text className="text-center font-semibold text-primary-foreground">

                            {
                                updateProfile.isPending

                                    ? "Saving..."

                                    : "Save Changes"
                            }

                        </Text>

                    </Pressable>

                </View>

            </ScrollView>

        </Screen>
    );
}