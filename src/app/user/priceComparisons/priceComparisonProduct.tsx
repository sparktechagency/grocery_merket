import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import tw from "@/src/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import { useSearchForPriceComparisonQuery } from "@/src/redux/apiSlices/homePageApiSlices";
import { Image } from "expo-image";

const priceComparisonProduct = () => {
  const { searchValue } = useLocalSearchParams();
  const parsedQuery = searchValue ? JSON.parse(searchValue as string) : {};

  // ---------------------- apis -----------------------
  const { data: searchForPriceComparison, isLoading } =
    useSearchForPriceComparisonQuery(parsedQuery);

  const renderItem = ({ item }) => {
    const parsedCategories = JSON.parse(item?.categories);
    const firstCategory = parsedCategories[0];
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/user/storeProducts/productDetails",
            params: { productId: item?.id, category: firstCategory },
          })
        }
        style={tw`flex-row justify-between items-center p-3 rounded-2xl bg-white mb-3 shadow-lg`}
      >
        <View style={tw`flex-row flex-1 items-center gap-4`}>
          <Image
            source={{ uri: item?.image }}
            style={tw`w-14 h-14 rounded-md`}
            contentFit="contain"
          />
          <View style={tw`flex-1`}>
            <Text
              numberOfLines={1}
              style={tw`font-PoppinsMedium text-base text-black`}
            >
              {item?.name}
            </Text>
            <Text
              numberOfLines={1}
              style={tw`font-PoppinsRegular text-sm text-orange mt-0.5`}
            >
              {item?.storeName}
            </Text>
          </View>
        </View>

        <View style={tw`items-end`}>
          {item?.promo_price !== "0" ? (
            <View>
              <Text style={tw`font-PoppinsSemiBold text-sm text-primary`}>
                $ {item?.promo_price}
              </Text>
              <Text
                style={tw`font-PoppinsSemiBold text-xs text-gray-500 line-through`}
              >
                $ {item?.regular_price}
              </Text>
            </View>
          ) : (
            <Text style={tw`font-PoppinsSemiBold text-sm text-primary`}>
              $ {item?.regular_price}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent
        onPress={() => router.back()}
        title="Price Comparison"
      />

      {isLoading ? (
        <ActivityIndicator size={"large"} color={PrimaryColor} />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={searchForPriceComparison?.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <Text style={tw`font-PoppinsMedium text-xl text-black my-3`}>
              Fresh Apple
            </Text>
          )}
          contentContainerStyle={tw`px-5 `}
          ListEmptyComponent={() => (
            <View style={tw`flex-1 items-center justify-center`}>
              <Text style={tw`font-PoppinsMedium text-sm text-black`}>
                No data found
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default priceComparisonProduct;
