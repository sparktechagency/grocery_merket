import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "../lib/tailwind";
import { BlurView } from "expo-blur";
import { SvgXml } from "react-native-svg";
import {
  IconLove,
  IconLoveWishlistSelected,
  IconShopping,
} from "@/assets/icon";
import { Image } from "expo-image";
import { useGetWishlistQuery } from "../redux/apiSlices/wishlistSlices";

interface ProductProps {
  onPress?: () => void;
  productImg?: any;
  productName?: string;
  shopName?: string;
  categoryName?: any;
  productWidth?: any;
  productPrice?: any;
  productId?: number;
  shopOnPress?: () => void;
}

const ProductCard = ({
  onPress,
  productImg,
  productName,
  shopName,
  categoryName,
  productWidth,
  productPrice,
  shopOnPress,
  productId,
}: ProductProps) => {
  // ======================= api ===============
  const { data: allWishlistData } = useGetWishlistQuery({});
  const [isInWishlist, setIsInWishlist] = useState(false);
  console.log(
    allWishlistData?.wishlist,
    "thare is all wishlist data ===============?"
  );

  console.log(productId, "this is product id ------------------------------->");

  useEffect(() => {
    if (!allWishlistData?.wishlist) return;
    const wishlistItem = allWishlistData.wishlist.find(
      (item) => String(item.product_id) === String(productId)
    );
    console.log(
      wishlistItem,
      "this is wishlist item ---------------------->" + productId
    );
    setIsInWishlist(!!wishlistItem);
  }, [allWishlistData, productId]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={tw` w-48  bg-white rounded-2xl   shadow-md`}
    >
      <View style={tw` flex-1 w-full  bg-[#F3F5F7]  px-2.5 py-2 rounded-xl`}>
        <Image
          source={productImg}
          // resizeMode="contain"
          contentFit="contain"
          style={tw`h-24 w-24 mx-auto p-1`}
        />

        <TouchableOpacity
          onPress={() => console.log("love click ----------->")}
          style={tw`absolute  bg-transparent right-1.5 top-4`}
        >
          <BlurView
            intensity={90}
            style={tw`w-10 h-10 justify-center items-center border border-white rounded-full  overflow-hidden`}
          >
            <SvgXml xml={isInWishlist ? IconLoveWishlistSelected : IconLove} />
          </BlurView>
        </TouchableOpacity>

        {/* content part  */}
        <View style={tw`pb-1.5`}>
          <View style={tw`flex-row justify-between items-center gap-1 pt-1.5 `}>
            <Text
              numberOfLines={1}
              style={tw`flex-1 font-PoppinsMedium text-[10px] text-regularText text-center bg-[#dddcdc] px-1 py-0.5 shadow-sm rounded-sm`}
            >
              {categoryName}
            </Text>
            <Text
              numberOfLines={1}
              style={tw`flex-1 bg-[#FF5F00] font-PoppinsMedium text-[10px] px-1 py-0.5 shadow-sm rounded-sm text-white`}
            >
              {shopName}
            </Text>
          </View>
          <Text
            numberOfLines={2}
            style={tw`font-PoppinsMedium text-sm text-black mt-1`}
          >
            {productName}
          </Text>
          <Text style={tw`font-PoppinsMedium text-xs text-[#787878]`}>
            {productWidth}
          </Text>
          <View style={tw` flex-1 flex-row justify-between items-center `}>
            <Text style={tw`font-PoppinsSemiBold text-base text-primary`}>
              ${productPrice}
            </Text>
            <TouchableOpacity
              onPress={shopOnPress}
              style={tw`p-2 bg-white shadow-md rounded-full`}
            >
              <SvgXml xml={IconShopping} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
