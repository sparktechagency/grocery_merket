import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import {
  ImgDetailsCarrot,
  ImgExpireDate,
  ImgOrganic,
  ImgStoreTwo,
} from "@/assets/images";
import { SvgXml } from "react-native-svg";
import { IconArrowCorner, IconLove, IconShopping } from "@/assets/icon";
import { BlurView } from "expo-blur";
import { FlatList } from "react-native-gesture-handler";
import { CartData } from "@/src/components/CardData";
import TButton from "@/src/lib/buttons/TButton";
import BackWithComponentLastIcon from "@/src/lib/backHeader/BackWithComponentLastIcon";

const productDetails = () => {
  const renderHeader = () => (
    <View style={tw`bg-white`}>
      {/* ------- header part ----------- */}
      <View style={tw`relative`}>
        <View
          style={tw`absolute -top-[70] self-center bg-[#F3F5F7] w-[140] h-[140] rounded-full`}
        />
        <View style={tw`w-full`}>
          <BackWithComponentLastIcon
            onPress={() => router.push("/user/drawer/home/search")}
            title="Fresh Carrots"
            containerStyle={tw`px-0`}
            fastComponentContentStyle={tw`shadow-lg`}
            endComponentContentStyle={tw`shadow-lg`}
          />
          <View style={tw`w-full items-center`}>
            <Image
              style={tw`w-96 h-52 aspect-square`}
              resizeMode="contain"
              source={ImgDetailsCarrot}
            />
          </View>
        </View>
      </View>
      {/* ----------------- content section --------------- */}
      <View style={tw`mt-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          <View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>
              1 KG
            </Text>
            <Text style={tw`font-PoppinsSemiBold text-xl text-primary`}>
              $ 10.50
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-4`}>
            <TouchableOpacity
              style={tw`py-2 px-4 bg-white shadow-md rounded-lg`}
            >
              <Text style={tw`font-bold text-xl text-black`}>-</Text>
            </TouchableOpacity>
            <Text style={tw`font-PoppinsSemiBold text-xl text-black`}>1kg</Text>
            <TouchableOpacity style={tw`py-2 px-4 bg-primary  rounded-lg`}>
              <Text style={tw`font-bold text-lg text-white`}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Pressable
          onPress={() => router.push("/user/shoppers/shopperProfile")}
          style={tw`p-3.5 flex-row justify-between items-center bg-[#FF8842] my-7 rounded-xl`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <Image style={tw`w-9 h-9 rounded-full`} source={ImgStoreTwo} />
            <Text style={tw`font-PoppinsMedium text-sm text-white`}>
              Starbucks
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-PoppinsMedium text-sm text-white`}>
              Store details
            </Text>
            <TouchableOpacity>
              <SvgXml color={"white"} xml={IconArrowCorner} />
            </TouchableOpacity>
          </View>
        </Pressable>

        <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
          Lorem ipsum dolor sit amet consectetur. Et egestas viverra et
          hendrerit ultrices cras. In porttitor odio turpis commodo libero. Leo
          ac turpis morbi vulputate elit quam. Id tellus eget etiam commodo quam
          ultrices.
        </Text>

        <View style={tw`flex-row justify-between items-center my-6`}>
          <View
            style={tw`flex-row items-center bg-[#FFF9EB] py-2 px-5 rounded-xl gap-3`}
          >
            <Image style={tw`w-8 h-8`} source={ImgOrganic} />
            <View>
              <Text style={tw`font-PoppinsSemiBold text-sm text-primary`}>
                100%
              </Text>
              <Text style={tw`font-PoppinsSemiBold text-sm text-black`}>
                Organic
              </Text>
            </View>
          </View>

          <View
            style={tw`flex-row items-center bg-[#EAF6FF] py-2 px-5 rounded-xl gap-3`}
          >
            <Image style={tw`w-8 h-8`} source={ImgExpireDate} />
            <View>
              <Text style={tw`font-PoppinsSemiBold text-sm text-primary`}>
                7 days
              </Text>
              <Text style={tw`font-PoppinsSemiBold text-sm text-black`}>
                Expiration
              </Text>
            </View>
          </View>
        </View>

        <Text style={tw`font-PoppinsSemiBold text-lg text-black mb-4`}>
          Similar Items
        </Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => router.push("/user/storeProduct/productDetails")}
        activeOpacity={0.8}
        style={tw` w-[49%]  bg-white rounded-2xl   shadow-md`}
      >
        <View style={tw` flex-1 w-full  bg-[#F3F5F7]  px-2.5 py-2 rounded-xl`}>
          <Image
            source={item?.image}
            resizeMode="contain"
            style={tw`h-24 mx-auto p-1`}
          />
          <Text
            style={tw`absolute font-PoppinsSemiBold text-[10px] px-1.5 py-0.5 bg-[#56A5FF] rounded-r-full top-4 z-10 `}
          >
            New
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/user/storeProduct/productDetails")}
            style={tw`absolute  bg-transparent right-1.5 top-4`}
          >
            <BlurView
              intensity={90}
              style={tw`w-10 h-10 justify-center items-center border border-white rounded-full  overflow-hidden`}
            >
              <SvgXml xml={IconLove} />
            </BlurView>
          </TouchableOpacity>

          {/* content part  */}
          <View style={tw`pb-1.5`}>
            <View
              style={tw`flex-row justify-between items-center gap-1 pt-1.5 `}
            >
              <Text
                style={tw`font-PoppinsMedium text-[10px] text-regularText bg-[#dddcdc] px-1 py-0.5 shadow-sm rounded-sm`}
              >
                {item.category}
              </Text>
              <Text
                style={tw`bg-[#FF5F00] font-PoppinsMedium text-[10px] px-1 py-0.5 shadow-sm rounded-sm text-white`}
              >
                {item.brand}
              </Text>
            </View>
            <Text style={tw`font-PoppinsMedium text-sm text-black mt-1`}>
              {item.title}
            </Text>
            <Text style={tw`font-PoppinsMedium text-xs text-[#787878]`}>
              {item.weight}
            </Text>
            <View style={tw` flex-1 flex-row justify-between items-center `}>
              <Text style={tw`font-PoppinsSemiBold text-base text-primary`}>
                ${item?.price}
              </Text>
              <TouchableOpacity
                onPress={() => router?.push("/addCartModal")}
                style={tw`p-2 bg-white shadow-md rounded-full`}
              >
                <SvgXml xml={IconShopping} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => (
    <View style={tw`w-full  rounded-full my-3`}>
      <TButton
        onPress={() => router.push("/user/addToCart/cart")}
        title="Add to Cart"
        containerStyle={tw`rounded-full `}
      />
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      data={CartData}
      ListFooterComponentStyle={tw`w-full`}
      contentContainerStyle={tw`gap-1 items-center justify-between px-5  bg-white`}
      columnWrapperStyle={tw`gap-1 justify-between mb-3`}
      renderItem={renderItem}
    />
  );
};

export default productDetails;
