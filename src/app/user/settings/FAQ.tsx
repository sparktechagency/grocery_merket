import { View } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { OnCollapsable } from "@/src/components/OnCollapsable";

const FAQ = () => {
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"FAQ"} />
      <View style={tw`mx-5`}>
        <OnCollapsable />
      </View>
    </View>
  );
};

export default FAQ;
