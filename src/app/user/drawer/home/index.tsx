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
  useGetRecommendationProductsQuery,
  useKogerAllCategoriesQuery,
  useProductByCategoryMutation,
  useSetUserLocationMutation,
} from "@/src/redux/apiSlices/homePageApiSlices";
import ProductCard from "@/src/components/ProductCard";
import {
  useDeleteAllCartMutation,
  useGetCartQuery,
} from "@/src/redux/apiSlices/cartSlices";
import useLocation from "@/src/hook/useLocation";
import { useDeleteAllWishlistMutation } from "@/src/redux/apiSlices/wishlistSlices";
import { useGetNotificationsQuery } from "@/src/redux/apiSlices/notificationSlices";

const HomeScreen = () => {
  const [notification, setNotification] = React.useState(false);
  const [randomCategoryData, setRandomCategoryData] = React.useState(null);
  const { longitude, latitude, errorMsg } = useLocation();
  const [recommendedCategory, setRecommendedCategory] = React.useState("");

  // --------------------------- all api --------------------------
  const { data: categoriesData, isLoading: isCategoryLoading } =
    useKogerAllCategoriesQuery({});
  const [category, { isError, isLoading: isRandomCategoryProductLoading }] =
    useProductByCategoryMutation();
  const { data: cartItem } = useGetCartQuery({});
  const [location] = useSetUserLocationMutation();
  const { data: recommendedData, isLoading: isRecommendedLoading } =
    useGetRecommendationProductsQuery({});
  const { data: notificationData } = useGetNotificationsQuery({});
  const [allCartDelete] = useDeleteAllCartMutation();
  const [allWishlistDelete] = useDeleteAllWishlistMutation();

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

  const stgLongitude = longitude?.toString() ?? "";
  const stgLatitude = latitude?.toString() ?? "";

  useEffect(() => {
    const setLocation = async () => {
      try {
        // await allCartDelete({}).unwrap();
        // await allWishlistDelete({}).unwrap();
        await location({
          longitude: stgLongitude,
          latitude: stgLatitude,
        }).unwrap();
        // ----------------- find my category ---------------------
        if (recommendedData?.data?.length > 0) {
          const validItem = recommendedData?.data.find(
            (item) => item.categories
          );
          if (validItem) {
            const parsedCategories = JSON.parse(validItem?.categories);
            const firstCategory = parsedCategories[0];
            setRecommendedCategory(firstCategory);
          }
        }
      } catch (error) {
        console.log(error, "set user location not match -------------------");
      }
    };
    randomCategoryLoad();
    setLocation();
  }, [recommendedData, stgLongitude, stgLatitude]);

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
                router.push("/user/priceComparisons/priceComparison")
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
              onPress={() => router.push("/user/notifications/notification")}
              style={tw`relative p-3 bg-white shadow-lg rounded-lg`}
            >
              <SvgXml xml={IconNotification} />
              {notificationData?.notifications?.length > 0 ? (
                <Text
                  style={tw`absolute w-6 text-center -top-2 -right-1 px-1 bg-orange text-white rounded-full`}
                >
                  {notificationData?.notifications?.length}
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

        {/* ============== render random section =============== */}

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
                    promoPrice={item?.promo_price}
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

        {/* **************************** recommended product section ****************** */}

        <View>
          <View style={tw`flex-row justify-between items-center mt-4  px-4`}>
            <Text style={tw`font-PoppinsSemiBold text-lg text-black`}>
              Recommended for you
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/user/storeProducts/storeProduct",
                  params: { categoryData: recommendedCategory },
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
              data={recommendedData?.data}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              contentContainerStyle={tw`gap-3`}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                isRecommendedLoading ? (
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
                          category: recommendedCategory,
                        },
                      })
                    }
                    productName={item?.name}
                    productId={item?.id}
                    productImg={item?.images}
                    productPrice={item?.regular_price}
                    promoPrice={item?.promo_price}
                    categoryName={recommendedCategory}
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
