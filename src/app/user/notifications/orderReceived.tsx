import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import TButton from "@/src/lib/buttons/TButton";
import tw from "@/src/lib/tailwind";
import { ImgOrderReceived } from "@/assets/images";

const orderReceived = () => {
  return (
    <View>
      <BackWithComponent
        onPress={() => router.back()}
        title={"Order received"}
      />
      <View style={tw`px-5`}>
        <View style={tw`w-64 h-80 mx-auto  flex justify-center items-center`}>
          <Image source={ImgOrderReceived} />
        </View>
        <Text
          style={tw`font-PoppinsSemiBold text-base text-[#006B27] w-full text-center mx-auto px-16`}
        >
          Thanks for trusting on us.
        </Text>
        <Text
          style={tw`font-PoppinsSemiBold text-xl text-[#006B27] w-full text-center mx-auto px-16 `}
        >
          Have a good day.
        </Text>

        <TButton
          // onPress={handleSubmit(onSubmit)}
          //   onPress={() => router.push("/screens/notification/orderReceived")}
          title="Order received"
          containerStyle={tw`rounded-full bg-[#006B27] my-7 disabled`}
        />
        <TouchableOpacity onPress={() => router.push("/user/drawer/home")}>
          <Text
            style={tw`font-PoppinsSemiBold text-base text-[#006B27] w-full text-center mx-auto px-16 mb-8`}
          >
            Back to home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default orderReceived;
