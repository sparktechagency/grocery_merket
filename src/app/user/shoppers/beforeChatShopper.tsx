import { View, Text, Image } from "react-native";
import React from "react";
import BackButton from "@/src/lib/backHeader/BackButton";
import { ImgChatProfile } from "@/assets/images";
import { SvgXml } from "react-native-svg";
import { IconLocationWhite } from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import IwtButton from "@/src/lib/buttons/IwtButton";
import { router } from "expo-router";

const beforeChatShopper = () => {
  const [isActive, setIsActive] = React.useState(false);
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton onPress={() => router.back()} />
      <View style={tw`bg-[#F3F5F7] rounded-2xl p-4 mx-5`}>
        <View style={tw`flex-row items-center gap-3 mb-5`}>
          <Image style={tw`w-20 h-20 rounded-full`} source={ImgChatProfile} />
          <View>
            <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
              Theresa Webb
            </Text>
            <View style={tw`flex-row gap-1`}>
              <SvgXml xml={IconLocationWhite} />
              <Text style={tw`font-PoppinsMedium text-sm text-regularText `}>
                Road no. 10, Block C, Dhaka
              </Text>
            </View>
            <Text style={tw`font-PoppinsRegular text-base text-black`}>
              (505) 555-0125
            </Text>
            <Text style={tw`font-PoppinsSemiBold text-base text-primary`}>
              200 total deliveries
            </Text>
          </View>
        </View>
        <View>
          <IwtButton
            onPress={() => router.push("/user/messaging/messaging")}
            title="Chat with shopper"
          />
        </View>
      </View>
    </View>
  );
};

export default beforeChatShopper;
