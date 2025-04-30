import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StepThree, StepThreeLogo } from "@/assets/images";
import tw from "@/src/lib/tailwind";
import { IconRightArrow, IconSoundStep, IconThreeStep } from "@/assets/icon";
import { SvgXml } from "react-native-svg";
import { router } from "expo-router";

const stepThree = () => {
  return (
    <View style={tw`flex-1 px-7 `}>
      <View style={tw`relative items-center my-16`}>
        <Image source={StepThree} />
        <Image
          style={tw`absolute w-24 h-24 m-auto bottom-22`}
          source={StepThreeLogo}
        />
      </View>
      <View>
        <Text style={tw`font-PoppinsSemiBold text-2xl text-darkGreen mb-6`}>
          Quick delivery at your doorstep
        </Text>
        <Text style={tw`font-PoppinsRegular text-lg text-regularText`}>
          Choose to be delivery or pickup according to when you need.
        </Text>
      </View>

      <View style={tw`flex-row justify-between items-center mb-10 mt-auto`}>
        <TouchableOpacity onPress={() => router.push("/auth")}>
          <Text
            style={tw`bg-skipButtonBG px-8 py-3 rounded-md font-PoppinsMedium text-lg text-darkGreen`}
          >
            Skip
          </Text>
        </TouchableOpacity>
        <SvgXml xml={IconThreeStep} />
        <TouchableOpacity
          onPress={() => router.push("/user/onboarding/stepTwo")}
        >
          <SvgXml
            xml={IconRightArrow}
            style={tw`p-5 rounded-full bg-darkGreen `}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default stepThree;
