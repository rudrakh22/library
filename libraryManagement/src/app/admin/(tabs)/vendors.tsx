import {
    ScrollView,
    Text,
    View,
    Pressable,
    RefreshControl,
} from "react-native";

import {
    MaterialIcons,
} from "@expo/vector-icons";

import Screen from "@/components/common/Screen";
import AppLoader from "@/components/common/AppLoader";

import {
    useRef,
    useState,
} from "react";

import BottomSheet from "@gorhom/bottom-sheet";

import RejectionBottomSheet from "@/components/admin/RejectionBottomSheet";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

import {
    useVendorApplications,
} from "@/hooks/admin/useVendorApplications";

import {
    useApproveVendor,
} from "@/hooks/admin/useApproveVendor";

import {
    useRejectVendor,
} from "@/hooks/admin/useRejectVendor";

export default function VendorsScreen() {

    const {

        data,

        isLoading,

        refetch,

        isRefetching,

    } = useVendorApplications();
    const bottomSheetRef =
        useRef<BottomSheet>(
            null
        );

    const [

        selectedVendorId,

        setSelectedVendorId,

    ] = useState<
        string | null
    >(
        null
    );
    const [

        showApproveDialog,

        setShowApproveDialog,

    ] = useState(false);

    const approveVendor =
        useApproveVendor();

    const rejectVendor =
        useRejectVendor();

    if (isLoading) {

        return (

            <AppLoader

                variant="admin"
                subtitle="Loading vendor requests..."
            />
        );
    }

    return (

        <Screen>

            <ScrollView

                className="flex-1 bg-background"

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

                <View className="flex-row items-center justify-between p-4">

                    <View>

                        <Text className="text-3xl font-bold text-foreground">

                            Vendors

                        </Text>

                        <Text className="mt-1 text-muted-foreground">

                            Manage vendor applications

                        </Text>

                    </View>

                    <View className="rounded-full bg-primary/10 px-4 py-2">

                        <Text className="font-semibold text-primary">

                            {data?.length ?? 0}

                        </Text>

                    </View>

                </View>

                {
                    !data?.length ? (

                        <View className="mx-5 mt-20 items-center justify-center h-full rounded-3xl bg-card p-8">

                            <MaterialIcons
                                name="store"
                                size={64}
                                color="#8B5CF6"
                            />

                            <Text className="mt-4 text-xl font-bold text-foreground">

                                No Vendor Applications

                            </Text>

                            <Text className="mt-2 text-center text-muted-foreground">

                                No vendor applications have been submitted yet.
                            </Text>

                        </View>

                    ) : (
                        data?.map(
                            (
                                vendor: any
                            ) => (

                                <View

                                    key={
                                        vendor.id
                                    }

                                    className="mx-5 mb-4 rounded-3xl bg-card p-5"
                                >

                                    <View className="flex-row items-center justify-between">

                                        <View>

                                            <Text className="text-lg font-semibold text-foreground">

                                                {
                                                    vendor.businessName
                                                }

                                            </Text>

                                            <Text className="mt-1 text-muted-foreground">

                                                {
                                                    vendor.user
                                                        ?.email
                                                }

                                            </Text>

                                        </View>

                                        <StatusBadge
                                            status={
                                                vendor.verificationStatus
                                            }
                                        />

                                    </View>

                                    <View className="mt-4">

                                        <Text className="text-muted-foreground">

                                            GST:
                                            {" "}
                                            {
                                                vendor.gstNumber ??
                                                "-"
                                            }

                                        </Text>

                                        <Text className="mt-1 text-muted-foreground">

                                            PAN:
                                            {" "}
                                            {
                                                vendor.panNumber ??
                                                "-"
                                            }

                                        </Text>

                                    </View>

                                    {vendor.verificationStatus ===
                                        "PENDING" && (

                                            <View className="mt-5 flex-row">

                                                <Pressable

                                                    className="mr-3 flex-1 rounded-2xl bg-primary py-3"

                                                    onPress={() => {

                                                        setSelectedVendorId(
                                                            vendor.id
                                                        );

                                                        setShowApproveDialog(
                                                            true
                                                        );
                                                    }}
                                                >

                                                    <Text className="text-center font-semibold text-primary-foreground">

                                                        Approve

                                                    </Text>

                                                </Pressable>

                                                <Pressable

                                                    className="flex-1 rounded-2xl bg-destructive py-3"

                                                    onPress={() => {

                                                        setSelectedVendorId(
                                                            vendor.id
                                                        );

                                                        bottomSheetRef
                                                            .current
                                                            ?.expand();
                                                    }}
                                                >

                                                    <Text className="text-center font-semibold text-destructive-foreground">

                                                        Reject

                                                    </Text>

                                                </Pressable>

                                            </View>
                                        )}

                                </View>
                            ))
                    )}

            </ScrollView>
            <RejectionBottomSheet

                ref={
                    bottomSheetRef
                }

                onSubmit={(
                    reason
                ) => {

                    if (
                        !selectedVendorId
                    ) {

                        return;
                    }

                    rejectVendor.mutate({

                        vendorId:
                            selectedVendorId,

                        rejectionReason:
                            reason,
                    });

                    bottomSheetRef
                        .current
                        ?.close();
                }}
            />
            <ConfirmDialog

                visible={
                    showApproveDialog
                }

                title="Approve Vendor"

                description="Are you sure you want to approve this vendor application?"

                confirmText="Approve"

                loading={
                    approveVendor.isPending
                }

                onCancel={() => {

                    setShowApproveDialog(
                        false
                    );

                    setSelectedVendorId(
                        null
                    );
                }}

                onConfirm={() => {

                    if (
                        !selectedVendorId
                    ) {

                        return;
                    }

                    approveVendor.mutate(

                        selectedVendorId,

                        {

                            onSuccess: () => {

                                setShowApproveDialog(
                                    false
                                );

                                setSelectedVendorId(
                                    null
                                );
                            },
                        }
                    );
                }}
            />
        </Screen>
    );
}

function StatusBadge({
    status,
}: {
    status: string;
}) {

    if (
        status ===
        "APPROVED"
    ) {

        return (

            <View className="rounded-full bg-green-100 px-3 py-1">

                <Text className="text-green-700">

                    Approved

                </Text>

            </View>
        );
    }

    if (
        status ===
        "REJECTED"
    ) {

        return (

            <View className="rounded-full bg-red-100 px-3 py-1">

                <Text className="text-red-700">

                    Rejected

                </Text>

            </View>
        );
    }

    return (

        <View className="rounded-full bg-yellow-100 px-3 py-1">

            <Text className="text-yellow-700">

                Pending

            </Text>

        </View>
    );
}