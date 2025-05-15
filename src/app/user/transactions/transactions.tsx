import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { IconMasterCard, IconVisaCard } from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";

const transactionData = [
  {
    id: 1,
    icon: IconMasterCard,
    title: "Mastercard",
    date: new Date(Date.now()),
    price: 500,
  },
  {
    id: 2,
    icon: IconVisaCard,
    title: "Visa card",
    date: new Date(Date.now()),
    price: 500,
  },
  {
    id: 3,
    icon: IconVisaCard,
    title: "Visa card",
    date: new Date(Date.now()),
    price: 500,
  },
  {
    id: 4,
    icon: IconMasterCard,
    title: "Mastercard",
    date: new Date(Date.now()),
    price: 500,
  },
  {
    id: 5,
    icon: IconVisaCard,
    title: "Visa card",
    date: new Date(Date.now()),
    price: 500,
  },
  {
    id: 6,
    icon: IconMasterCard,
    title: "Mastercard",
    date: new Date(Date.now()),
    price: 500,
  },
  {
    id: 7,
    icon: IconVisaCard,
    title: "Visa card",
    date: new Date(Date.now()),
    price: 500,
  },
];

const transactions = () => {
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"Transactions"} />

      <ScrollView style={tw`px-5`}>
        <View style={tw`flex justify-center mb-3 gap-3`}>
          {transactionData.map((data) => (
            <TouchableOpacity
              key={data.id}
              style={tw`flex-row justify-between items-center p-5  shadow-md rounded-2xl gap-4 bg-[#ebeff3]`}
            >
              <View style={tw`flex-row justify-start items-center gap-3`}>
                <View
                  style={tw`w-16 h-16 border-2 border-white bg-[#EDF6FF] shadow-md justify-center items-center rounded-full`}
                >
                  <SvgXml xml={data.icon} />
                </View>

                <View>
                  <Text style={tw`font-PoppinsMedium text-base text-black`}>
                    {data.title}
                  </Text>

                  <Text
                    style={tw`font-PoppinsRegular text-sm text-regularText`}
                  >
                    {data.date.toLocaleDateString()} at{" "}
                    {data.date.toLocaleTimeString()}
                  </Text>
                </View>
              </View>

              <Text style={tw`font-PoppinsSemiBold text-base text-primary`}>
                ${data.price}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default transactions;
