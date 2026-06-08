import { useClerk } from "@clerk/expo";
import { router } from "expo-router";
import {Button} from "react-native"

export default function LogoutButton() {

    const { signOut } =
        useClerk();

    const handleLogout =
        async () => {

            await signOut();

            router.replace(
                "/auth/sign-in"
            );
        };

    return (
        <Button
            title="Logout"
            onPress={
                handleLogout
            }
        />
    );
}