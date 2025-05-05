import { View, Text, Image } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { ImgBestSellerOne, ImgDetailsBG } from "@/assets/images";

const productDetails = () => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <View>
        <View
          style={tw`bg-slate-600 w-full h-52 rounded-bl-[170px] rounded-br-[170px]`}
        ></View>
        <BackWithComponent
          onPress={() => router.back()}
          title="Fresh Carrots"
          titleStyle={tw`mx-auto`}
        />
        <View style={tw`absolute `}>
          <Image resizeMode="contain" source={ImgBestSellerOne} />
        </View>
      </View>
    </View>
  );
};

export default productDetails;
