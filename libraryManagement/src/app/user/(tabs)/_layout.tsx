import {
    NativeTabs,
} from "expo-router/unstable-native-tabs";

export default function UserLayout() {

    return (

        <NativeTabs>

            <NativeTabs.Trigger
                name="index"
            >
                <NativeTabs.Trigger.Label>
                    Home
                </NativeTabs.Trigger.Label>

                <NativeTabs.Trigger.Icon
                    sf={{
                        default: "house",
                        selected: "house.fill",
                    }}
                    md="home"
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
                        default: "books.vertical",
                        selected: "books.vertical.fill",
                    }}
                    md="local_library"
                />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger
                name="bookings"
            >
                <NativeTabs.Trigger.Label>
                    Bookings
                </NativeTabs.Trigger.Label>

                <NativeTabs.Trigger.Icon
                    sf={{
                        default: "ticket",
                        selected: "ticket.fill",
                    }}
                    md="confirmation_number"
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