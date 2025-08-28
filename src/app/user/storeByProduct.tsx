import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import ProductCard from "@/src/components/ProductCard";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import tw from "@/src/lib/tailwind";
import { useProductByStoreMutation } from "@/src/redux/apiSlices/homePageApiSlices";

const StoreByProduct = () => {
  const { storeName } = useLocalSearchParams();
  const [product, setProduct] = React.useState([]);
  const parseStoreName = JSON.parse(storeName as string);

  // ========================= api =============================
  const [store, { isLoading }] = useProductByStoreMutation();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await store(parseStoreName).unwrap();
        if (response?.status) {
          setProduct(response?.data);
        }
      } catch (error) {
        console.log(error, "hare is category product not found --------->");
      }
    };
    getProduct();
  }, [store]);

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={`Store By Products`}
        titleStyle={tw`mx-auto`}
      />
      <FlatList
        numColumns={2}
        data={product}
        style={tw`px-4`}
        contentContainerStyle={tw`gap-2 items-center justify-between `}
        columnWrapperStyle={tw`gap-3 justify-between mb-3`}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size="large" color={tw.color("red-500")} />
          ) : (
            <Text style={tw`text-center mt-4 text-gray-500`}>
              No products available.
            </Text>
          )
        }
        renderItem={({ item, index }: any) => {
          const parsedCategories = JSON.parse(item?.categories);
          const firstCategory = parsedCategories[0];
          return (
            <ProductCard
              onPress={() =>
                router.push({
                  pathname: "/user/storeProducts/productDetails",
                  params: { productId: item?.id, category: firstCategory },
                })
              }
              productId={item?.id}
              productName={item.name}
              productImg={item?.images}
              productPrice={item?.regular_price}
              promoPrice={item?.promo_price}
              categoryName={firstCategory}
              shopName={item.storeName}
              productWidth={item.size}
              shopOnPress={() =>
                router.push({
                  pathname: "/addToCardModal",
                  params: { id: item?.id },
                })
              }
            />
          );
        }}
      />
    </View>
  );
};

export default StoreByProduct;
