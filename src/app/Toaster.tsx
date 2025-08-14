import { View, Text } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import tw from "../lib/tailwind";

const Toaster = () => {
  const { res } = useLocalSearchParams();
  setTimeout(() => {
    router.back();
  }, 1000);
  return (
    <View style={tw` `}>
      <View style={tw`bg-slate-700 justify-center items-center p-4 rounded-xl`}>
        <Text style={tw`text-sm font-PoppinsMedium text-white`}>{res}</Text>
      </View>
    </View>
  );
};

export default Toaster;
