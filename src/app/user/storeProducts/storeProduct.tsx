import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router, useLocalSearchParams } from "expo-router";
import tw from "@/src/lib/tailwind";
import { useProductByCategoryMutation } from "@/src/redux/apiSlices/homePageApiSlices";
import ProductCard from "@/src/components/ProductCard";

const storeProduct = () => {
  const { categoryData } = useLocalSearchParams();
  const [product, setProduct] = useState(null);

  const [category, { isLoading, isError }] = useProductByCategoryMutation();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await category(categoryData).unwrap();
        setProduct(response?.data);
      } catch (error) {
        console.log(error, "hare is category product not found --------->");
      }
    };

    getCategory();
  }, []);

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={`Store Products- ${categoryData}`}
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
        renderItem={({ item, index }) => {
          return (
            <ProductCard
              onPress={() =>
                router.push({
                  pathname: "/user/storeProducts/productDetails",
                  params: { productId: item?.id, category: categoryData },
                })
              }
              productId={item?.id}
              productName={item.name}
              productImg={item?.images}
              productPrice={item?.regular_price}
              categoryName={categoryData}
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

export default storeProduct;
