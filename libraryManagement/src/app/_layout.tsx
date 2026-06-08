import {
  Slot,
} from "expo-router";

import {

  ClerkLoaded,

  ClerkLoading,

  ClerkProvider,

} from "@clerk/expo";

import {
  tokenCache,
} from "@clerk/expo/token-cache";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import * as WebBrowser from "expo-web-browser";

import "../../global.css";

import {

  DarkTheme,

  DefaultTheme,

  ThemeProvider,

} from "expo-router";

import {

  ActivityIndicator,

  Platform,

  useColorScheme,

  View,

} from "react-native";

import {
  QueryClientProvider,
} from "@tanstack/react-query";



import {
  queryClient,
} from "@/lib/queryClient";

import {
  useEffect,
} from "react";

import Toast from "react-native-toast-message";

// ======================
// WARMUP
// ======================

export const useWarmUpBrowser =
  () => {

    useEffect(() => {

      if (
        Platform.OS !==
        "android"
      ) {
        return;
      }

      void WebBrowser.warmUpAsync();

      return () => {

        void WebBrowser.coolDownAsync();
      };

    }, []);

  };

WebBrowser.maybeCompleteAuthSession();

const publishableKey =
  process.env
    .EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// ======================
// ROOT LAYOUT
// ======================

export default function RootLayout() {

  useWarmUpBrowser();

  const colorScheme =
    useColorScheme();

  return (

    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <ClerkProvider

        publishableKey={
          publishableKey
        }

        tokenCache={
          tokenCache
        }
      >

        <QueryClientProvider
          client={queryClient}
        >

          <ClerkLoading>

            <View
              style={{
                flex: 1,
                justifyContent:
                  "center",
                alignItems:
                  "center",
              }}
            >

              <ActivityIndicator
                size="large"
              />

            </View>

          </ClerkLoading>

          <ClerkLoaded>

            <ThemeProvider

              value={

                colorScheme ===
                  "dark"

                  ? DarkTheme

                  : DefaultTheme
              }
            >

              <Slot />

              {/* TOAST */}

              <Toast
                topOffset={60}
              />

            </ThemeProvider>

          </ClerkLoaded>

        </QueryClientProvider>

      </ClerkProvider>
    </GestureHandlerRootView>
  );
}