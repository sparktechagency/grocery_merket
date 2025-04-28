import { View, Text, ScrollView } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import {
  IconDeliver,
  IconOrderConfirm,
  IconOrderDelivered,
  IconOrderDelivery,
  IconOrderPickedUp,
  IconOrderPlaced,
} from "@/assets/icon";
import TButton from "@/src/lib/buttons/TButton";

const userOrderTrack = () => {
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"My Account"} />

      <ScrollView>
        <View style={tw`mx-5 mb-2`}>
          <View
            style={tw` flex-row justify-start items-centers bg-primary rounded-xl p-7 mt-5 gap-3 `}
          >
            <View
              style={tw`w-24 h-24 justify-center items-center border-2 border-white bg-[#e8fdee] rounded-full shadow-lg `}
            >
              <SvgXml width={50} height={50} xml={IconDeliver} />
            </View>
            <View>
              <Text style={tw`font-PoppinsSemiBold text-lg text-white`}>
                Order Id: #500
              </Text>
              <View style={tw`flex-row justify-start items-center `}>
                <Text style={tw`font-PoppinsRegular text-base text-white`}>
                  Placed on:{" "}
                </Text>
                <Text style={tw`font-PoppinsSemiBold text-lg text-white`}>
                  18 Jan 2025
                </Text>
              </View>
              <View style={tw`flex-row justify-start items-center `}>
                <Text style={tw`font-PoppinsRegular text-base text-white`}>
                  Items:{" "}
                </Text>
                <Text style={tw`font-PoppinsSemiBold text-lg text-white`}>
                  4
                </Text>
              </View>
              <View style={tw`flex-row justify-start items-center `}>
                <Text style={tw`font-PoppinsRegular text-base text-white`}>
                  Total:{" "}
                </Text>
                <Text style={tw`font-PoppinsSemiBold text-lg text-white`}>
                  $50.00
                </Text>
              </View>
            </View>
          </View>

          <View style={tw`bg-[#dddfe0] mt-3 px-10 py-9 rounded-xl `}>
            <View
              style={tw`flex-row justify-start items-center bg-[#CAFFD9] px-6 py-2.5 rounded-lg gap-4`}
            >
              <View
                style={tw`w-12 h-12 justify-center items-center bg-primary rounded-full`}
              >
                <SvgXml xml={IconOrderPlaced} />
              </View>
              <View>
                <Text style={tw`font-PoppinsSemiBold text-lg text-[#006B27]`}>
                  Order placed
                </Text>
                <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                  18 Jan 2025
                </Text>
              </View>
            </View>
            <Text style={tw`h-10 w-1 bg-[#006B27] mx-auto`}></Text>

            <View
              style={tw`flex-row justify-start items-center bg-[#CAFFD9] px-6 py-2.5 rounded-lg gap-4`}
            >
              <View
                style={tw`w-12 h-12 justify-center items-center bg-primary rounded-full`}
              >
                <SvgXml xml={IconOrderConfirm} />
              </View>
              <View>
                <Text style={tw`font-PoppinsSemiBold text-lg text-[#006B27]`}>
                  Order confirmed
                </Text>
                <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                  19 Jan 2025
                </Text>
              </View>
            </View>
            <Text style={tw`h-10 w-1 bg-[#006B27] mx-auto`}></Text>
            <View
              style={tw`flex-row justify-start items-center bg-[#CAFFD9] px-6 py-2.5 rounded-lg gap-4`}
            >
              <View
                style={tw`w-12 h-12 justify-center items-center bg-primary rounded-full`}
              >
                <SvgXml xml={IconOrderPickedUp} />
              </View>
              <View>
                <Text style={tw`font-PoppinsSemiBold text-lg text-[#006B27]`}>
                  Order picked-up
                </Text>
                <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                  18 Jan 2025
                </Text>
              </View>
            </View>
            <Text style={tw`h-10 w-1 bg-regularText mx-auto`}></Text>

            {/* ------------------------------------------------------------------------------------------------------- */}
            <View
              style={tw`flex-row justify-start items-center bg-white px-6 py-2.5 rounded-lg gap-4`}
            >
              <View
                style={tw`w-12 h-12 justify-center items-center bg-[#F0F0F0]  rounded-full`}
              >
                <SvgXml xml={IconOrderDelivery} />
              </View>
              <View>
                <Text style={tw`font-PoppinsSemiBold text-lg text-regularText`}>
                  Out for delivery
                </Text>
                <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
                  18 Jan 2025
                </Text>
              </View>
            </View>
            <Text style={tw`h-10 w-1 bg-regularText mx-auto`}></Text>
            <View
              style={tw`flex-row justify-start items-center bg-white px-6 py-2.5 rounded-lg gap-4`}
            >
              <View
                style={tw`w-12 h-12 justify-center items-center bg-[#F0F0F0] rounded-full`}
              >
                <SvgXml xml={IconOrderDelivered} />
              </View>
              <View>
                <Text style={tw`font-PoppinsSemiBold text-lg text-regularText`}>
                  Order delivered
                </Text>
                <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                  18 Jan 2025
                </Text>
              </View>
            </View>
          </View>

          <TButton
            // onPress={handleSubmit(onSubmit)}
            onPress={() => router.push("/drawer/home")}
            title="Back to Home"
            containerStyle={tw`rounded-full mt-5`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default userOrderTrack;
