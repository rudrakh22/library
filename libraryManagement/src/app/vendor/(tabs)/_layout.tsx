import {
    NativeTabs,
} from "expo-router/unstable-native-tabs";

export default function VendorLayout() {

    return (

        <NativeTabs>

            <NativeTabs.Trigger
                name="index"
            >
                <NativeTabs.Trigger.Label>
                    Dashboard
                </NativeTabs.Trigger.Label>

                <NativeTabs.Trigger.Icon
                    sf={{
                        default: "square.grid.2x2",
                        selected: "square.grid.2x2.fill",
                    }}
                    md="dashboard"
                />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger
                name="libraries"
            >
                <NativeTabs.Trigger.Label>
                    Libraries
                </NativeTabs.Trigger.Label>

                <NativeTabs.Trigger.Icon
                    sf={{
                        default: "building.2",
                        selected: "building.2.fill",
                    }}
                    md="apartment"
                />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger
                name="slots"
            >
                <NativeTabs.Trigger.Label>
                    Slots
                </NativeTabs.Trigger.Label>

                <NativeTabs.Trigger.Icon
                    sf={{
                        default: "calendar",
                        selected: "calendar.circle.fill",
                    }}
                    md="event"
                />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger
                name="wallet"
            >
                <NativeTabs.Trigger.Label>
                    Wallet
                </NativeTabs.Trigger.Label>

                <NativeTabs.Trigger.Icon
                    sf={{
                        default: "wallet.pass",
                        selected: "wallet.pass.fill",
                    }}
                    md="account_balance_wallet"
                />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger
                name="profile"
            >
                <NativeTabs.Trigger.Label>
                    Profile
                </NativeTabs.Trigger.Label>

                <NativeTabs.Trigger.Icon
                    sf={{
                        default: "person",
                        selected: "person.fill",
                    }}
                    md="person"
                />
            </NativeTabs.Trigger>

        </NativeTabs>
    );
}