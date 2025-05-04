import { View, Text, Image } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { ImgEmpty, ImgOrderSuccessGIF } from "@/assets/images";
import TButton from "@/src/lib/buttons/TButton";

const orderSuccess = () => {
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={"Order Payment"}
      />
      <View style={tw`flex-1 flex-col justify-between mx-5`}>
        <View style={tw` w-full text-center  mx-auto`}>
          <View>
            <View style={tw``}>
              <Image style={tw`w-full h-80`} source={ImgOrderSuccessGIF} />
            </View>
            <Text
              style={tw`font-PoppinsSemiBold text-xl text-primary mt-3 mx-auto px-20`}
            >
              Your order has been placed successfully
            </Text>
            <Text
              style={tw`font-PoppinsRegular text-base text-regularText text-center mt-3  mx-auto px-8`}
            >
              Thanks for your order. You will get a response within few minutes.
            </Text>
          </View>
        </View>

        <View style={tw`rounded-full mb-6`}>
          <TButton
            // onPress={handleSubmit(onSubmit)}
            onPress={() => router.push("/user/users/userOrderTrack")}
            title="Truck Order"
            containerStyle={tw`rounded-full `}
          />
        </View>
      </View>
    </View>
  );
};

export default orderSuccess;
