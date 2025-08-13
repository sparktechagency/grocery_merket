import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import tw from "@/src/lib/tailwind";
import { router, useLocalSearchParams } from "expo-router";

const AddToCardModal = () => {
  const { id } = useLocalSearchParams();

  return (
    <Pressable
      onPress={() => router.back()}
      style={tw`flex-1 justify-center items-center bg-black bg-opacity-15`}
    >
      <View
        style={tw`bg-white w-[80%]  rounded-2xl h-3/12 p-4 mx-4 justify-center items-center`}
      >
        <Text style={tw`text-center font-PoppinsBold text-xl mb-4`}>
          Added to cart
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`px-10 py-3 border w-full border-[#686868] rounded-xl`}
        >
          <Text style={tw`font-PoppinsRegular text-base text-center`}>
            Remove from cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`px-10 py-3 w-full  bg-primary rounded-xl mt-3`}
        >
          <Text
            style={tw`font-PoppinsSemiBold text-base text-white text-center`}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default AddToCardModal;
