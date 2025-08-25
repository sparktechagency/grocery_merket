import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="notification" />
      <Stack.Screen name="orderAccept" />
      <Stack.Screen name="orderReceived" />
    </Stack>
  );
};

export default _layout;
