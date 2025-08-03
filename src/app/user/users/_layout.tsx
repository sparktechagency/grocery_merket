import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="editUserDetails" />
      <Stack.Screen name="userAddress" />
      <Stack.Screen name="userDetails" />
      <Stack.Screen name="userOrder" />
      <Stack.Screen name="userOrderTrack" />
    </Stack>
  );
};

export default _layout;
