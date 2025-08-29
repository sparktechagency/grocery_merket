import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React from "react";
import tw from "@/src/lib/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import TButton from "@/src/lib/buttons/TButton";
import {
  useGetPendingOrderDetailsQuery,
  useOrderPickedUpMutation,
} from "@/src/redux/apiSlices/shopperHomeApiSlices";
import { Image } from "expo-image";

const pickUpItems = () => {
  const { orderId } = useLocalSearchParams();
  const [selectedStores, setSelectedStores] = React.useState<string[]>([]);

  // ++++++++++++++++++++++++++++++ api ++++++++++++++++++++++++++++++
  const [itemId] = useOrderPickedUpMutation();
  const { data: pendingOrderDetails, isLoading } =
    useGetPendingOrderDetailsQuery(Number(orderId));

  //  selected item --------------------------
  const handleItemsCheckBox = (selectedItemId: string) => {
    setSelectedStores((prev) =>
      prev.includes(selectedItemId)
        ? prev.filter((item) => item !== selectedItemId)
        : [...prev, selectedItemId]
    );
  };

  const handleArrived = async () => {
    try {
      const response = await itemId({
        order_id: orderId,
        order_item_id: selectedStores.toString(),
      }).unwrap();
      if (response) {
        console.log(response, "this is response");
        router.push({
          pathname: "/shopper/deliveryOrder/goToCustomerLocation",
          params: { orderId: orderId },
        });
      }
    } catch (error) {
      console.log(error);
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };
  // ========================= render items ==========================

  const headerRender = () => (
    <BackWithComponent onPress={() => router.back()} title="Pick-Up Items" />
  );

  const renderItem = ({ item }) => {
    const isChecked = selectedStores.includes(item?.id);
    return (
      <Pressable
        onPress={() => handleItemsCheckBox(item?.id)}
        style={tw`flex-row justify-between items-center px-3 py-2 rounded-xl bg-white mb-3 shadow-sm`}
      >
        {/* Left: Product Info */}
        <View style={tw`flex-row gap-4 h-16 flex-1 items-center`}>
          <Image
            source={item?.product_image}
            style={tw`w-14 h-14 rounded-md`}
            contentFit="contain"
          />
          <View style={tw`flex-1`}>
            <Text
              numberOfLines={1}
              style={tw`font-PoppinsMedium text-sm text-black pr-4`}
            >
              {item?.product_name}
            </Text>
            <View>
              <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
                Quantity: {item?.quantity}
              </Text>
              <Text style={tw`font-PoppinsSemiBold text-base text-primary`}>
                $ {item.total_price}
              </Text>
            </View>
          </View>
        </View>

        {/* Right: Checkbox */}
        <TouchableOpacity
          onPress={() => handleItemsCheckBox(item?.id)}
          style={tw.style(
            `w-6 h-6 ml-2 border justify-center items-center rounded-md`,
            isChecked ? `bg-primary border-0` : `bg-transparent border-gray-400`
          )}
        >
          {isChecked ? <Text style={tw`text-white text-sm`}>✔</Text> : null}
        </TouchableOpacity>
      </Pressable>
    );
  };

  if (isLoading) {
    return (
      <View style={tw`justify-center items-center`}>
        <ActivityIndicator size="large" color={tw.color("red-500")} />
      </View>
    );
  }

  return (
    <FlatList
      data={pendingOrderDetails?.data?.items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={headerRender}
      ListFooterComponent={() => (
        <View style={tw`rounded-full my-3 h-12`}>
          <TButton
            disabled={selectedStores.length === 0}
            onPress={() => handleArrived()}
            title="Picked up "
            containerStyle={tw`rounded-md bg-primaryShopper`}
          />
        </View>
      )}
      contentContainerStyle={tw`px-5`}
    />
  );
};

export default pickUpItems;
