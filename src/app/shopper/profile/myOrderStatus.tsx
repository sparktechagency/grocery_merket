import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { useGetShopperAllOrderQuery } from "@/src/redux/apiSlices/shopperHomeApiSlices";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";

const myOrderStatus = () => {
  // ================= api ===================
  const { data: allOrdersShopper, isLoading } = useGetShopperAllOrderQuery({});

  const headerComponent = () => (
    <BackWithComponent onPress={() => router.back()} title="My orders" />
  );

  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          tw` bg-gray-100 p-4 rounded-xl flex-row justify-between items-center mx-5 shadow-md mb-4`,
        ]}
      >
        <View style={tw`flex-1`}>
          <Text style={tw`text-black font-PoppinsSemiBold`}>
            Order id:
            <Text style={tw`font-PoppinsBold`}> #{item?.order_number}</Text>
          </Text>
          <Text style={tw`text-regularText`}>
            Customer: <Text style={tw`text-black`}> {item?.user?.name}</Text>
          </Text>

          <Text
            style={[
              tw`bg-[#FFE8FD] text-[#FF00EE] w-20 h-7 text-center px-3 py-1 mt-3 rounded-md text-xs font-PoppinsSemiBold`,
              item?.status === "order_delivered" &&
                tw`bg-green-100 text-primary`,
              item?.status === "order_confirmed" ||
                (item?.status === "order_pickedup" &&
                  tw`bg-[#FFE8FD] text-[#FF00EE]`),
              item?.status === "Canceled" && tw`bg-[#FFE8E8] text-[#FF0000]`,
            ]}
          >
            {(item?.status === "order_delivered" && "Delivered") ||
              (item?.status === "order_confirmed" && "Pending") ||
              (item?.status === "order_pickedup" && "Pending") ||
              (item?.status === "Canceled" && "Canceled")}
          </Text>
        </View>

        <View style={tw`items-end`}>
          <Text style={tw`text-primary font-PoppinsBold text-lg`}>
            $ {item?.total}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={headerComponent}
      data={allOrdersShopper?.data}
      renderItem={renderItem}
      keyExtractor={(item) => item?.id.toString()}
      ListEmptyComponent={
        isLoading ? (
          <View style={tw`justify-center items-center`}>
            <ActivityIndicator size="large" color={tw.color("red-500")} />
          </View>
        ) : (
          <Text style={tw`text-center mt-4 text-gray-500`}>
            No Order products.
          </Text>
        )
      }
    />
  );
};

export default myOrderStatus;
