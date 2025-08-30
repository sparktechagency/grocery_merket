import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconArrowCorner, IconShopping } from "@/assets/icon";
import TButton from "@/src/lib/buttons/TButton";
import BackWithComponentLastIcon from "@/src/lib/backHeader/BackWithComponentLastIcon";
import {
  useProductByCategoryMutation,
  useProductDetailsMutation,
} from "@/src/redux/apiSlices/homePageApiSlices";
import ProductCard from "@/src/components/ProductCard";
import { Image } from "expo-image";
import { useAddToCartMutation } from "@/src/redux/apiSlices/cartSlices";
import { PrimaryColor } from "@/utils/utils";

const productDetails = () => {
  const { productId, category: paramsCategory } = useLocalSearchParams();
  const [productDetail, setProductDetail] = useState();
  const [quantity, setQuantity] = useState(1);
  const [categoriesByProduct, setCategoriesByProduct] = useState(null);
  const flatListRef = React.useRef<FlatList<any>>(null);

  // -------------------- apis =-------------------
  const [data, { isLoading }] = useProductDetailsMutation({});
  const [category, { isError, isLoading: isCategoryLoading }] =
    useProductByCategoryMutation();
  const [cartData, { isLoading: isCartLoading }] = useAddToCartMutation();

  const filterByCategory = async () => {
    try {
      const response = await category(paramsCategory).unwrap();
      setCategoriesByProduct(response);
    } catch (error) {
      console.log(error, "no match same category data -------------> ");
    }
  };

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const product = await data(productId).unwrap();
        setProductDetail(product);
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      } catch (error) {
        console.log(error, "Product details not work ---------->");
      }
    };
    loadProductDetails();
    filterByCategory();
  }, [productId, paramsCategory]);

  if (isLoading || isCategoryLoading || isCartLoading) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size={"large"} color={PrimaryColor} />
      </View>
    );
  }

  // ------------------ handle add to cart ---------------

  const handleCartToggle = async (id) => {
    try {
      const response = await cartData({
        product_id: id,
        quantity: quantity,
      }).unwrap();
      if (response?.status) {
        router.push({
          pathname: "/Toaster",
          params: { res: response?.message },
        });
      }
    } catch (error) {
      console.log(error, "Product not added to cart");
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };

  const renderHeader = () => (
    <View style={tw`bg-white `}>
      {/* ----------------- header part ---------------------- */}
      <View style={tw`relative`}>
        <View
          style={tw`absolute -top-[70] self-center bg-[#F3F5F7] w-[140] h-[140] rounded-full`}
        />
        <View style={tw`w-full`}>
          <BackWithComponentLastIcon
            onPress={() => router.back()}
            title={
              productDetail?.product?.name.slice(0, 25) + "..." || "Product"
            }
            // titleStyle={tw`px-4`}
            containerStyle={tw`px-0`}
            fastComponentContentStyle={tw`shadow-lg`}
            endComponentContentStyle={tw`shadow-lg`}
            onPressEndComponent={() => router.push("/user/drawer/home/search")}
          />
          <View style={tw`w-full items-center`}>
            <Image
              style={tw`w-96 h-48 aspect-square`}
              // resizeMode="contain"
              contentFit="contain"
              source={{
                uri: productDetail?.product?.images,
              }}
            />
          </View>
        </View>
      </View>
      {/* ----------------- content section --------------- */}
      <View style={tw`mt-4`}>
        <View style={tw`flex-row justify-between items-center w-full`}>
          <View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>
              {productDetail?.product?.size}
            </Text>
            {productDetail?.product?.promo_price !== "0" ? (
              <View>
                <View style={tw`flex-row items-center gap-1`}>
                  <Text style={tw`font-PoppinsSemiBold text-lg text-primary`}>
                    $ {productDetail?.product?.promo_price}
                  </Text>
                </View>
                <View style={tw`flex-row items-center gap-1`}>
                  <Text
                    style={tw`font-PoppinsSemiBold text-lg text-primary line-through`}
                  >
                    $ {productDetail?.product?.regular_price}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={tw`flex-row items-center gap-1`}>
                <Text style={tw`font-PoppinsSemiBold text-lg text-primary`}>
                  $ {productDetail?.product?.regular_price || "00"}
                </Text>
              </View>
            )}
          </View>
          {/* ----------------------------- quantity section -------------------   */}
          <View style={tw`flex-row items-center gap-4`}>
            <TouchableOpacity
              onPress={() => {
                if (quantity >= 2) {
                  setQuantity(quantity - 1);
                }
              }}
              style={tw`py-2 px-4 bg-white shadow-md rounded-lg`}
            >
              <Text style={tw`font-bold text-xl text-black`}>-</Text>
            </TouchableOpacity>
            <Text style={tw`font-PoppinsSemiBold text-xl text-black`}>
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (quantity <= 9) {
                  setQuantity(quantity + 1);
                }
              }}
              style={tw`py-2 px-4 bg-primary  rounded-lg`}
            >
              <Text style={tw`font-bold text-lg text-white`}>+</Text>
            </TouchableOpacity>
          </View>

          {/* ---------------- add to cart button --------- */}

          <TouchableOpacity
            onPress={() => handleCartToggle(productDetail?.product?.id)}
            style={tw`p-5 bg-white shadow-md rounded-full`}
          >
            <SvgXml xml={IconShopping} />
          </TouchableOpacity>
        </View>

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/user/shoppers/shopperProfile",
              params: { storeName: productDetail?.product?.storeName },
            })
          }
          style={tw`p-3.5 flex-row justify-between items-center bg-[#FF8842] my-7 rounded-xl gap-4`}
        >
          <Text
            numberOfLines={1}
            style={tw`font-PoppinsMedium text-sm text-white flex-1 `}
          >
            {productDetail?.product?.storeName}
          </Text>

          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-PoppinsSemiBold text-sm text-white underline`}>
              Store details
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/user/shoppers/shopperProfile",
                  params: { storeName: productDetail?.product?.storeName },
                })
              }
            >
              <SvgXml color={"white"} xml={IconArrowCorner} />
            </TouchableOpacity>
          </View>
        </Pressable>

        <Text style={tw`font-PoppinsSemiBold text-lg text-black mb-4`}>
          {paramsCategory}
        </Text>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={tw`w-full  rounded-full py-3`}>
      <TButton
        onPress={() => router.push("/user/addToCart/cart")}
        title="Add to Cart"
        containerStyle={tw`rounded-full `}
      />
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        ref={flatListRef}
        refreshControl={<RefreshControl refreshing={isLoading} />}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        data={categoriesByProduct?.data}
        style={tw`flex-1`}
        ListFooterComponentStyle={tw`w-full`}
        contentContainerStyle={tw` gap-1 items-center justify-between px-4  bg-white`}
        columnWrapperStyle={tw`gap-3 justify-between mb-3`}
        renderItem={({ item }) => (
          <ProductCard
            onPress={() =>
              router.navigate({
                pathname: "/user/storeProducts/productDetails",
                params: { productId: item?.id, category: paramsCategory },
              })
            }
            productName={item?.name}
            productId={item?.id}
            productImg={item?.images}
            productPrice={item?.regular_price}
            promoPrice={item?.promo_price}
            categoryName={paramsCategory}
            shopName={item.storeName}
            productWidth={item?.size}
            shopOnPress={() =>
              router.push({
                pathname: "/addToCardModal",
                params: { id: item?.id },
              })
            }
          />
        )}
      />
    </View>
  );
};

export default productDetails;
