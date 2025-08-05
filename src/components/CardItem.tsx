import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import tw from "../lib/tailwind";
import { BlurView } from "expo-blur";
import { IconLove, IconShopping } from "@/assets/icon";
import { SvgXml } from "react-native-svg";
import { router } from "expo-router";

// ============== best seller item Data ===================
interface CardDataProps {
  image: any;
  category: string;
  brand: string;
  title: string;
  weight: string;
  price: number;
  isNew: boolean;
  isFavorite: boolean;
}

interface CartItemProps {
  item: CardDataProps;
  onPressAddToCart?: () => void;
}

export const CardItem = ({ item, onPressAddToCart }: CartItemProps) => (
  <Pressable
    onPress={() => router.push("/user/storeProducts/productDetails")}
    style={tw`relative w-44 h-48 bg-[#dbdee0] m-1 p-2  rounded-xl`}
  >
    <Image source={item?.image} style={tw`h-20 mx-auto p-1`} />
    <Text
      style={tw`absolute font-PoppinsSemiBold text-xs px-2 py-1 bg-[#56A5FF] rounded-r-full top-4 z-10 `}
    >
      New
    </Text>

    <TouchableOpacity
      onPress={() => router.push("/user/storeProducts/productDetails")}
      style={tw`absolute  bg-transparent right-2 top-4`}
    >
      <BlurView
        intensity={90}
        style={tw`w-10 h-10 justify-center items-center border border-white rounded-full  overflow-hidden`}
      >
        <SvgXml xml={IconLove} />
      </BlurView>
    </TouchableOpacity>
    <View style={tw`flex-row justify-between items-center gap-2 mt-1 `}>
      <Text
        style={tw`font-PoppinsMedium text-[10px] text-regularText bg-[#dddcdc] px-1 py-0.5 shadow-sm rounded-sm`}
      >
        {item.category}
      </Text>
      <Text
        style={tw`bg-[#FF5F00] font-PoppinsMedium text-[10px] px-1 py-0.5 shadow-sm rounded-sm text-white`}
      >
        {item.brand}
      </Text>
    </View>
    <Text style={tw`font-PoppinsRegular text-sm text-black mt-1`}>
      {item.title}
    </Text>
    <Text style={tw`font-PoppinsSemiBold text-xs text-[#787878]`}>
      {item.weight}
    </Text>
    <View style={tw`flex-row justify-between items-center mt-1`}>
      <Text style={tw`font-PoppinsBold text-base text-[#006B27]`}>
        ${item?.price}
      </Text>
      <TouchableOpacity
        onPress={() => {
          onPressAddToCart && onPressAddToCart!();
        }}
        style={tw`p-1.5 bg-white shadow-md rounded-full`}
      >
        <SvgXml xml={IconShopping} />
      </TouchableOpacity>
    </View>
  </Pressable>
);
