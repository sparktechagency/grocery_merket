import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import tw from "../lib/tailwind";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { Provider } from "react-redux";
import store from "../redux/store";
import { StripeProvider } from "@stripe/stripe-react-native";

const RootLayout = () => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <Provider store={store}>
        <StripeProvider
          publishableKey={`pk_test_51QwUCRCdHy67C4DzwE8yFjVldhnk3iSKcvOD4y8x7QUheUhtgjFMn9lyiZGGWAAmChWMhKXLrwdaNjMCsC4ukrhl002YH6YMVr`}
        >
          <AlertNotificationRoot>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  statusBarAnimation: "fade",
                  statusBarStyle: "light",
                  statusBarBackgroundColor: tw.color("primary"),
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="user" />
                <Stack.Screen name="shopper" />
                <Stack.Screen name="role/role" />
                <Stack.Screen name="auth" />
                <Stack.Screen
                  options={{
                    animation: "fade",
                    // animationDuration: 2000,
                    presentation: "transparentModal",
                  }}
                  name="addToCardModal"
                />
                <Stack.Screen
                  name="Toaster"
                  options={{
                    sheetAllowedDetents: "fitToContents",
                    presentation: "formSheet",
                  }}
                />
              </Stack>
            </GestureHandlerRootView>
          </AlertNotificationRoot>
        </StripeProvider>
      </Provider>
    </SafeAreaView>
  );
};

export default RootLayout;
