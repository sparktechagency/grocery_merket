import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { router } from "expo-router";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import tw from "@/src/lib/tailwind";
import {
  ImgOrderFour,
  ImgOrderOne,
  ImgOrderThree,
  ImgOrderTwo,
} from "@/assets/images";
import TButton from "@/src/lib/buttons/TButton";

const orderData = [
  {
    id: 1,
    image: ImgOrderOne,
    name: "Fresh Apple",
    weight: "1 kg",
  },
  {
    id: 2,
    image: ImgOrderTwo,
    name: "Fresh Carrot",
    weight: "1 kg",
  },
  {
    id: 3,
    image: ImgOrderThree,
    name: "Broccoli",
    weight: "1 kg",
  },
  {
    id: 4,
    image: ImgOrderFour,
    name: "Red paper",
    weight: "1 kg",
  },
];

const orderAccept = () => {
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"Notification"} />
      <ScrollView>
        <View style={tw`flex-row flex-wrap justify-between mx-5 mt-10`}>
          {orderData.map((order) => (
            <View
              key={order?.id}
              style={tw`flex-row gap-1 mb-4 bg-[#e8dcfa] px-5 py-4 w-[48%] rounded-2xl`}
            >
              <Image style={tw`w-16 h-10`} source={order.image} />
              <View>
                <Text>{order.name}</Text>
                <Text>{order.weight}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={tw`px-5 mt-12`}>
          <Text
            style={tw`font-PoppinsSemiBold text-base text-[#5802D0] w-full text-center mx-auto px-16 mb-8`}
          >
            Your order has arrived. Please receive your order.
          </Text>
          <TButton
            // onPress={handleSubmit(onSubmit)}
            onPress={() => router.push("/screens/notification/orderReceived")}
            title="Receive order"
            containerStyle={tw`rounded-full bg-[#5802D0]`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default orderAccept;
