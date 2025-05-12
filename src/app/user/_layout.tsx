import React from "react";
import { Stack } from "expo-router";
import tw from "../../lib/tailwind";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarAnimation: "fade",
        statusBarStyle: "light",
        statusBarBackgroundColor: tw.color("primary"),
      }}
    >
      <Stack.Screen name="drawer/home/index" />
    </Stack>
  );
};

export default RootLayout;
