import {
    Pressable,
    Text,
} from "react-native";

interface Props {

    label: string;

    selected: boolean;

    onPress: () => void;
}

export default function RoleChip({

    label,

    selected,

    onPress,

}: Props) {

    return (

        <Pressable

            onPress={onPress}

            className={`mr-3 rounded-full px-4 py-2 ${

                selected

                    ? "bg-primary"

                    : "bg-card"
            }`}
        >

            <Text

                className={

                    selected

                        ? "text-primary-foreground"

                        : "text-foreground"
                }
            >

                {label}

            </Text>

        </Pressable>
    );
}