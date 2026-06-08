import {
    ReactNode,
} from "react";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

interface ScreenProps {

    children: ReactNode;
}

export default function Screen({
    children,
}: ScreenProps) {

    return (

        <SafeAreaView
            className="flex-1 bg-background"
            edges={[
                "top",
                "left",
                "right",
            ]}
        >

            {children}

        </SafeAreaView>
    );
}