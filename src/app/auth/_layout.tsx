import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import tw from "@/src/lib/tailwind";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarAnimation: "fade",
        statusBarStyle: "light",
        statusBarBackgroundColor: tw.color("primary"),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
