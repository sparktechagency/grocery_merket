import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { useKogerAllCategoriesQuery } from "@/src/redux/apiSlices/homePageApiSlices";
import { SvgXml } from "react-native-svg";
import { IconArrowCorner } from "@/assets/icon";

const All_categories = () => {
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
      <Text numberOfLines={1} style={tw` text-sm flex-1 font-PoppinsMedium`}>
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
    <View style={tw`flex-1 px-4`}>
      <FlatList
        data={categoriesData?.categories}
        renderItem={categoryItem}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`justify-center `}
        ListHeaderComponent={() => (
          <BackWithComponent
            onPress={() => router.back()}
            title="All categories"
            containerStyle={tw`px-0`}
          />
        )}
      />
    </View>
  );
};

export default All_categories;
