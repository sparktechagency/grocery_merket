import { View, Text, Image } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";

import Svg, { SvgXml } from "react-native-svg";
import {
  IconCheckout,
  IconLeftLineArrow,
  IconPayment,
  IconPlaceOrder,
} from "@/assets/icon";
import tw from "@/src/lib/tailwind";

const checkOut = () => {
  const [step, setStep] = React.useState(0);
  return (
    <View>
      <BackWithComponent onPress={() => router.back()} title={"Checkout"} />
      <View style={tw`mx-5`}>
        <View style={tw`flex-row items-center justify-between px-4 py-6`}>
          {/* Step 1: Checkout */}
          <View style={tw`items-center`}>
            <View
              style={tw`w-14 h-14 rounded-full bg-primary justify-center items-center`}
            >
              <SvgXml xml={IconCheckout} width={24} height={24} />
            </View>
            <Text style={tw`text-center text-black mt-2`}>Checkout</Text>
          </View>
          {/* Arrow */}
          <View>
            <SvgXml xml={IconLeftLineArrow} />
          </View>
          ;{/* Step 2: Payment */}
          <View style={tw`items-center`}>
            <View
              style={tw`w-14 h-14 rounded-full border-2 border-primary justify-center items-center`}
            >
              <SvgXml xml={IconPayment} width={24} height={24} />
            </View>
            <Text style={tw`text-center text-black mt-2`}>Payment</Text>
          </View>
          {/* Arrow */}
          <View>
            <SvgXml xml={IconLeftLineArrow} />
          </View>
          {/* Step 3: Place Order */}
          <View style={tw`items-center`}>
            <View
              style={tw`w-14 h-14 rounded-full border-2 border-primary justify-center items-center`}
            >
              <SvgXml xml={IconPlaceOrder} width={24} height={24} />
            </View>
            <Text style={tw`text-center text-black mt-2`}>Place order</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default checkOut;
