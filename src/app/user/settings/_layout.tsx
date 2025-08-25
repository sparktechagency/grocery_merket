import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="settings" />
      <Stack.Screen name="aboutApp" />
      <Stack.Screen name="FAQ" />
    </Stack>
  );
};

export default _layout;
