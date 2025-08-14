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
import {
  useAddToWishlistMutation,
  useDeleteWishlistItemMutation,
  useGetWishlistQuery,
  useLazyGetWishlistByIdQuery,
} from "../redux/apiSlices/wishlistSlices";
import { router } from "expo-router";
import {
  useAddToCartMutation,
  useDeleteCartItemMutation,
  useGetCartQuery,
} from "../redux/apiSlices/cartSlices";

interface ProductProps {
  onPress?: () => void;
  productImg?: any;
  productName?: string;
  shopName?: string;
  categoryName?: any;
  productWidth?: any;
  productPrice?: any;
  promoPrice?: any;
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
  promoPrice,
  shopOnPress,
  productId,
}: ProductProps) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [cartIds, setCartIds] = useState(null);

  // ======================= api ===============
  const { data: allWishlistData } = useGetWishlistQuery({});
  const [wishlistData] = useAddToWishlistMutation();
  const [wishlistItemId] = useDeleteWishlistItemMutation();
  //  ----------------- add to card api --------------
  const { data: allCartData } = useGetCartQuery({});
  const [cartData] = useAddToCartMutation();
  const [cartItemId] = useDeleteCartItemMutation();

  useEffect(() => {
    // ---------------- check product is in wishlist or not ----------------
    if (!allWishlistData?.wishlist || !allCartData?.cart) return;
    const wishlistItem = allWishlistData.wishlist.find(
      (item) => String(item.product_id) === String(productId)
    );
    setIsInWishlist(!!wishlistItem);
    setWishlistId(wishlistItem?.id);

    // ---------------- check product is in Add to cart or not ----------------

    const cartItem = allCartData.cart.find(
      (item) => String(item?.product_id) === String(productId)
    );
    setIsInCart(!!cartItem);
    setCartIds(cartItem?.id);
  }, [
    allWishlistData,
    productId,
    isInWishlist,
    allCartData,
    isInCart,
    cartIds,
    wishlistId,
  ]);

  //  ---------------- handle wishlist toggle ----------------
  const handleWishlistToggle = async (id, wishlistId) => {
    try {
      if (isInWishlist) {
        await wishlistItemId(wishlistId).unwrap();
        setIsInWishlist(false);
      } else if (!isInWishlist) {
        const response = await wishlistData({
          product_id: id,
        }).unwrap();
        setIsInWishlist(true);
      }

      // setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.log(error, "Product not added to wishlist");
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };

  // --------------------------------- add to cart ----------------------

  const handleCartToggle = async (id, cartId) => {
    try {
      if (isInCart) {
        await cartItemId(cartId).unwrap();
        setIsInCart(false);
      } else if (!isInCart) {
        const response = await cartData({
          product_id: id,
          quantity: 1,
        }).unwrap();
        setIsInCart(true);
        if (response?.status) {
          router.push({
            pathname: "/Toaster",
            params: { res: response?.message },
          });
        }
      }
    } catch (error) {
      console.log(error, "Product not added to cart");
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };

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
          onPress={() => handleWishlistToggle(productId, wishlistId)}
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
            {promoPrice !== "0" ? (
              <View>
                <View style={tw`flex-row items-center gap-1`}>
                  <Text style={tw`font-PoppinsSemiBold text-sm text-primary`}>
                    $ {promoPrice}
                  </Text>
                </View>
                <View style={tw`flex-row items-center gap-1`}>
                  <Text
                    style={tw`font-PoppinsSemiBold text-sm text-red-700 line-through`}
                  >
                    $ {productPrice}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={tw`flex-row items-center gap-1`}>
                <Text style={tw`font-PoppinsSemiBold text-sm text-primary`}>
                  $ {productPrice}
                </Text>
              </View>
            )}
            {!isInCart ? (
              <TouchableOpacity
                onPress={() => handleCartToggle(productId, cartIds)}
                style={tw`p-2 bg-white shadow-md rounded-full`}
              >
                <SvgXml xml={IconShopping} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
