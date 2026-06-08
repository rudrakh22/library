import {
    Modal,
    View,
    Pressable,
    Text,
} from "react-native";

interface AppModalProps {

    visible: boolean;

    title?: string;

    onClose: () => void;

    children: React.ReactNode;
}

export default function AppModal({

    visible,

    title,

    onClose,

    children,

}: AppModalProps) {

    return (

        <Modal

            visible={visible}

            transparent

            animationType="fade"
        >

            <View className="flex-1 items-center justify-center bg-black/50 px-5">

                <View className="w-full rounded-3xl bg-card p-5">

                    <View className="mb-4 flex-row items-center justify-between">

                        <Text className="text-xl font-bold text-foreground">

                            {title}

                        </Text>

                        <Pressable
                            onPress={onClose}
                        >

                            <Text className="text-primary">

                                Close

                            </Text>

                        </Pressable>

                    </View>

                    {children}

                </View>

            </View>

        </Modal>
    );
}