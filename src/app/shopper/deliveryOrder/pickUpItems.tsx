import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";
import { CartData } from "@/src/components/CardData";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import TButton from "@/src/lib/buttons/TButton";

const pickUpItems = () => {
  const [selectedStores, setSelectedStores] = React.useState<string[]>([]);

  console.log(selectedStores, "selected stores");

  //  selected item --------------------------
  const handleItemsCheckBox = (selectedItemId: string) => {
    setSelectedStores((prev) =>
      prev.includes(selectedItemId)
        ? prev.filter((item) => item !== selectedItemId)
        : [...prev, selectedItemId]
    );
  };

  // ========================= render items ==========================

  const headerRender = () => (
    <BackWithComponent onPress={() => router.back()} title="Pick-Up Items" />
  );

  const renderItem = ({ item }) => {
    const isChecked = selectedStores.includes(item?.id);
    return (
      <View
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

        {/* =================== checkbox  ================ */}
        <TouchableOpacity
          onPress={() => handleItemsCheckBox(item?.id)}
          style={tw.style(
            `border w-5 h-5  justify-center items-center rounded-sm`,
            isChecked ? `bg-primary border-0` : `bg-transparent`
          )}
        >
          {isChecked ? <Text style={tw`text-white text-sm`}>✔</Text> : null}
        </TouchableOpacity>
      </View>
    );
  };

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
