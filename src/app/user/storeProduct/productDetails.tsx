import { View, Text, Image } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { ImgBestSellerOne, ImgDetailsBG } from "@/assets/images";

const productDetails = () => {
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent
        onPress={() => router.back()}
        title="Store Products- (Store name)"
        titleStyle={tw`mx-auto`}
      />
      <View>
        <View>
          <Image resizeMode="cover" source={ImgDetailsBG} />
        </View>
        <Image source={ImgBestSellerOne} />
      </View>
    </View>
  );
};

export default productDetails;
