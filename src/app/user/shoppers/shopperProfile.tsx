import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import tw from "@/src/lib/tailwind";
import { IconHome, IconRightArrowSingle } from "@/assets/icon";
import { SvgXml } from "react-native-svg";
import { router, useLocalSearchParams } from "expo-router";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { useProductByStoreMutation } from "@/src/redux/apiSlices/homePageApiSlices";
import ProductCard from "@/src/components/ProductCard";

const shopperProfile = () => {
  const { storeName } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [productStoreData, setProductStoreData] = useState(null);
  console.log(
    productStoreData,
    "ther is productStoreData console-=____________>"
  );

  //  ------------------ all api ---------------------
  const [store] = useProductByStoreMutation();

  const loadProductByStore = async () => {
    try {
      const response = await store({ storeName }).unwrap();
      if (response?.status) {
        setProductStoreData(response?.data);
      }
      console.log(response, "hare is product by store response --------->");
    } catch (error) {
      console.log(error, "Product by store not load --------->");
    }
  };

  useEffect(() => {
    loadProductByStore();
  }, []);

  const renderHeader = () => (
    <View>
      <BackWithComponent
        onPress={() => router.back()}
        title={"Profile"}
        fastComponentContentStyle={tw`shadow-lg`}
        endComponentContentStyle={tw`shadow-lg`}
      />
      <View style={tw`items-center gap-2 mb-6`}>
        <SvgXml xml={IconHome} />
        <Text style={tw`font-semibold text-base text-black text-center`}>
          {storeName}
        </Text>
      </View>

      <View style={tw`w-full flex-row justify-between items-center my-5 px-4`}>
        <Text style={tw`font-PoppinsSemiBold text-xl text-black`}>
          Our products
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

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        data={productStoreData}
        ListFooterComponentStyle={tw`w-full`}
        contentContainerStyle={tw`gap-1 items-center justify-between px-5  bg-white`}
        columnWrapperStyle={tw`gap-1 justify-between mb-3`}
        renderItem={(item) => {
          <ProductCard
            onPress={() =>
              router.push({
                pathname: "/user/storeProducts/productDetails",
                // params: { productId: item?.id, category: categoryData },
              })
            }
            productName={item.name}
            productImg={item?.images}
            productPrice={item?.regular_price}
            promoPrice={item?.promo_price}
            shopName={item.storeName}
            productWidth={item.size}
            shopOnPress={() => setModalVisible(true)}
          />;
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

export default shopperProfile;
