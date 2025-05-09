import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { CartData } from "@/src/components/CardData";
import tw from "@/src/lib/tailwind";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";

const deliveryOrder = () => {
  const headerComponent = () => (
    <BackWithComponent
      onPress={() => router.back()}
      title={"Delivery orders"}
    />
  );
  const renderItem = () => (
    <View
      style={tw`bg-gray-100 p-4 rounded-xl flex-row justify-between items-center mx-5 shadow-md mb-4`}
    >
      <View style={tw`flex-1`}>
        <Text style={tw`text-black font-PoppinsSemiBold`}>
          Order id: <Text style={tw`font-PoppinsBold`}>#500</Text>
        </Text>
        <Text style={tw`text-regularText`}>
          Customer: <Text style={tw`text-black`}>Rich</Text>
        </Text>

        <Text
          style={tw`bg-[#E0F2FF] text-primaryShopper w-20 h-7 text-center px-3 py-1 mt-3 rounded-md text-xs font-PoppinsSemiBold`}
        >
          New
        </Text>
      </View>

      <View style={tw`items-end`}>
        <Text style={tw`text-primary font-PoppinsBold text-lg`}>$50.00</Text>
        <TouchableOpacity
          onPress={() =>
            router.push("/shopper/deliveryOrder/deliveryOrderMonitoring")
          }
          style={tw`mt-2 bg-primaryShopper px-4 py-1.5 rounded-lg`}
        >
          <Text style={tw`text-white font-PoppinsMedium text-sm`}>
            View details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        ListHeaderComponent={headerComponent}
        data={CartData}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id.toLocaleString()}
      />
    </View>
  );
};

export default deliveryOrder;
