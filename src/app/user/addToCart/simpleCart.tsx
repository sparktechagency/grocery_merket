import { IconEdit, IconMuniceButton, IconPlusButton } from "@/assets/icon";
import { CartData } from "@/src/components/CardData";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import tw from "twrnc";

const SwipeToDeleteCard = ({
  data,
  onDelete,
  onAddToCart,
}: {
  data: any;
  onDelete: () => void;
  onAddToCart: () => void;
}) => {
  const renderRightActions = () => (
    <TouchableOpacity
      onPress={onDelete}
      style={tw`bg-red-600 justify-center items-center w-20 h-full rounded-r-lg`}
    >
      <SvgXml xml={IconEdit} />
      <Text style={tw`text-white text-xs mt-1`}>Delete</Text>
    </TouchableOpacity>
  );

  const renderLeftActions = () => (
    <TouchableOpacity
      onPress={onAddToCart}
      style={tw`bg-green-600 justify-center items-center w-24 h-full rounded-l-lg`}
    >
      <SvgXml xml={IconPlusButton} />
      <Text style={tw`text-white text-xs mt-1`}>Add to Cart</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      rightThreshold={70}
      leftThreshold={70}
    >
      <TouchableOpacity
        style={tw`flex-row justify-between items-center p-2 rounded-xl bg-white mb-2`}
      >
        <Image source={data.image} />
        <View>
          <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
            {data.title}
          </Text>
          <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
            {data.weight}
          </Text>
          <Text style={tw`font-PoppinsSemiBold text-base text-[#006B27]`}>
            ${data.price}
          </Text>
        </View>
        <View style={tw`items-center gap-1.5 bg-slate-50 rounded-full`}>
          <TouchableOpacity style={tw`px-2.5 py-3.5 rounded-full bg-[#eff3f7]`}>
            <SvgXml xml={IconMuniceButton} />
          </TouchableOpacity>
          <Text>00</Text>
          <TouchableOpacity style={tw`p-2.5 rounded-full bg-primary`}>
            <SvgXml xml={IconPlusButton} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default function App() {
  const handleDelete = () => {
    alert("Deleted!");
  };

  const handleAddToCart = () => {
    alert("Added to Cart!");
  };

  return (
    <View style={tw`w-full p-4`}>
      {CartData.map((item) => (
        <SwipeToDeleteCard
          key={item.id}
          data={item}
          onDelete={handleDelete}
          onAddToCart={handleAddToCart}
        />
      ))}
    </View>
  );
}
