import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FlatList, Pressable } from "react-native-gesture-handler";
import { CartData } from "@/src/components/CardData";
import tw from "@/src/lib/tailwind";
import {
  IconLocationWhite,
  IconLove,
  IconRightArrowSingle,
  IconShopping,
} from "@/assets/icon";
import { SvgXml } from "react-native-svg";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import DiscountCarousel from "@/src/components/Carousel";
import { ImgShopperOne } from "@/assets/images";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { OnCollapsable } from "@/src/components/OnCollapsable";

const shopperProfile = () => {
  const { storeName } = useLocalSearchParams();
  console.log(storeName, " store name is ------------>");

  const renderHeader = () => (
    <View>
      <BackWithComponent
        onPress={() => router.back()}
        title={"Profile"}
        fastComponentContentStyle={tw`shadow-lg`}
        endComponentContentStyle={tw`shadow-lg`}
      />
      <View style={tw`items-center gap-2 mb-6`}>
        <Image style={tw`w-20 h-20 rounded-full`} source={ImgShopperOne} />
        <Text style={tw`font-semibold text-base text-black`}>Starbucks</Text>
        <View style={tw`flex-row items-center gap-2`}>
          <SvgXml xml={IconLocationWhite} />
          <Text>Fairbanks North Star</Text>
        </View>
      </View>
      {/*  ---------- Discount Carousel -------------- */}
      <DiscountCarousel />

      <View style={tw`w-full flex-row justify-between items-center my-5 px-4`}>
        <Text style={tw`font-PoppinsSemiBold text-xl text-black`}>
          Category
        </Text>
        <TouchableOpacity
          style={tw`flex-row justify-center gap-1 items-center`}
        >
          <Text>View all</Text>
          <SvgXml xml={IconRightArrowSingle} />
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => router.push("/user/storeProducts/productDetails")}
        activeOpacity={0.8}
        style={tw` w-[49%]  bg-white rounded-2xl   shadow-md`}
      >
        <Pressable
          style={tw` flex-1 w-full  bg-[#F3F5F7]  px-2.5 py-2 rounded-xl`}
        >
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
            onPress={() => router.push("/user/storeProducts/productDetails")}
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
              style={tw`flex-row justify-between items-center gap-2 pt-1.5 `}
            >
              <Text
                style={tw`font-PoppinsMedium text-xs text-regularText bg-[#dddcdc] p-0.5 shadow-sm rounded-sm`}
              >
                {item.category}
              </Text>
              <Text
                style={tw`bg-[#FF5F00] font-PoppinsMedium text-xs p-0.5 shadow-sm rounded-sm text-white`}
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
        </Pressable>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => (
    <View>
      <View>
        <Text style={tw`font-PoppinsSemiBold text-xl text-black mb-3`}>
          About us
        </Text>
        <Text style={tw`font-PoppinsRegular text-sm text-black`}>
          Lorem ipsum dolor sit amet consectetur. Risus aliquam faucibus risus
          et nulla. Vel ornare enim neque turpis. Amet leo amet dignissim amet
          tincidunt eget id justo. Massa facilisis porttitor tortor varius
          lectus et volutpat non est. Duis posuere phasellus ullamcorper et mi
          lacus interdum sed vulputate. Venenatis lacinia sagittis dignissim
          elit aliquet. Vitae lectus vulputate id augue. Sed pulvinar
          suspendisse turpis diam varius varius sed. Volutpat turpis dictum
          netus ultricies elementum scelerisque nunc.
        </Text>
      </View>
      <OnCollapsable />
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        data={CartData}
        ListFooterComponentStyle={tw`w-full`}
        contentContainerStyle={tw`gap-1 items-center justify-between px-5  bg-white`}
        columnWrapperStyle={tw`gap-1 justify-between mb-3`}
        renderItem={renderItem}
      />
    </View>
  );
};

export default shopperProfile;
