import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="cart" />
      <Stack.Screen name="checkOut" />
      <Stack.Screen name="simpleCart" />
    </Stack>
  );
};

export default _layout;
