import { View, Text, Image } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import TButton from "@/src/lib/buttons/TButton";

const orderFailed = () => {
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={"Order failed "}
      />
      <View style={tw`flex-1 flex-col justify-between mx-5`}>
        <View style={tw` w-full text-center  mx-auto`}>
          <View>
            <Text
              style={tw`font-PoppinsSemiBold text-xl text-primary mt-3 mx-auto px-20`}
            >
              Your order has failed
            </Text>
            <Text
              style={tw`font-PoppinsRegular text-base text-regularText text-center mt-3  mx-auto px-8`}
            >
              Sorry, something went wrong! Please try again to continue your
              order.
            </Text>
          </View>
        </View>

        <View style={tw`rounded-full mb-6`}>
          <TButton
            // onPress={handleSubmit(onSubmit)}
            onPress={() => router.push("/user/drawer/home")}
            title="Back to store"
            containerStyle={tw`rounded-full `}
          />
        </View>
      </View>
    </View>
  );
};

export default orderFailed;
