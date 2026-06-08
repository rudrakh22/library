import {
    forwardRef,
    useState,
} from "react";

import {
    View,
    Text,
    TextInput,
    Pressable,
} from "react-native";

import BottomSheet from "@gorhom/bottom-sheet";

interface Props {

    onSubmit: (
        reason: string
    ) => void;
}

const RejectionBottomSheet =
    forwardRef<
        BottomSheet,
        Props
    >(

        (
            {
                onSubmit,
            },

            ref
        ) => {

            const [

                reason,

                setReason,

            ] = useState("");

            return (

                <BottomSheet

                    ref={ref}

                    index={-1}

                    snapPoints={[
                        "45%",
                    ]}

                    enablePanDownToClose
                >

                    <View className="flex-1 bg-card p-5">

                        <Text className="text-xl font-bold text-foreground">

                            Reject Vendor

                        </Text>

                        <Text className="mt-2 text-muted-foreground">

                            Please provide a reason.
                        </Text>

                        <TextInput

                            value={reason}

                            onChangeText={
                                setReason
                            }

                            multiline

                            placeholder="Enter rejection reason"

                            className="mt-5 rounded-2xl border border-border p-4 text-foreground"
                        />

                        <Pressable

                            className="mt-5 rounded-2xl bg-destructive py-4"

                            onPress={() => {

                                if (
                                    !reason.trim()
                                ) {

                                    return;
                                }

                                onSubmit(
                                    reason
                                );

                                setReason(
                                    ""
                                );
                            }}
                        >

                            <Text className="text-center font-semibold text-destructive-foreground">

                                Reject Vendor

                            </Text>

                        </Pressable>

                    </View>

                </BottomSheet>
            );
        }
    );

export default RejectionBottomSheet;