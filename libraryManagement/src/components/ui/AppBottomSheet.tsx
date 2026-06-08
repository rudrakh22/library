import {
    forwardRef,
} from "react";

import BottomSheet, {

    BottomSheetView,

} from "@gorhom/bottom-sheet";

interface AppBottomSheetProps {

    children: React.ReactNode;
}

const AppBottomSheet =
    forwardRef<
        BottomSheet,
        AppBottomSheetProps
    >(

        (
            {
                children,
            },

            ref
        ) => {

            return (

                <BottomSheet

                    ref={ref}

                    snapPoints={[
                        "50%",
                    ]}

                    enablePanDownToClose
                    index={-1}
                >

                    <BottomSheetView className="flex-1 bg-card p-5">

                        {children}

                    </BottomSheetView>

                </BottomSheet>

            );
        }
    );

export default AppBottomSheet;