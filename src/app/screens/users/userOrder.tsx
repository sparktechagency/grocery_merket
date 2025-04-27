import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { IconDeliver, IconDownArrow } from "@/assets/icon";
import { SvgXml } from "react-native-svg";
import tw from "@/src/lib/tailwind";

const orderData = [
  {
    orderId: 500,
    placedOn: "18 Jan 2025",
    items: 4,
    price: 50,
    status: "Canceled",
  },
  {
    orderId: 501,
    placedOn: "19 Jan 2025",
    items: 3,
    price: 35,
    status: "Delivered",
  },
  {
    orderId: 502,
    placedOn: "20 Jan 2025",
    items: 5,
    price: 75,
    status: "Pending",
  },
  {
    orderId: 503,
    placedOn: "21 Jan 2025",
    items: 2,
    price: 20,
    status: "Canceled",
  },
  {
    orderId: 504,
    placedOn: "22 Jan 2025",
    items: 6,
    price: 90,
    status: "Delivered",
  },
  {
    orderId: 505,
    placedOn: "23 Jan 2025",
    items: 1,
    price: 10,
    status: "Pending",
  },
  {
    orderId: 506,
    placedOn: "24 Jan 2025",
    items: 7,
    price: 120,
    status: "Delivered",
  },
  {
    orderId: 507,
    placedOn: "25 Jan 2025",
    items: 3,
    price: 45,
    status: "Canceled",
  },
  {
    orderId: 508,
    placedOn: "26 Jan 2025",
    items: 4,
    price: 55,
    status: "Pending",
  },
  {
    orderId: 509,
    placedOn: "27 Jan 2025",
    items: 2,
    price: 30,
    status: "Delivered",
  },
];

const userOrder = () => {
  return (
    <View>
      <BackWithComponent onPress={() => router.back()} title={"My Account"} />

      <View style={tw`mx-5`}>
        <View
          style={tw`flex-row justify-between items-center bg-[#e8eaec] rounded-lg px-5 py-4`}
        >
          <View style={tw`flex-row justify-start items-center gap-3`}>
            <View
              style={tw`p-3 border-2 border-white bg-[#e8fdee] rounded-full `}
            >
              <SvgXml xml={IconDeliver} />
            </View>
            <View>
              <Text style={tw`font-semibold text-base text-primary`}>
                Order id: #500
              </Text>
              <View style={tw`flex-row gap-1`}>
                <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                  Placed on:
                </Text>
                <Text style={tw`font-semibold text-sm`}>18 Jan 2025</Text>
              </View>
              <View>
                <View style={tw`flex-row gap-5`}>
                  <View style={tw`flex-row gap-1`}>
                    <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                      Items:
                    </Text>
                    <Text style={tw`font-semibold text-sm`}>4</Text>
                  </View>
                  <View style={tw`flex-row gap-1`}>
                    <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                      price:
                    </Text>
                    <Text style={tw`font-semibold text-sm`}>$50</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Pressable
            // onPress={() => router.push("/screens/users/userOrder")}
            style={tw`p-2 bg-white rounded-full shadow-lg`}
          >
            <SvgXml xml={IconDownArrow} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default userOrder;
