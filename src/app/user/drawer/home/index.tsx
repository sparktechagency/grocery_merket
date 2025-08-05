import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
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

import { FlatList } from "react-native-gesture-handler";
import { CartData } from "@/src/components/CardData";
import { router } from "expo-router";
import { CardItem } from "@/src/components/CardItem";
import { useKogerAllCategoriesQuery } from "@/src/redux/apiSlices/homePageApiSlices";

const HomeScreen = () => {
  const [notification, setNotification] = React.useState(false);
  const [addToCart, setAddToCart] = React.useState(true);

  const { data: categoriesData, isLoading } = useKogerAllCategoriesQuery({});

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

        //  ---------------- profile section ------------------
      >
        <View style={tw`px-5 flex-row justify-between mt-3 mb-5`}>
          <TouchableOpacity
            onPress={() => router.push("/role/role")}
            style={tw`justify-center items-center`}
          >
            <Text style={tw`font-PoppinsMedium text-base p-2`}>Login</Text>
          </TouchableOpacity>
          {/* <Pressable
            onPress={() => router.push("/user/drawer/home/profile")}
            style={tw`flex-row justify-center items-center gap-2`}
          >
            <SvgXml xml={IconLocation} />
            <View>
              <Text style={tw`font-PoppinsBold text-sm text-black`}>
                Hello, Benjamin
              </Text>

              <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
                Kodiak Island
              </Text>
            </View>
          </Pressable> */}

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
              // onPress={() => router.push("/user/addToCart/simpleCart")}
              onPress={() => router.push("/user/addToCart/cart")}
              style={tw`relative p-3 bg-white shadow-lg rounded-lg`}
            >
              <SvgXml xml={IconAddToCat} />
              {addToCart ? (
                <Text
                  style={tw`absolute top-0 right-0 px-1 bg-orange text-white rounded-full`}
                >
                  2
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
              Beast Seller
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/user/storeProducts/storeProduct")}
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={CartData}
              renderItem={({ index, item }) => {
                return (
                  <CardItem
                    onPressAddToCart={() => {
                      router?.push("/addCartModal");
                    }}
                    item={item}
                  />
                );
              }}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* ============== exclusive offer ========= */}

        <View>
          <View style={tw`flex-row justify-between items-center mt-3  px-4`}>
            <Text style={tw`font-PoppinsSemiBold text-lg text-black`}>
              Exclusive offer
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/user/storeProducts/storeProduct")}
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={CartData}
              renderItem={({ index, item }) => {
                return <CardItem item={item} />;
              }}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
