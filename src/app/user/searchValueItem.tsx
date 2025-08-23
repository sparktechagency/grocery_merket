import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useSearchProductsWithFilterQuery } from "@/src/redux/apiSlices/homePageApiSlices";
import tw from "@/src/lib/tailwind";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import ProductCard from "@/src/components/ProductCard";

const SearchValueItem = () => {
  const { searchQuery } = useLocalSearchParams();
  const parsedQuery = searchQuery ? JSON.parse(searchQuery as string) : {};

  //   =================== all apis ========================f
  const {
    data,
    isLoading: isSearching,
    isError: error,
    isFetching,
  } = useSearchProductsWithFilterQuery(parsedQuery);

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={`Search by ${parsedQuery?.search}`}
        titleStyle={tw`mx-auto`}
      />
      <FlatList
        numColumns={2}
        data={data?.data}
        style={tw`px-4`}
        contentContainerStyle={tw`gap-2 items-center justify-between `}
        columnWrapperStyle={tw`gap-3 justify-between mb-3`}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          isSearching ? (
            <ActivityIndicator size="large" color={tw.color("red-500")} />
          ) : (
            <Text style={tw`text-center mt-4 text-gray-500`}>
              No products available.
            </Text>
          )
        }
        renderItem={({ item, index }) => {
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

export default SearchValueItem;
