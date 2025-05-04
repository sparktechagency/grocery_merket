import React from "react";
import { SplashScreen, Stack } from "expo-router";
import * as Font from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  React.useEffect(() => {
    const AppLoader = async () => {
      await Font.loadAsync({
        PoppinsBlack: require("@/assets/fonts/Poppins/PoppinsBlack.ttf"),
        PoppinsBlackItalic: require("@/assets/fonts/Poppins/PoppinsBlackItalic.ttf"),
        PoppinsBold: require("@/assets/fonts/Poppins/PoppinsBold.ttf"),
        PoppinsBoldItalic: require("@/assets/fonts/Poppins/PoppinsBoldItalic.ttf"),
        PoppinsExtraBold: require("@/assets/fonts/Poppins/PoppinsExtraBold.ttf"),
        PoppinsExtraBoldItalic: require("@/assets/fonts/Poppins/PoppinsExtraBoldItalic.ttf"),
        PoppinsExtraLight: require("@/assets/fonts/Poppins/PoppinsExtraLight.ttf"),
        PoppinsExtraLightItalic: require("@/assets/fonts/Poppins/PoppinsExtraLightItalic.ttf"),
        PoppinsItalic: require("@/assets/fonts/Poppins/PoppinsItalic.ttf"),
        PoppinsLight: require("@/assets/fonts/Poppins/PoppinsLight.ttf"),
        PoppinsLightItalic: require("@/assets/fonts/Poppins/PoppinsLightItalic.ttf"),
        PoppinsMedium: require("@/assets/fonts/Poppins/PoppinsMedium.ttf"),
        PoppinsMediumItalic: require("@/assets/fonts/Poppins/PoppinsMediumItalic.ttf"),
        PoppinsRegular: require("@/assets/fonts/Poppins/PoppinsRegular.ttf"),
        PoppinsSemiBold: require("@/assets/fonts/Poppins/PoppinsSemiBold.ttf"),
        PoppinsSemiBoldItalic: require("@/assets/fonts/Poppins/PoppinsSemiBoldItalic.ttf"),
        PoppinsThin: require("@/assets/fonts/Poppins/PoppinsThin.ttf"),
        PoppinsThinItalic: require("@/assets/fonts/Poppins/PoppinsThinItalic.ttf"),
      });
      SplashScreen.hideAsync();
    };
    AppLoader();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
