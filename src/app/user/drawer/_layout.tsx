import React from "react";

import { Stack } from "expo-router";

export default function _layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="home" />
        <Stack.Screen name="store_all_products" />
      </Stack>
    </>
  );
}
