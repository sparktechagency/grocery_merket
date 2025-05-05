import { View, Image, ActivityIndicator } from "react-native";
import React from "react";

import tw from "@/src/lib/tailwind";
import { router } from "expo-router";

const index = () => {
  React.useEffect(() => {
    setTimeout(() => {
      router.push("/user/storeProduct/storeProduct");
      // router.push("/user/onboarding/onboarding");
    }, 1000);
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
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
