import { View, Text, TouchableOpacity, ScrollView, Button } from "react-native";
import React, { useCallback, useRef } from "react";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import {
  IconAddToCartWhite,
  IconDelete,
  IconMuniceButton,
  IconPlusButton,
} from "@/assets/icon";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { Swipeable } from "react-native-gesture-handler";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import {
  useDeleteWishlistItemMutation,
  useGetWishlistQuery,
} from "@/src/redux/apiSlices/wishlistSlices";
import { Image } from "expo-image";

import { StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { ImgBurger } from "@/assets/images";

const wishlist = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // ------------------------- apis all ------------------

  const { data: allWishlistData } = useGetWishlistQuery({});
  const { productId } = useDeleteWishlistItemMutation();

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  // ------------------ delete wishlist item ------------------

  const handleDeleteWishlistItem = async () => {
    try {
      // const response = await
    } catch (error) {
      console.log(error, "Wishlist Item not deleted --!");
    }
  };

  const SwipeToDeleteCard = ({
    data,
    onDelete,
    onAddToCart,
  }: {
    data: any;
    onDelete: () => void;
    onAddToCart: () => void;
  }) => {
    const renderRightActions = () => (
      <TouchableOpacity
        onPress={onDelete}
        style={tw`bg-[#FF5353] justify-center items-center w-24 h-[90%] rounded-lg`}
      >
        <SvgXml xml={IconDelete} />
      </TouchableOpacity>
    );

    const renderLeftActions = () => (
      <TouchableOpacity
        onPress={onAddToCart}
        style={tw`bg-primary justify-center items-center w-24 h-[90%] rounded-lg`}
      >
        <SvgXml xml={IconAddToCartWhite} />
      </TouchableOpacity>
    );

    return (
      <Swipeable
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        rightThreshold={70}
        leftThreshold={70}
      >
        <TouchableOpacity
          style={tw`flex-row justify-between items-center p-2 rounded-xl mx-5 bg-white mb-2`}
        >
          <View style={tw`flex-row items-center gap-2 flex-shrink`}>
            <Image
              style={tw`w-24 h-20`}
              source={data.image}
              contentFit="contain"
            />
            <View style={tw`flex-1`}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={tw`pr-2 font-PoppinsSemiBold text-sm text-black`}
              >
                {data?.product_name}
              </Text>

              <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
                {data?.size}
              </Text>
              {data?.promo_price !== "0" ? (
                <View>
                  <View style={tw`flex-row items-center gap-1`}>
                    <Text style={tw`font-PoppinsSemiBold text-sm text-primary`}>
                      $ {data?.promo_price}
                    </Text>
                    <Text style={tw`font-PoppinsRegular text-xs text-black`}>
                      Promo Price
                    </Text>
                  </View>
                  <View style={tw`flex-row items-center gap-1`}>
                    <Text
                      style={tw`font-PoppinsSemiBold text-sm text-primary line-through`}
                    >
                      $ {data?.regular_price}
                    </Text>
                    <Text style={tw`font-PoppinsRegular text-xs text-black`}>
                      Regular price
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={tw`flex-row items-center gap-1`}>
                  <Text style={tw`font-PoppinsSemiBold text-sm text-primary`}>
                    $ {data?.regular_price}
                  </Text>
                  <Text style={tw`font-PoppinsRegular text-xs text-black`}>
                    Regular Price
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* =================== quantity counter =================== */}
          <View style={tw` items-center gap-1.5 bg-slate-50 rounded-full`}>
            <TouchableOpacity
              onPress={() => {
                if (quantity >= 2) {
                  setQuantity(quantity - 1);
                }
              }}
              style={tw`px-2.5 py-3.5 rounded-full bg-[#eff3f7]`}
            >
              <SvgXml xml={IconMuniceButton} />
            </TouchableOpacity>
            <Text>{quantity}</Text>
            <TouchableOpacity
              onPress={() => {
                if (quantity <= 9) {
                  setQuantity(quantity + 1);
                }
              }}
              style={tw`p-2.5 rounded-full bg-primary`}
            >
              <SvgXml xml={IconPlusButton} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title="Stores" />
      <ScrollView style={tw`flex-grow mb-24`}>
        {allWishlistData?.wishlist.map((item) => (
          <SwipeToDeleteCard
            key={item.id}
            data={item}
            onDelete={handlePresentModalPress}
            // onPress={handleCloseModalPress}
            onAddToCart={() =>
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Success",
                textBody: "Added add to cart",
              })
            }
          />
        ))}
      </ScrollView>

      {/* ============= Delete modal ========================= */}

      <BottomSheetModalProvider>
        <BottomSheetModal ref={bottomSheetModalRef}>
          <BottomSheetView style={styles.contentContainer}>
            <Text
              style={tw`font-PoppinsMedium text-base text-center text-black`}
            >
              Remove from cart ?
            </Text>
            <Text style={tw` border-b w-full`}></Text>

            <View
              style={tw`flex-row items-center p-3 rounded-2xl bg-white mt-7 mb-3 shadow-md`}
            >
              <Image
                source={ImgBurger}
                style={tw`w-14 h-14 rounded-md`}
                contentFit="contain"
              />
              <View style={tw`ml-4`}>
                <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
                  Red Apple
                </Text>
                <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
                  1kg
                </Text>
                <Text
                  style={tw`font-PoppinsSemiBold text-base text-primary mt-1`}
                >
                  $55
                </Text>
              </View>
            </View>

            <View style={tw`flex-row justify-between items-center mt-8 `}>
              <TouchableOpacity
                onPress={handleCloseModalPress}
                style={tw`bg-[#E8E8E8] px-10 py-2.5 rounded-full`}
              >
                <Text style={tw`font-PoppinsMedium text-black text-lg`}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => setIsModalVisible(!isModalVisible)}
                style={tw`bg-[#FF0000] px-10 py-2.5 rounded-full`}
              >
                <Text style={tw`font-PoppinsMedium text-white text-lg`}>
                  Yes, remove
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 16,
    height: 360,
  },
});

export default wishlist;
