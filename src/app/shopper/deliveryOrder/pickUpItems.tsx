import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { CartData } from "@/src/components/CardData";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { Checkbox } from "@/src/lib/CheckBox/Checkbox";
import TButton from "@/src/lib/buttons/TButton";

const pickUpItems = () => {
  const headerRender = () => (
    <BackWithComponent onPress={() => router.back()} title="Pick-Up Items" />
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      //   onPress={() => router.push("/user/storeProducts/productDetails")}
      style={tw`flex-row justify-between items-center px-3 py-1  rounded-xl bg-white mb-3 shadow-sm`}
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
          <View>
            <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
              1kg
            </Text>
            <Text style={tw`font-PoppinsSemiBold text-base text-primary`}>
              $ {item.price}
            </Text>
          </View>
        </View>
      </View>

      <Checkbox contentStyle={tw`rounded-sm border-primary`} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={CartData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={headerRender}
      ListFooterComponent={() => (
        <View style={tw`rounded-full my-3 h-12`}>
          <TButton
            // onPress={handleSubmit(onSubmit)}
            onPress={() => router.push("/shopper/deliveryOrder/goToLocation")}
            title="Picked up all"
            containerStyle={tw`rounded-md bg-primaryShopper`}
          />
        </View>
      )}
      contentContainerStyle={tw`px-5`}
    />
  );
};

export default pickUpItems;
