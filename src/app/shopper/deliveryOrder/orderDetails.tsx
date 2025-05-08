import { View, Text, ScrollView } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { SvgXml } from "react-native-svg";
import {
  IconLocation,
  IconLocationSelected,
  IconLocationWhite,
} from "@/assets/icon";
import tw from "@/src/lib/tailwind";

const orderDetails = () => {
  return (
    <ScrollView>
      <BackWithComponent
        onPress={() => router.back()}
        title={"Delivery orders"}
      />
      <View style={tw`px-5`}>
        <View style={tw`p-3 rounded-md bg-[#F3F5F7]`}>
          <Text style={tw`font-PoppinsRegular text-sm text-black mb-1`}>
            Store name: <Text style={tw`font-PoppinsMedium`}>Swapno</Text>
          </Text>
          <View style={tw`flex-row gap-1`}>
            <SvgXml xml={IconLocationWhite} />
            <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
              Fairbanks North Star
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default orderDetails;
