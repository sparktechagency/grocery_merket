import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import tw from "@/src/lib/tailwind";

const RootLayout = () => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            statusBarAnimation: "fade",
            statusBarStyle: "light",
            statusBarBackgroundColor: tw.color("primary"),
          }}
        >
          <Stack.Screen name="home/home" />
        </Stack>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default RootLayout;
