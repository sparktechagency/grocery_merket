import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconMuniceButton, IconPlusButton } from "@/assets/icon";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { CartData } from "@/src/components/CardData";

const wishlist = () => {
  return (
    <View>
      <BackWithComponent onPress={() => router.back()} title="Stores" />
      <ScrollView style={tw``}>
        {CartData.map((data) => (
          <TouchableOpacity
            key={data.id}
            style={tw`flex-row justify-between items-center mx-4 p-2 rounded-xl bg-white mb-2`}
          >
            <Image source={data.image} />
            <View>
              <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
                {data.title}
              </Text>
              <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
                {data.weight}
              </Text>
              <Text style={tw`font-PoppinsSemiBold text-base text-[#006B27]`}>
                ${data.price}
              </Text>
            </View>
            <View style={tw`items-center gap-1.5 bg-slate-50 rounded-full`}>
              <TouchableOpacity
                style={tw`px-2.5 py-3.5 rounded-full bg-[#eff3f7]`}
              >
                <SvgXml xml={IconMuniceButton} />
              </TouchableOpacity>
              <Text>00</Text>
              <TouchableOpacity style={tw`p-2.5 rounded-full bg-primary`}>
                <SvgXml xml={IconPlusButton} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default wishlist;
