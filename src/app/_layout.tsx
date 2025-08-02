import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import tw from "../lib/tailwind";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { Provider } from "react-redux";
import store from "../redux/store";

const RootLayout = () => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <Provider store={store}>
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
            </Stack>
          </GestureHandlerRootView>
        </AlertNotificationRoot>
      </Provider>
    </SafeAreaView>
  );
};

export default RootLayout;
