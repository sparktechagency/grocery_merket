import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="placeOrder" />
      <Stack.Screen name="orderSuccess" />
    </Stack>
  );
};

export default _layout;
