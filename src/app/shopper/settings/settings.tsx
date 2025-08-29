import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import {
  IconAboutShopper,
  IconChangeKeyShopper,
  IconFAQShopper,
  IconGetterThen,
} from "@/assets/icon";

const settings = () => {
  return (
    <View>
      <BackWithComponent onPress={() => router.back()} title={"Settings"} />
      <View style={tw`bg-[#e8eaec] p-3.5 rounded-xl mx-5 shadow-md gap-5`}>
        <TouchableOpacity
          onPress={() => router.push("/auth/changePassword")}
          style={tw`flex-row justify-between items-center w-full`}
        >
          <View style={tw`flex-row justify-start items-center  gap-3`}>
            <View
              style={tw`w-10 h-10 justify-center text-center items-center bg-[#D8EFFF] mr-5 rounded-full`}
            >
              <SvgXml xml={IconChangeKeyShopper} />
            </View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>
              Change password
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/auth/changePassword")}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/user/settings/aboutApp")}
          style={tw`flex-row justify-between items-center`}
        >
          <View style={tw`flex-row justify-start items-center gap-3`}>
            <View
              style={tw`w-10 h-10 justify-center text-center items-center bg-[#D8EFFF] mr-5 rounded-full`}
            >
              <SvgXml xml={IconAboutShopper} />
            </View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>
              About app
            </Text>
          </View>
          <Pressable
            // onPress={() => router.push("/user/users/userAddress")}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/user/settings/FAQ")}
          style={tw`flex-row justify-between items-center`}
        >
          <View style={tw`flex-row justify-start items-center gap-3`}>
            <View
              style={tw`w-10 h-10 justify-center text-center items-center bg-[#D8EFFF] mr-5 rounded-full`}
            >
              <SvgXml xml={IconFAQShopper} />
            </View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>FAQ</Text>
          </View>
          <Pressable
            onPress={() => router.push("/user/settings/FAQ")}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/shopper/shopperChat/shopperChatting")}
          style={tw`flex-row justify-between items-center`}
        >
          <View style={tw`flex-row justify-start items-center gap-3`}>
            <View
              style={tw`w-10 h-10 justify-center text-center items-center bg-[#D8EFFF] mr-5 rounded-full`}
            >
              <SvgXml xml={IconFAQShopper} />
            </View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>
              Messing
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/shopper/shopperChat/shopperChatting")}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default settings;
