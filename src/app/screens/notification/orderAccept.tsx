import { View, Text } from "react-native";
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

const orderData = [
  {
    id: 1,
    image: ImgOrderOne,
    name: "Fresh Apple",
    weight: "1 kg",
  },
  {
    id: 1,
    image: ImgOrderTwo,
    name: "Fresh Carrot",
    weight: "1 kg",
  },
  {
    id: 1,
    image: ImgOrderThree,
    name: "Broccoli",
    weight: "1 kg",
  },
  {
    id: 1,
    image: ImgOrderFour,
    name: "Red paper",
    weight: "1 kg",
  },
];

const orderAccept = () => {
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"Notification"} />
      <View></View>
    </View>
  );
};

export default orderAccept;
