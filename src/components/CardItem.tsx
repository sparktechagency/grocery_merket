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

export const CardItem = ({ item }: CardDataProps) => (
  <Pressable
    onPress={() => router.push("/user/storeProduct/productDetails")}
    style={tw`relative w-52 h-56 bg-[#dbdee0] m-2 p-3 py-4 rounded-xl`}
  >
    <Image source={item?.image} style={tw` mx-auto p-3`} />
    <Text
      style={tw`absolute font-PoppinsSemiBold text-[10px] px-2 py-1 bg-[#56A5FF] rounded-r-full top-4 z-10 `}
    >
      New
    </Text>

    <TouchableOpacity
      onPress={() => router.push("/user/addToCart/cart")}
      style={tw`absolute  bg-transparent right-3 top-4`}
    >
      <BlurView
        intensity={60}
        style={tw`p-2 border border-white rounded-full  overflow-hidden`}
      >
        <SvgXml xml={IconLove} />
      </BlurView>
    </TouchableOpacity>
    <View style={tw`flex-row justify-between items-center gap-2 mt-3 `}>
      <Text
        style={tw`font-PoppinsMedium text-xs text-regularText bg-[#dddcdc] px-1.5 py-0.5 shadow-sm rounded-sm`}
      >
        {item.category}
      </Text>
      <Text
        style={tw`bg-[#FF5F00] font-PoppinsMedium text-xs px-1.5 py-0.5 shadow-sm rounded-sm text-white`}
      >
        {item.brand}
      </Text>
    </View>
    <Text style={tw`font-PoppinsSemiBold text-sm text-black mt-2`}>
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
        onPress={() => router.push("/user/storeProduct/productDetails")}
        style={tw`p-2 bg-white shadow-md rounded-full`}
      >
        <SvgXml xml={IconShopping} />
      </TouchableOpacity>
    </View>
  </Pressable>
);
