import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { ImgStoreOne, ImgStoreTwo } from "@/assets/images";
import { SvgXml } from "react-native-svg";
import { IconArrowCorner } from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { useKogerAllStoreQuery } from "@/src/redux/apiSlices/homePageApiSlices";

const storeName = [
  {
    id: 1,
    image: ImgStoreOne,
    store_name: "Mackdonalds",
  },
  {
    id: 2,
    image: ImgStoreTwo,
    store_name: "Starbucks",
  },
  {
    id: 3,
    image: ImgStoreOne,
    store_name: "ABC",
  },
  {
    id: 4,
    image: ImgStoreTwo,
    store_name: "ABC 1",
  },
  {
    id: 5,
    image: ImgStoreOne,
    store_name: "ABC 2",
  },
  {
    id: 6,
    image: ImgStoreTwo,
    store_name: "ABC 3",
  },
];

const Stores = () => {
  const { data } = useKogerAllStoreQuery({});
  console.log(data?.stores, "hare is store ");
  return (
    <View style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw` px-4 mb-10`}>
        <BackWithComponent
          onPress={() => router.back()}
          title="Stores"
          containerStyle={tw`px-0`}
        />

        <View style={tw`gap-3 mt-2`}>
          {data?.stores.map((store, index) => (
            <TouchableOpacity
              onPress={() => router.push("/user/storeProducts/storeProduct")}
              key={index}
              activeOpacity={0.8}
              style={tw`bg-white px-4 py-2 rounded-xl flex-row justify-between items-center shadow-sm`}
            >
              <Text
                numberOfLines={1}
                style={tw`font-PoppinsSemiBold  text-sm flex-1 text-black`}
              >
                {store}
              </Text>
              <Pressable
                onPress={() => router.push("/user/storeProducts/storeProduct")}
                style={tw`p-1.5 bg-[#e4e4e4] rounded-full`}
              >
                <SvgXml
                  xml={IconArrowCorner}
                  width={20}
                  height={20}
                  style={tw`p-1.5 bg-[#e4e4e4] rounded-full`}
                />
              </Pressable>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Stores;
