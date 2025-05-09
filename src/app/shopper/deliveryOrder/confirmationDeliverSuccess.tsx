import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { ImgShopperDeliverSuccess } from "@/assets/images";
import tw from "@/src/lib/tailwind";

const confirmationDeliverSuccess = () => {
  return (
    <View style={tw`flex-1 px-10 justify-center items-center`}>
      <Image style={tw`h-24 aspect-square`} source={ImgShopperDeliverSuccess} />
      <View>
        <Text
          style={tw`font-PoppinsSemiBold text-lg text-primaryShopper mx-auto`}
        >
          Waiting fo customer confirmation
        </Text>
        <Text style={tw`font-PoppinsRegular text-sm text-regularText mx-auto`}>
          Lorem ipsum dolor sit amet consectetur. Fames eu tellus mauris
          facilisi tellus urna.{" "}
        </Text>
        <Pressable>
          <Text
            style={tw`font-PoppinsBold text-lg text-primaryShopper mx-auto underline`}
          >
            Go Home
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default confirmationDeliverSuccess;
