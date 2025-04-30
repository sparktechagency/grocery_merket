import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StepOne, StepOneLogo } from "@/assets/images";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconFastStep, IconRightArrow } from "@/assets/icon";
import { router } from "expo-router";

const stepOne = () => {
  return (
    <View style={tw`flex-1 px-7 `}>
      <View style={tw`relative items-center my-16`}>
        <Image source={StepOne} />
        <Image
          style={tw`absolute w-24 h-24 m-auto bottom-25`}
          source={StepOneLogo}
        />
      </View>
      <View>
        <Text style={tw`font-PoppinsSemiBold text-2xl text-soundery mb-6`}>
          Offers fresh and quality groceries for you
        </Text>
        <Text style={tw`font-PoppinsRegular text-lg text-regularText`}>
          All items have real freshness and we are intended of your needs.
        </Text>
      </View>

      <View style={tw`flex-row justify-between items-center mb-10 mt-auto`}>
        <TouchableOpacity onPress={() => router.push("/auth")}>
          <Text
            style={tw`bg-skipButtonBG px-8 py-3 rounded-md font-PoppinsMedium text-lg text-soundery`}
          >
            Skip
          </Text>
        </TouchableOpacity>
        <SvgXml xml={IconFastStep} />
        <TouchableOpacity
          onPress={() => router.push("/user/onboarding/stepTwo")}
        >
          <SvgXml
            xml={IconRightArrow}
            style={tw`p-5 rounded-full bg-soundery`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default stepOne;
