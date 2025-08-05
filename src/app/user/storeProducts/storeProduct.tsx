import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router, useLocalSearchParams } from "expo-router";
import tw from "@/src/lib/tailwind";
import { useProductByCategoryMutation } from "@/src/redux/apiSlices/homePageApiSlices";
import ProductCard from "@/src/components/ProductCard";

const storeProduct = () => {
  const { categoryData } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [product, setProduct] = useState(null);

  const [category, { isLoading, isError }] = useProductByCategoryMutation();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await category(categoryData).unwrap();
        setProduct(response?.data);
      } catch (error) {
        console.log(error, "hare is category product not found --------->");
      }
    };

    getCategory();
  }, []);

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={`Store Products- ${categoryData}`}
        titleStyle={tw`mx-auto`}
      />
      <FlatList
        numColumns={2}
        data={product}
        style={tw`px-[4%]`}
        contentContainerStyle={tw`gap-1 items-center justify-between `}
        columnWrapperStyle={tw`gap-1 justify-between mb-3`}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size="large" color={tw.color("red-500")} />
          ) : (
            <Text style={tw`text-center mt-4 text-gray-500`}>
              No products available.
            </Text>
          )
        }
        renderItem={({ item, index }) => {
          return (
            <ProductCard
              onPress={() =>
                router.push({
                  pathname: "/user/storeProducts/productDetails",
                  params: { productId: item?.id, category: categoryData },
                })
              }
              productName={item.name}
              productImg={item?.images[0]}
              productPrice={item?.regular_price}
              categoryName={categoryData}
              shopName={item.storeName}
              productWidth={item.size}
              shopOnPress={() => setModalVisible(true)}
            />
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
