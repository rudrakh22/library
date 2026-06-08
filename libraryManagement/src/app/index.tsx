import {
  Redirect,
} from "expo-router";

import {
  useAuth,
} from "@clerk/expo";

import {
  ActivityIndicator,
  View,
} from "react-native";

import {
  useCurrentUser,
} from "@/hooks/user/useCurrentUser";

export default function Index() {

  const {
    isLoaded,
    isSignedIn,
  } = useAuth();

  const {
    data: currentUser,
    isLoading,
  } = useCurrentUser();

  if (
    !isLoaded ||
    isLoading
  ) {

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  // Not authenticated
  if (!isSignedIn) {

    return (
      <Redirect
        href="/auth/sign-in"
      />
    );
  }

  // Admin
  if (
    currentUser?.role ===
    "ADMIN"
  ) {

    return (
      <Redirect
        href="/admin/(tabs)"
      />
    );
  }

  // Vendor
  if (
    currentUser?.role ===
    "VENDOR"
  ) {

    return (
      <Redirect
        href="/vendor/(tabs)"
      />
    );
  }

  // User
  return (
    <Redirect
      href="/user/(tabs)"
    />
  );
}