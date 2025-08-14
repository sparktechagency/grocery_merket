import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { SvgXml } from "react-native-svg";
import {
  IconAddToCat,
  IconArrowCorner,
  IconComparison,
  IconNotification,
  IconRightArrowSingle,
} from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import DiscountCarousel from "@/src/components/Carousel";

import { router } from "expo-router";
import {
  useKogerAllCategoriesQuery,
  useProductByCategoryMutation,
} from "@/src/redux/apiSlices/homePageApiSlices";
import ProductCard from "@/src/components/ProductCard";
import { useGetCartQuery } from "@/src/redux/apiSlices/cartSlices";

const HomeScreen = () => {
  const [notification, setNotification] = React.useState(false);
  const [randomCategoryData, setRandomCategoryData] = React.useState(null);

  // --------------------------- all api --------------------------
  const { data: categoriesData, isLoading: isCategoryLoading } =
    useKogerAllCategoriesQuery({});
  const [category, { isError, isLoading: isRandomCategoryProductLoading }] =
    useProductByCategoryMutation();
  const { data: cartItem } = useGetCartQuery({});

  const randomCategoryName =
    categoriesData?.categories[
      Math.floor(Math.random() * categoriesData?.categories.length)
    ];

  const randomCategoryLoad = async () => {
    try {
      const response = await category(randomCategoryName).unwrap();
      if (response?.status) {
        setRandomCategoryData(response?.data);
      }
    } catch (error) {
      console.log(error, "random category not match -------------------");
    }
  };

  useEffect(() => {
    randomCategoryLoad();
  }, []);

  const categoryItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/user/storeProducts/storeProduct",
          params: { categoryData: item },
        })
      }
      style={tw`m-2 bg-white w-44 h-12 rounded-lg shadow-md flex-row justify-between items-center gap-2 px-4`}
    >
      <Text
        numberOfLines={1}
        style={tw` text-sm flex-1 text-black font-PoppinsMedium`}
      >
        {item}
      </Text>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/user/storeProducts/storeProduct",
            params: { categoryData: item },
          })
        }
        style={tw`p-0.5 text-center bg-[#F0F0F0] rounded-full`}
      >
        <SvgXml xml={IconArrowCorner} />
      </Pressable>
    </TouchableOpacity>
  );
  return (
    <View style={tw`flex-1`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`pb-24`}
        style={tw`flex-1`}

        //  ---------------- profile section ------------------
      >
        <View style={tw`px-5 flex-row justify-between mt-3 mb-5`}>
          <TouchableOpacity
            onPress={() => router.push("/role/role")}
            style={tw`justify-center items-center`}
          >
            <Text style={tw`font-PoppinsMedium text-base p-2`}>Login</Text>
          </TouchableOpacity>

          <View style={tw`flex-row items-center gap-3`}>
            <TouchableOpacity
              onPress={() =>
                router.push("/user/priceComparison/priceComparison")
              }
              style={tw`relative p-3 bg-white shadow-lg rounded-lg`}
            >
              <SvgXml xml={IconComparison} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/user/addToCart/cart")}
              style={tw`relative p-3 bg-white shadow-lg rounded-lg`}
            >
              <SvgXml xml={IconAddToCat} />
              {cartItem?.cart?.length > 0 ? (
                <Text
                  style={tw`absolute w-6 text-center -top-2 -right-1 px-1 bg-orange text-white rounded-full`}
                >
                  {cartItem?.cart?.length}
                </Text>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/user/notification/notification")}
              style={tw`relative p-3 bg-white shadow-lg rounded-lg`}
            >
              <SvgXml xml={IconNotification} />
              {notification ? (
                <Text
                  style={tw`absolute top-0 right-0 px-1 bg-orange text-white rounded-full`}
                >
                  2
                </Text>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>

        {/* ------------- carousel banner ============================ */}
        <DiscountCarousel />

        {/* ----------- Category section -------------------- */}
        <View>
          <View style={tw`flex-row justify-between items-center mt-5 px-4`}>
            <Text style={tw`font-PoppinsSemiBold text-lg text-black`}>
              Category
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/user/users/all_categories")}
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={categoriesData?.categories}
              renderItem={categoryItem}
              ListEmptyComponent={
                <Text style={tw`text-center mt-4 text-gray-500`}>
                  No products available.
                </Text>
              }
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* ============== Beast Seller section =============== */}

        <View>
          <View style={tw`flex-row justify-between items-center mt-4  px-4`}>
            <Text style={tw`font-PoppinsSemiBold text-lg text-black`}>
              {randomCategoryName}
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/user/storeProducts/storeProduct",
                  params: { categoryData: randomCategoryName },
                })
              }
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-6 py-3 flex-1`}>
            <FlatList
              data={randomCategoryData}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              contentContainerStyle={tw`gap-3`}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                isRandomCategoryProductLoading ? (
                  <View style={tw`justify-center items-center`}>
                    <ActivityIndicator
                      size="large"
                      color={tw.color("red-500")}
                    />
                  </View>
                ) : (
                  <Text style={tw`text-center mt-4 text-gray-500`}>
                    No products available.
                  </Text>
                )
              }
              renderItem={({ index, item }) => {
                return (
                  <ProductCard
                    onPress={() =>
                      router.push({
                        pathname: "/user/storeProducts/productDetails",
                        params: {
                          productId: item?.id,
                          category: randomCategoryName,
                        },
                      })
                    }
                    productName={item?.name}
                    productId={item?.id}
                    productImg={item?.images}
                    productPrice={item?.regular_price}
                    categoryName={randomCategoryName}
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
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
