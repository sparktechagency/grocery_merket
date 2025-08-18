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
      <Stack.Screen name="all_categories" />
      <Stack.Screen name="userDetails" />
      <Stack.Screen name="userOrder" />
    </Stack>
  );
};

export default _layout;
