import { View, Image, ActivityIndicator } from "react-native";
import React from "react";
import * as Font from "expo-font";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const index = () => {
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
      await SplashScreen.hideAsync();
    };
    AppLoader();

    setTimeout(() => {
      router.push("/user/drawer/home");
      // router.push("/user/addToCart/checkOut");
      // router.replace("/user/onboarding/onboarding");
    }, 10);
  }, []);

  return (
    <View style={tw`flex-1 bg-base`}>
      <View style={tw`flex-1 justify-center items-center gap-4`}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={tw`h-52 w-52`}
        />
        <ActivityIndicator size={"large"} color={tw.color("red-500")} />
      </View>
    </View>
  );
};

export default index;
