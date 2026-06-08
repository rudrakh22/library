// src/components/ui/ConfirmDialog.tsx

import {
    Modal,
    View,
    Text,
    Pressable,
} from "react-native";

interface ConfirmDialogProps {

    visible: boolean;

    title: string;

    description?: string;

    confirmText?: string;

    cancelText?: string;

    loading?: boolean;

    onConfirm: () => void;

    onCancel: () => void;
}

export default function ConfirmDialog({

    visible,

    title,

    description,

    confirmText = "Confirm",

    cancelText = "Cancel",

    loading = false,

    onConfirm,

    onCancel,

}: ConfirmDialogProps) {

    return (

        <Modal

            visible={visible}

            transparent

            animationType="fade"
        >

            <View className="flex-1 items-center justify-center bg-black/50 px-5">

                <View className="w-full rounded-3xl bg-card p-6">

                    <Text className="text-xl font-bold text-foreground">

                        {title}

                    </Text>

                    {description && (

                        <Text className="mt-2 text-muted-foreground">

                            {description}

                        </Text>

                    )}

                    <View className="mt-6 flex-row">

                        <Pressable

                            onPress={onCancel}

                            className="mr-3 flex-1 rounded-2xl bg-secondary py-3"
                        >

                            <Text className="text-center font-semibold text-secondary-foreground">

                                {cancelText}

                            </Text>

                        </Pressable>

                        <Pressable

                            disabled={loading}

                            onPress={onConfirm}

                            className="flex-1 rounded-2xl bg-primary py-3"
                        >

                            <Text className="text-center font-semibold text-primary-foreground">

                                {loading
                                    ? "Please wait..."
                                    : confirmText}

                            </Text>

                        </Pressable>

                    </View>

                </View>

            </View>

        </Modal>
    );
}