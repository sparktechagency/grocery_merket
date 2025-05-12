import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { CartData } from "@/src/components/CardData";
import { BlurView } from "expo-blur";
import { SvgXml } from "react-native-svg";
import { IconLove, IconShopping } from "@/assets/icon";

const storeProduct = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent
        onPress={() => router.back()}
        title="Store Products- (Store name)"
        titleStyle={tw`mx-auto`}
      />
      <FlatList
        numColumns={2}
        data={CartData}
        style={tw`px-[4%]`}
        contentContainerStyle={tw`gap-1 items-center justify-between `}
        columnWrapperStyle={tw`gap-1 justify-between mb-3`}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              // onPress={() => router.push("/user/storeProduct/productDetails")}
              activeOpacity={0.8}
              style={tw` w-[49%]  bg-white rounded-2xl   shadow-md`}
            >
              <Pressable
                onPress={() => router.push("/user/storeProduct/productDetails")}
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
                  onPress={() =>
                    router.push("/user/storeProduct/productDetails")
                  }
                  style={tw`absolute  bg-transparent right-1.5 top-4`}
                >
                  <BlurView
                    intensity={60}
                    style={tw`p-1.5 border border-white rounded-full  overflow-hidden`}
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
                  <View
                    style={tw` flex-1 flex-row justify-between items-center `}
                  >
                    <Text
                      style={tw`font-PoppinsSemiBold text-base text-primary`}
                    >
                      ${item?.price}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setModalVisible(true)}
                      style={tw`p-2 bg-white shadow-md rounded-full`}
                    >
                      <SvgXml xml={IconShopping} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Pressable>
            </TouchableOpacity>
          );
        }}
      />

      {/* ================= modal ================ */}

      <Modal
        animationType="slide"
        style={tw`w-[90%]`}
        transparent={true}
        visible={modalVisible}
        onDismiss={() => setModalVisible(!modalVisible)}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={tw`flex-1 justify-center items-center bg-black/50`}>
            <View style={tw`bg-white w-80 rounded-2xl py-6 px-8`}>
              <Text style={tw`text-center font-PoppinsBold text-xl mb-4`}>
                Added to cart
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={tw`px-10 py-3 border border-[#686868] rounded-xl`}
              >
                <Text style={tw`font-PoppinsRegular text-base text-center`}>
                  Remove from cart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={tw`px-10 py-3  bg-primary rounded-xl mt-3`}
              >
                <Text
                  style={tw`font-PoppinsSemiBold text-base text-white text-center`}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default storeProduct;
