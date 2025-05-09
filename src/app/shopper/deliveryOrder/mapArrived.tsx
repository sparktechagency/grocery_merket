import { View, Text, Pressable } from "react-native";
import React from "react";
import { Dialog, PanningProvider } from "react-native-ui-lib";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconClockShopper, IconLocationWhite } from "@/assets/icon";
import TButton from "@/src/lib/buttons/TButton";
import { router } from "expo-router";

const mapArrived = () => {
  const [isVisibleModal, setIsVisibleModal] = React.useState(true);
  return (
    <View>
      <Text>mapArrived</Text>

      <Dialog
        width={"100%"}
        height={"35%"}
        visible={isVisibleModal}
        containerStyle={tw`flex-1 bg-white rounded-t-3xl `}
        onDismiss={() => setIsVisibleModal(false)}
        panDirection={PanningProvider.Directions.DOWN}
        bottom={true}
      >
        <View style={tw` py-4 px-10`}>
          <View style={tw`items-center`}>
            <Text style={tw`font-PoppinsSemiBold text-xl text-black mb-1`}>
              Arrived
            </Text>
            <View style={tw`flex-row items-center gap-1`}>
              <SvgXml xml={IconLocationWhite} />
              <Text style={tw`font-PoppinsMedium text-sm text-regularText`}>
                Fairbanks North Star
              </Text>
            </View>

            <View style={tw`flex-row items-start px-4 py-6`}>
              {/* Left timeline section */}
              <View style={tw`items-center`}>
                <View
                  style={tw`w-8 h-8 rounded-full bg-[#FEB97A] items-center justify-center`}
                >
                  <SvgXml xml={IconClockShopper} width={16} height={16} />
                </View>
                <View
                  style={tw`w-px h-12 border-l border-dashed border-[#FEB97A]`}
                />
                <View style={tw`w-2 h-2 bg-[#0A0A28] rounded-full mt-1`} />
              </View>

              {/* Text info */}
              <View style={tw`ml-4`}>
                <Text style={tw`text-sm font-semibold text-gray-900`}>
                  Estimated Time
                </Text>
                <Text style={tw`text-xl font-bold text-gray-900`}>20 min</Text>
                <Text style={tw`text-sm text-regularText mt-1`}>Swapno</Text>
                <Text style={tw`text-sm text-regularText`}>Rider location</Text>
              </View>
            </View>
          </View>

          <View style={tw`rounded-full mt-3 h-12 `}>
            <TButton
              // onPress={handleSubmit(onSubmit)}
              onPress={() => router.push("/shopper/deliveryOrder/pickUpItems")}
              title="Pick-up items"
              containerStyle={tw`rounded-md bg-primaryShopper`}
            />
          </View>
        </View>
      </Dialog>
    </View>
  );
};

export default mapArrived;
