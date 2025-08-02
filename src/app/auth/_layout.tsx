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

      <Stack.Screen name="forgetOtpCode" />
      <Stack.Screen name="addFace" />
      <Stack.Screen name="addFingerPrint" />
      <Stack.Screen name="antherAuth" />
      <Stack.Screen name="changePassword" />
      <Stack.Screen name="OTPCode" />
      <Stack.Screen name="resetPassSuccess" />
      <Stack.Screen name="singUp" />
    </Stack>
  );
};

export default AuthLayout;
