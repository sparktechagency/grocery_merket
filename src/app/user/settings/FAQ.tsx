import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { SvgXml } from "react-native-svg";
import { IconDownArrow, IconUpArrow } from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import Collapsible from "react-native-collapsible";

const FAQ = () => {
  const [pleaseOder, SetPleaseOrder] = React.useState(true);
  const [pleaseMethods, SetPleaseMethods] = React.useState(true);
  const [pleaseDelivery, SetPleaseDelivery] = React.useState(true);
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"FAQ"} />
      <View style={tw`mx-5`}>
        <View
          style={tw`flex-row justify-between items-center bg-[#d6d9dd] px-5 py-4 rounded-xl`}
        >
          <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
            1. How do I place an order?
          </Text>
          <TouchableOpacity
            onPress={() => SetPleaseOrder(!pleaseOder)}
            style={tw`p-2 bg-white rounded-full shadow-lg`}
          >
            {pleaseOder ? (
              <SvgXml xml={IconDownArrow} />
            ) : (
              <SvgXml xml={IconUpArrow} />
            )}
          </TouchableOpacity>
        </View>
        <Collapsible collapsed={pleaseOder}>
          <Text
            style={tw` px-5 py-4 bg-white rounded-lg font-PoppinsRegular text-sm`}
          >
            Placing an order is easy! Simply browse through our categories, add
            items to your cart, and proceed to checkout. Select your delivery
            address, choose a payment method, and confirm your order. We’ll take
            care of the rest!
          </Text>
        </Collapsible>
        <View
          style={tw`flex-row justify-between items-center bg-[#d6d9dd] px-5 py-4 rounded-xl mt-4`}
        >
          <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
            2. What payment methods do you accept?
          </Text>
          <TouchableOpacity
            onPress={() => SetPleaseMethods(!pleaseMethods)}
            style={tw`p-2 bg-white rounded-full shadow-lg`}
          >
            {pleaseMethods ? (
              <SvgXml xml={IconDownArrow} />
            ) : (
              <SvgXml xml={IconUpArrow} />
            )}
          </TouchableOpacity>
        </View>
        <Collapsible collapsed={pleaseMethods}>
          <Text
            style={tw` px-5 py-4 bg-white rounded-lg font-PoppinsRegular text-sm`}
          >
            Placing an order is easy! Simply browse through our categories, add
            items to your cart, and proceed to checkout. Select your delivery
            address, choose a payment method, and confirm your order. We’ll take
            care of the rest!
          </Text>
        </Collapsible>
        <View
          style={tw`flex-row justify-between items-center bg-[#d6d9dd] px-5 py-4 rounded-xl mt-4`}
        >
          <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
            3. How long does delivery take?
          </Text>
          <TouchableOpacity
            onPress={() => SetPleaseDelivery(!pleaseDelivery)}
            style={tw`p-2 bg-white rounded-full shadow-lg`}
          >
            {pleaseDelivery ? (
              <SvgXml xml={IconDownArrow} />
            ) : (
              <SvgXml xml={IconUpArrow} />
            )}
          </TouchableOpacity>
        </View>
        <Collapsible collapsed={pleaseDelivery}>
          <Text
            style={tw` px-5 py-4 bg-white rounded-lg font-PoppinsRegular text-sm`}
          >
            Placing an order is easy! Simply browse through our categories, add
            items to your cart, and proceed to checkout. Select your delivery
            address, choose a payment method, and confirm your order. We’ll take
            care of the rest!
          </Text>
        </Collapsible>
      </View>
    </View>
  );
};

export default FAQ;
