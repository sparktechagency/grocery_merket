import { View, Text } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import {
  IconCheckout,
  IconLeftLineArrow,
  IconPaymentSelected,
  IconPlaceOrder,
  IconPlaceOrderSelected,
} from "@/assets/icon";

const placeOrder = () => {
  return (
    <View>
      <BackWithComponent onPress={() => router.back()} title={"Payment"} />
      <View style={tw`flex-row items-center justify-between px-4 py-4`}>
        {/* Step 1: Checkout */}
        <View style={tw`items-center`}>
          <View style={tw`border-2 border-primary rounded-full`}>
            <View
              style={tw`w-14 h-14 rounded-full bg-primary justify-center items-center m-1`}
            >
              <SvgXml xml={IconCheckout} width={24} height={24} />
            </View>
          </View>
          <Text style={tw`text-center text-black mt-2`}>Checkout</Text>
        </View>
        {/* Arrow */}
        <View>
          <SvgXml xml={IconLeftLineArrow} />
        </View>
        {/* Step 2: Payment */}
        <View style={tw`items-center`}>
          <View style={tw`border-2 border-primary rounded-full`}>
            <View
              style={tw`w-14 h-14 rounded-full  bg-primary justify-center items-center m-1`}
            >
              <SvgXml xml={IconPaymentSelected} width={24} height={24} />
            </View>
          </View>
          <Text style={tw`text-center text-black mt-2`}>Payment</Text>
        </View>
        {/* Arrow */}
        <View>
          <SvgXml xml={IconLeftLineArrow} />
        </View>
        {/* Step 3: Place Order */}
        <View style={tw`items-center`}>
          <View style={tw`border-2 border-primary rounded-full`}>
            <View
              style={tw`w-14 h-14 rounded-full  bg-primary justify-center items-center m-1`}
            >
              <SvgXml xml={IconPlaceOrderSelected} width={24} height={24} />
            </View>
          </View>
          <Text style={tw`text-center text-black mt-2`}>Place order</Text>
        </View>
      </View>
    </View>
  );
};

export default placeOrder;
