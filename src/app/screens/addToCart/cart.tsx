import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import tw from "@/src/lib/tailwind";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { CartData } from "@/src/components/CardData";
import { Circle, SvgXml } from "react-native-svg";
import { IconMuniceButton, IconPlusButton } from "@/assets/icon";

const cart = () => {
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={"Change password"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`mx-5`}
      >
        {CartData.map((data) => (
          <TouchableOpacity
            key={data.id}
            style={tw`flex-row justify-between items-center p-2 rounded-xl bg-white mb-2`}
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

        <View style={tw`bg-[#F3F5F7] p-4 my-16 rounded-xl`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
              Total items:
            </Text>
            <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
              3
            </Text>
          </View>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
              Sub total:
            </Text>
            <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
              $50.55
            </Text>
          </View>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
              Delivery charge:
            </Text>
            <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
              $4.45
            </Text>
          </View>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
              Tax:
            </Text>
            <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
              $0.5
            </Text>
          </View>
          {/*  ====== border bottom ---------- */}
          <View style={tw`w-full `}>
            <Text
              style={tw`w-full mx-auto border-b border-regularText  `}
            ></Text>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-PoppinsSemiBold text-lg text-black`}>
              Total:
            </Text>
            <Text style={tw`font-PoppinsSemiBold text-lg text-black`}>
              $55.05
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default cart;
