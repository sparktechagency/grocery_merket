import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import { router, Stack } from "expo-router";

const modal = () => {
  return (
    <>
      <Stack.Screen
        name="addCartModal"
        options={{
          presentation: "transparentModal",
          animation: "fade",
        }}
      />
      <Pressable
        onPress={() => {
          router.canDismiss() && router?.dismiss();
        }}
        style={tw`flex-1 justify-center items-center bg-black bg-opacity-25`}
      >
        <Pressable style={tw``}>
          <View style={tw`bg-white w-80 rounded-2xl py-6 px-8`}>
            <Text style={tw`text-center font-PoppinsBold text-xl mb-4`}>
              Added to cart
            </Text>
            <TouchableOpacity
              onPress={() => {
                router?.dismiss();
              }}
              style={tw`px-10 py-3 border border-[#686868] rounded-xl`}
            >
              <Text style={tw`font-PoppinsRegular text-base text-center`}>
                Remove from cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router?.dismiss();
              }}
              style={tw`px-10 py-3  bg-primary rounded-xl mt-3`}
            >
              <Text
                style={tw`font-PoppinsSemiBold text-base text-white text-center`}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </>
  );
};

export default modal;
