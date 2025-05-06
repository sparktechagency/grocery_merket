import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import { CartData } from "@/src/components/CardData";
import tw from "@/src/lib/tailwind";

const priceComparisonProduct = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push("/user/storeProduct/productDetails")}
      style={tw`flex-row justify-between items-center p-3 rounded-2xl bg-white mb-3 shadow-lg`}
    >
      <View style={tw`flex-row gap-4`}>
        <Image
          source={item?.image}
          style={tw`w-14 h-14 rounded-md`}
          resizeMode="contain"
        />
        <View>
          <Text style={tw`font-PoppinsMedium text-lg text-black`}>
            {item?.title}
          </Text>
          <Text
            style={tw`font-PoppinsRegular w-auto text-sm px-1.5 py-0.5 bg-[#FF5F00] rounded-sm text-white`}
          >
            {item?.brand}
          </Text>
        </View>
      </View>

      <Text style={tw`font-PoppinsSemiBold text-lg text-primary mt-1`}>
        ${item?.price}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <BackWithComponent
        onPress={() => router.back()}
        title="Price Comparison"
      />
      <FlatList
        data={CartData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <Text style={tw`font-PoppinsMedium text-xl text-black my-3`}>
            Fresh Apple
          </Text>
        )}
        contentContainerStyle={tw`px-5`}
      />
    </View>
  );
};

export default priceComparisonProduct;
