import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconArrowCorner } from "@/assets/icon";
import TButton from "@/src/lib/buttons/TButton";
import BackWithComponentLastIcon from "@/src/lib/backHeader/BackWithComponentLastIcon";
import {
  useProductByCategoryMutation,
  useProductDetailsMutation,
} from "@/src/redux/apiSlices/homePageApiSlices";
import ProductCard from "@/src/components/ProductCard";
import { Image } from "expo-image";

const productDetails = () => {
  const { productId, category: paramsCategory } = useLocalSearchParams();
  const [productDetail, setProductDetail] = useState();
  const [quantity, setQuantity] = useState(1);
  const [categoriesByProduct, setCategoriesByProduct] = useState(null);
  const flatListRef = React.useRef<FlatList<any>>(null);

  // -------------------- apis =-------------------
  const [data, { isLoading }] = useProductDetailsMutation({});

  const [category, { isError }] = useProductByCategoryMutation();

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

  const renderHeader = () => (
    <View style={tw`bg-white `}>
      {/* ------- header part ----------- */}
      <View style={tw`relative`}>
        <View
          style={tw`absolute -top-[70] self-center bg-[#F3F5F7] w-[140] h-[140] rounded-full`}
        />
        <View style={tw`w-full`}>
          <BackWithComponentLastIcon
            onPress={() => router.back()}
            title="Detail"
            containerStyle={tw`px-0`}
            fastComponentContentStyle={tw`shadow-lg`}
            endComponentContentStyle={tw`shadow-lg`}
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
                  <Text style={tw`font-PoppinsRegular text-xs text-black`}>
                    Promo Price
                  </Text>
                </View>
                <View style={tw`flex-row items-center gap-1`}>
                  <Text
                    style={tw`font-PoppinsSemiBold text-lg text-primary line-through`}
                  >
                    $ {productDetail?.product?.regular_price}
                  </Text>
                  <Text style={tw`font-PoppinsRegular text-xs text-black`}>
                    Regular price
                  </Text>
                </View>
              </View>
            ) : (
              <View style={tw`flex-row items-center gap-1`}>
                <Text style={tw`font-PoppinsSemiBold text-lg text-primary`}>
                  $ {productDetail?.product?.regular_price}
                </Text>
                <Text style={tw`font-PoppinsRegular text-xs text-black`}>
                  Regular Price
                </Text>
              </View>
            )}
          </View>

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
              onPress={() => setQuantity(quantity + 1)}
              style={tw`py-2 px-4 bg-primary  rounded-lg`}
            >
              <Text style={tw`font-bold text-lg text-white`}>+</Text>
            </TouchableOpacity>
          </View>
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
            productImg={item?.images}
            productPrice={item?.regular_price}
            categoryName={paramsCategory}
            shopName={item.storeName}
            productWidth={item?.size}
            shopOnPress={() => router.push("/addToCardModal")}
          />
        )}
      />
    </View>
  );
};

export default productDetails;
