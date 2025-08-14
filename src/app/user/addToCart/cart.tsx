import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import tw from "@/src/lib/tailwind";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { SvgXml } from "react-native-svg";
import { IconDelete, IconMuniceButton, IconPlusButton } from "@/assets/icon";
import TButton from "@/src/lib/buttons/TButton";
import { ImgEmpty } from "@/assets/images";
import { Swipeable } from "react-native-gesture-handler";
import {
  useDeleteCartItemMutation,
  useGetCartQuery,
  useLazyGetCartByIdQuery,
  useUpdateCartItemMutation,
} from "@/src/redux/apiSlices/cartSlices";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const cart = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [singleItem, setSingleItem] = useState(null);

  //  ----------------------- all apis ------------------------------
  const { data: getCartData } = useGetCartQuery({});
  const [cartId] = useLazyGetCartByIdQuery({});
  const [cartItemId] = useDeleteCartItemMutation();
  const [cartDataId] = useUpdateCartItemMutation();

  // callbacks -------------------------------------------------------------
  const handlePresentModalPress = useCallback(async (id) => {
    bottomSheetModalRef.current?.present();
    try {
      const response = await cartId(id).unwrap();
      if (response?.status) {
        setSingleItem(response);
      }
    } catch (error) {
      console.log(error, " modal not open  !");
    }
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  // -=---------------------- cart item deleted ---------------------

  const handleDeleteCartItem = async (id) => {
    try {
      const response = await cartItemId(id).unwrap();
      if (response?.status) {
        bottomSheetModalRef.current?.dismiss();
        router.push({
          pathname: "/Toaster",
          params: { res: response?.message },
        });
      }
    } catch (error) {
      console.log(error, "wishlist item not removed !");
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };

  const SwipeToDeleteCard = ({
    data,
    onDelete,
  }: {
    data: any;
    onDelete: () => void;
  }) => {
    const renderRightActions = () => (
      <TouchableOpacity
        onPress={onDelete}
        style={tw`bg-[#FF5353] justify-center items-center w-24 h-[90%] rounded-lg`}
      >
        <SvgXml xml={IconDelete} />
      </TouchableOpacity>
    );

    return (
      <Swipeable
        renderRightActions={renderRightActions}
        rightThreshold={70}
        leftThreshold={70}
      >
        <Pressable
          style={tw`flex-row justify-between items-center p-2 rounded-xl  bg-white mb-2`}
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

          {/* =================== quantity counter =================== */}
          <View style={tw` items-center gap-1.5 bg-slate-50 rounded-full`}>
            <TouchableOpacity
              onPress={async () => {
                if (Number(data?.quantity) >= 2) {
                  try {
                    await cartDataId({
                      cartDataId: data?.id,
                      quantity: Number(data?.quantity) - 1,
                    }).unwrap();
                  } catch (error) {
                    console.log(error, "Product not Updated to cart");
                    router.push({
                      pathname: "/Toaster",
                      params: { res: error?.message || error },
                    });
                  }
                }
              }}
              style={tw`px-2.5 py-3.5 rounded-full bg-[#eff3f7]`}
            >
              <SvgXml xml={IconMuniceButton} />
            </TouchableOpacity>
            <Text style={tw`font-PoppinsSemiBold text-sm`}>
              {data?.quantity}
            </Text>
            <TouchableOpacity
              onPress={async () => {
                if (Number(data?.quantity) <= 9) {
                  try {
                    await cartDataId({
                      cartDataId: data?.id,
                      quantity: Number(data?.quantity) + 1,
                    }).unwrap();
                  } catch (error) {
                    console.log(error, "Product not added to cart");
                    router.push({
                      pathname: "/Toaster",
                      params: { res: error?.message || error },
                    });
                  }
                }
              }}
              style={tw`p-2.5 rounded-full bg-primary`}
            >
              <SvgXml xml={IconPlusButton} />
            </TouchableOpacity>
          </View>
        </Pressable>
      </Swipeable>
    );
  };

  return (
    <>
      <View style={tw`flex-1  `}>
        {getCartData?.cart?.length !== 0 ? (
          <View style={tw`flex-1`}>
            <BackWithComponent onPress={() => router.back()} title={"Cart"} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`mx-5`}
            >
              {getCartData?.cart?.map((item) => (
                <SwipeToDeleteCard
                  key={item.id}
                  data={item}
                  onDelete={() => handlePresentModalPress(item?.id)}
                />
              ))}

              {/* ------------------------ add to cart item info ---------------- */}

              <View style={tw`bg-[#F3F5F7] p-4 my-10 rounded-xl`}>
                <View style={tw`flex-row justify-between items-center`}>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    Total items:
                  </Text>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    {getCartData?.total_products}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between items-center mt-2.5`}>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    Sub total:
                  </Text>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    $ {getCartData?.total_price}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between items-center mt-2.5`}>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    Delivery charge:
                  </Text>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    $ 0
                  </Text>
                </View>
                <View style={tw`flex-row justify-between items-center mt-2.5`}>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    Tax:
                  </Text>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    $ 0
                  </Text>
                </View>
                {/*  ====== border bottom ---------- */}
                <View style={tw`w-full mb-3`}>
                  <Text
                    style={tw`w-full mx-auto border-b border-regularText  `}
                  ></Text>
                </View>

                <View style={tw`flex-row justify-between items-center`}>
                  <Text style={tw`font-PoppinsSemiBold text-lg text-black`}>
                    Total:
                  </Text>
                  <Text style={tw`font-PoppinsSemiBold text-lg text-black`}>
                    $ {getCartData?.total_price}
                  </Text>
                </View>
              </View>

              <View style={tw`rounded-full mb-6`}>
                <TButton
                  // onPress={handleSubmit(onSubmit)}
                  onPress={() => router.push("/user/addToCart/checkOut")}
                  title="Checkout"
                  containerStyle={tw`rounded-full `}
                />
              </View>
            </ScrollView>
          </View>
        ) : (
          //  when your cart section empty ------------------------------------
          <View style={tw`flex-1 mx-5 flex-col justify-between `}>
            <BackWithComponent onPress={() => router.back()} title={"Cart"} />
            <View style={tw` w-full text-center px-16 mx-auto`}>
              <View>
                <Image style={tw`mx-auto`} source={ImgEmpty} />
                <Text
                  style={tw`font-PoppinsSemiBold text-xl text-black mt-3 mx-auto`}
                >
                  Your cart is empty!
                </Text>
                <Text
                  style={tw`font-PoppinsRegular text-base text-regularText text-center mt-3  mx-auto`}
                >
                  Start shopping, add some groceries to your cart. Added items
                  will appear here.
                </Text>
              </View>
            </View>

            <View style={tw`rounded-full mb-6`}>
              <TButton
                // onPress={handleSubmit(onSubmit)}
                onPress={() => router.push("/user/drawer/home")}
                title="Back to store"
                containerStyle={tw`rounded-full `}
              />
            </View>
          </View>
        )}
      </View>

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
                source={singleItem?.cart?.image}
                style={tw`w-14 h-14 rounded-md`}
                contentFit="contain"
              />
              <View style={tw`ml-4`}>
                <Text
                  numberOfLines={1}
                  style={tw`font-PoppinsSemiBold text-base text-black`}
                >
                  {singleItem?.cart?.product_name}
                </Text>
                <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
                  {singleItem?.cart?.size}
                </Text>
                {singleItem?.cart?.promo_price !== "0" ? (
                  <View>
                    <View style={tw`flex-row items-center gap-1`}>
                      <Text
                        style={tw`font-PoppinsSemiBold text-sm text-primary`}
                      >
                        $ {singleItem?.cart?.promo_price}
                      </Text>
                    </View>
                    <View style={tw`flex-row items-center gap-1`}>
                      <Text
                        style={tw`font-PoppinsSemiBold text-sm text-red-700 line-through`}
                      >
                        $ {singleItem?.cart?.regular_price}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={tw`flex-row items-center gap-1`}>
                    <Text style={tw`font-PoppinsSemiBold text-sm text-primary`}>
                      $ {singleItem?.cart?.regular_price}
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
                onPress={() => handleDeleteCartItem(singleItem?.cart?.id)}
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
    </>
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
    height: 300,
  },
});

export default cart;
