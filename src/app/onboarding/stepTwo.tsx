import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "@/src/lib/tailwind";
import { StepTwo, StepTwoLogo } from "@/assets/images";
import { SvgXml } from "react-native-svg";
import { IconRightArrow, IconSoundStep } from "@/assets/icon";
import { router } from "expo-router";

const stepTwo = () => {
  return (
    <View style={tw`flex-1 px-7 `}>
      <View style={tw`relative items-center my-16`}>
        <Image source={StepTwo} />
        <Image
          style={tw`absolute w-24 h-24 m-auto bottom-22`}
          source={StepTwoLogo}
        />
      </View>
      <View>
        <Text style={tw`font-PoppinsSemiBold text-2xl text-orange mb-6`}>
          Gives you the best price for every items
        </Text>
        <Text style={tw`font-PoppinsRegular text-lg text-regularText`}>
          We are giving you the best price and alternatives for your daily
          needs.
        </Text>
      </View>

      <View style={tw`flex-row justify-between items-center mb-10 mt-auto`}>
        <TouchableOpacity onPress={() => router.push("/auth")}>
          <Text
            style={tw`bg-skipButtonBG px-8 py-3 rounded-md font-PoppinsMedium text-lg text-orange`}
          >
            Skip
          </Text>
        </TouchableOpacity>
        <SvgXml xml={IconSoundStep} />
        <TouchableOpacity onPress={() => router.push("/auth")}>
          <SvgXml
            xml={IconRightArrow}
            style={tw`p-5 rounded-full bg-orange `}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default stepTwo;
