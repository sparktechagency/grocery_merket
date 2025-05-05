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
  return (
    <ScrollView contentContainerStyle={tw`p-4`}>
      <BackWithComponent
        onPress={() => router.back()}
        title="Stores"
        titleStyle={tw`mx-auto`}
      />

      <View style={tw`flex-row flex-wrap justify-between mt-2`}>
        {storeName.map((store) => (
          <TouchableOpacity
            onPress={() => router.push("/user/storeProduct/storeProduct")}
            key={store.id}
            activeOpacity={0.8}
            style={tw`w-[48%] bg-white rounded-2xl mb-4 overflow-hidden shadow-md`}
          >
            <Image
              source={store.image}
              resizeMode="cover"
              style={tw`w-full h-32 rounded-t-2xl`}
            />
            <View style={tw`flex-row justify-between items-center p-3`}>
              <Text style={tw`font-PoppinsMedium text-base text-black`}>
                {store.store_name}
              </Text>
              <Pressable
                onPress={() => router.push("/user/storeProduct/storeProduct")}
                style={tw`p-1.5 bg-[#e4e4e4] rounded-full`}
              >
                <SvgXml
                  xml={IconArrowCorner}
                  width={20}
                  height={20}
                  style={tw`p-1.5 bg-[#e4e4e4] rounded-full`}
                />
              </Pressable>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Stores;
