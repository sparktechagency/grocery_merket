import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Shopper_Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="allShopper" />
      <Stack.Screen name="beforeChatShopper" />
      <Stack.Screen name="myShoppers" />
      <Stack.Screen name="shopperProfile" />
    </Stack>
  );
};

export default Shopper_Layout;
