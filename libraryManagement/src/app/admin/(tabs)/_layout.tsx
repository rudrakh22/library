import {
    NativeTabs,
} from "expo-router/unstable-native-tabs";

export default function AdminLayout() {

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
                name="users"
            >

                <NativeTabs.Trigger.Label>
                    Users
                </NativeTabs.Trigger.Label>

                <NativeTabs.Trigger.Icon
                    sf={{
                        default: "person.2",
                        selected: "person.2.fill",
                    }}
                    md="groups"
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
                name="revenue"
            >

                <NativeTabs.Trigger.Label>
                    Revenue
                </NativeTabs.Trigger.Label>

                <NativeTabs.Trigger.Icon
                    sf={{
                        default: "indianrupeesign.circle",
                        selected: "indianrupeesign.circle.fill",
                    }}
                    md="payments"
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
                        default: "person.crop.circle",
                        selected: "person.crop.circle.fill",
                    }}
                    md="account_circle"
                />

            </NativeTabs.Trigger>

        </NativeTabs>
    );
}