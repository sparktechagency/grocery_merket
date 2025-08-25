import { Stack } from "expo-router";
import tw from "../../lib/tailwind";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarAnimation: "fade",
        statusBarStyle: "light",
        statusBarBackgroundColor: tw.color("primary"),
      }}
    >
      <Stack.Screen name="drawer" />
      <Stack.Screen name="addToCart" />
      <Stack.Screen name="messaging" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="searchValueItem" />
      <Stack.Screen name="storeByProduct" />
      <Stack.Screen name="cryptoPayments" />
      <Stack.Screen name="paymentSystem" />
      <Stack.Screen name="priceComparisons" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="shoppers" />
      <Stack.Screen name="storeProducts" />
      <Stack.Screen name="users" />
    </Stack>
  );
};

export default RootLayout;
