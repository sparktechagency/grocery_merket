import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconAddToCartWhite, IconDelete } from "@/assets/icon";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { Swipeable } from "react-native-gesture-handler";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import {
  useDeleteWishlistItemMutation,
  useGetWishlistQuery,
  useLazyGetWishlistByIdQuery,
} from "@/src/redux/apiSlices/wishlistSlices";
import { Image } from "expo-image";

import { StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { ImgEmpty } from "@/assets/images";
import { useAddToCartMutation } from "@/src/redux/apiSlices/cartSlices";

const wishlist = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [singleItem, setSingleItem] = useState(null);

  // ------------------------- apis all ------------------

  const { data: allWishlistData } = useGetWishlistQuery({});
  const [deleteWishlistItem] = useDeleteWishlistItemMutation();
  const [getWishlistById] = useLazyGetWishlistByIdQuery({});
  const [cartData] = useAddToCartMutation();

  // callbacks
  const handlePresentModalPress = useCallback(async (id) => {
    bottomSheetModalRef.current?.present();

    try {
      const response = await getWishlistById(id).unwrap();

      if (response?.status) {
        setSingleItem(response);
      }
    } catch (error) {
      console.log(
        error,
        "there is wrong wishlist item product -------------->"
      );
    }
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  // ------------------ delete wishlist item ------------------

  const handleDeleteWishlistItem = async (id) => {
    try {
      const response = await deleteWishlistItem(id).unwrap();
      if (response?.status) {
        bottomSheetModalRef.current?.dismiss();
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Deleted From Wishlist !",
        });
      }
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
        <Pressable
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
                  </View>
                  <View style={tw`flex-row items-center gap-1`}>
                    <Text
                      style={tw`font-PoppinsSemiBold text-sm text-red-700 line-through`}
                    >
                      $ {data?.regular_price}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={tw`flex-row items-center gap-1`}>
                  <Text style={tw`font-PoppinsSemiBold text-sm text-primary`}>
                    $ {data?.regular_price}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Pressable>
      </Swipeable>
    );
  };

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title="Wishlist" />
      <ScrollView style={tw`flex-grow mb-24`}>
        {allWishlistData?.wishlist?.length !== 0 ? (
          allWishlistData?.wishlist.map((item) => (
            <SwipeToDeleteCard
              key={item.id}
              data={item}
              onDelete={() => handlePresentModalPress(item?.id)}
              // onPress={handleCloseModalPress}
              onAddToCart={async () => {
                console.log(
                  item?.product_id,
                  "pora lekha kore ze gari gora cole se"
                );
                try {
                  const response = await cartData({
                    product_id: item?.product_id,
                  }).unwrap();
                  if (response?.status) {
                    Toast.show({
                      type: ALERT_TYPE.SUCCESS,
                      title: "Success",
                      textBody: "Your Selected item added to your cart !",
                    });
                  }
                } catch (error) {
                  console.log(error, "Your selected Item not added to cart !");
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: "Please try again !",
                  });
                }
              }}
            />
          ))
        ) : (
          <View style={tw` w-full text-center px-16 mx-auto`}>
            <View>
              <Image style={tw`mx-auto`} source={ImgEmpty} />
              <Text
                style={tw`font-PoppinsSemiBold text-xl text-black mt-3 mx-auto`}
              >
                Your wishlist is empty!
              </Text>
              <Text
                style={tw`font-PoppinsRegular text-base text-regularText text-center mt-3  mx-auto`}
              >
                Start shopping, add some groceries to your wishlist. Added items
                will appear here.
              </Text>
            </View>
          </View>
        )}
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
                source={singleItem?.wishlist?.image}
                style={tw`w-14 h-14 rounded-md`}
                contentFit="contain"
              />
              <View style={tw`ml-4`}>
                <Text
                  numberOfLines={1}
                  style={tw`font-PoppinsSemiBold text-base flex-1 text-black`}
                >
                  {singleItem?.wishlist?.product_name}
                </Text>
                <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
                  {singleItem?.wishlist?.size}
                </Text>
                {singleItem?.wishlist?.promo_price !== "0" ? (
                  <View>
                    <View style={tw`flex-row items-center gap-1`}>
                      <Text
                        style={tw`font-PoppinsSemiBold text-sm text-primary`}
                      >
                        $ {singleItem?.wishlist?.promo_price}
                      </Text>
                    </View>
                    <View style={tw`flex-row items-center gap-1`}>
                      <Text
                        style={tw`font-PoppinsSemiBold text-sm text-red-700 line-through`}
                      >
                        $ {singleItem?.wishlist?.regular_price}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={tw`flex-row items-center gap-1`}>
                    <Text style={tw`font-PoppinsSemiBold text-sm text-primary`}>
                      $ {singleItem?.wishlist?.regular_price}
                    </Text>
                  </View>
                )}
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
                onPress={() =>
                  handleDeleteWishlistItem(singleItem?.wishlist?.id)
                }
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
