import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useCallback, useRef } from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { Link, router, useLocalSearchParams } from "expo-router";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import {
  IconCheckout,
  IconLeftLineArrow,
  IconPlaceOrderSelected,
  IconRightArrowSingle,
} from "@/assets/icon";

import TButton from "@/src/lib/buttons/TButton";
import { ImgShopperOne } from "@/assets/images";
import OrderBill from "@/src/components/OrderBill";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useGetAllShopperQuery } from "@/src/redux/apiSlices/profileSlieces";
import {
  useConfirmPaymentMutation,
  usePaymentIntentMutation,
} from "@/src/redux/apiSlices/payment";
import { confirmPayment, useStripe } from "@stripe/stripe-react-native";

const placeOrder = () => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [shopperId, setShopperId] = React.useState<string>("");
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(async () => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const { userInfo, cartInfo } = useLocalSearchParams();
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  const parsedCartInfo = cartInfo ? JSON.parse(cartInfo) : null;

  // ******************************* API CALLS ****************************************************
  const { data: getAllShoppers, isLoading: isGetAllShopperLoading } =
    useGetAllShopperQuery({});
  const [createIntent, intentResult] = usePaymentIntentMutation();
  const [confirmPayment] = useConfirmPaymentMutation({});

  // -===================== payment system  ==========================-

  const handleSetupInitialPayment = async () => {
    try {
      const response = await createIntent({ shopper_id: "2" }).unwrap();
      const clientSecret = response.data.client_secret;
      // Handle the case where a valid client secret is not returned
      if (!clientSecret) {
        router.push({
          pathname: "/Toaster",
          params: {
            response: "Could not initialize payment sheet. Please try again.",
          },
        });
        return;
      }

      let paymentIntentId = {
        payment_id: response?.data?.payment_id,
        payment_intent_id: response?.data?.payment_intent_id,
      };
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        paymentIntentClientSecret: clientSecret,
      });
      if (initError) {
        // handle error
        router.push({
          pathname: "/Toaster",
          params: { response: initError?.message || initError },
        });
      } else {
        checkout(paymentIntentId);
      }
    } catch (error) {
      console.log(error, "payment intent not created");
    }
  };
  const checkout = async (paymentIntentId) => {
    try {
      const { error } = await presentPaymentSheet();
      if (error) {
        router.push({
          pathname: "/Toaster",
          params: { response: error?.message || error },
        });
      } else {
        const response = await confirmPayment(paymentIntentId).unwrap();
        if (response) {
          router.push("/user/paymentSystem/orderSuccess");
        }
      }
    } catch (error) {
      console.log(error, "payment not successful---------->");
      router.push({
        pathname: "/Toaster",
        params: { response: error?.message || error },
      });
    }
  };

  return (
    <View style={tw`flex-1 `}>
      <BackWithComponent onPress={() => router.back()} title={"Place Order"} />
      <View style={tw`justify-between flex-grow px-5`}>
        <ScrollView>
          <View style={tw``}>
            {/* ------------------- Steps ---------------- */}
            <View style={tw`flex-row items-center justify-between px-4 py-4`}>
              {/* Step 1: Checkout */}
              <View style={tw`items-center`}>
                <View style={tw`border-2 border-primary rounded-full`}>
                  <View
                    style={tw`w-14 h-14 rounded-full bg-primary justify-center items-center m-1`}
                  >
                    <SvgXml xml={IconCheckout} width={24} height={24} />
                  </View>
                </View>
                <Text style={tw`text-center text-black mt-2`}>Checkout</Text>
              </View>
              {/* Arrow */}
              <View style={tw` flex-1 justify-center items-center pb-3`}>
                <SvgXml xml={IconLeftLineArrow} />
              </View>

              {/* Step 3: Place Order */}
              <View style={tw`items-center`}>
                <View style={tw`border-2 border-primary rounded-full`}>
                  <View
                    style={tw`w-14 h-14 rounded-full  bg-primary justify-center items-center m-1`}
                  >
                    <SvgXml
                      xml={IconPlaceOrderSelected}
                      width={24}
                      height={24}
                    />
                  </View>
                </View>
                <Text style={tw`text-center text-black mt-2`}>Place order</Text>
              </View>
            </View>

            {/*  ======================= userInfo =-================================== */}

            <View style={tw`w-full bg-[#e7e9eb] rounded-xl  mt-2`}>
              <View
                style={tw`flex-row justify-between items-center rounded-t-lg bg-white px-5 py-2`}
              >
                <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
                  Delivery address
                </Text>
                <Link
                  href={"/user/users/userDetails"}
                  style={tw`underline font-PoppinsRegular text-[#56A5FF]`}
                >
                  Change
                </Link>
              </View>
              <View style={tw`px-5 py-3`}>
                <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
                  {parsedUserInfo?.name}
                </Text>
                <Text
                  style={tw`font-PoppinsRegular text-base text-regularText`}
                >
                  {parsedUserInfo?.address}
                </Text>

                <Text style={tw`font-PoppinsRegular text-base text-black mb-2`}>
                  Mobile:
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    {parsedUserInfo?.phone}
                  </Text>
                </Text>
              </View>
            </View>

            {/* -======================== order info ================== */}
            <OrderBill
              headerTitle={"Order bill"}
              totalItems={parsedCartInfo?.total_products}
              subTotal={parsedCartInfo?.total_price}
              deliveryCharge={0}
              tax={0}
              total={parsedCartInfo?.total_price}
            />
            {/*  --====================== time and date or profile ================== */}
            <View style={tw`mt-3 mb-5`}>
              <View style={tw``}>
                <Text style={tw`font-PoppinsRegular text-base text-black`}>
                  shopper
                </Text>
                <TouchableOpacity
                  onPress={() => handlePresentModalPress()}
                  style={tw`border border-gray-400 w-full h-12 rounded-sm flex-row justify-between items-center px-5`}
                >
                  <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                    Choose your shopper
                  </Text>
                  <SvgXml xml={IconRightArrowSingle} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={tw`rounded-full my-4`}>
          <TButton
            isLoading={intentResult?.isLoading}
            onPress={() => handleSetupInitialPayment()}
            // onPress={() => router.push("/user/paymentSystem/orderSuccess")}
            title="Place Order"
            containerStyle={tw`rounded-full `}
          />
        </View>
      </View>

      {/* ------ shopper modal open ------------ */}
      <BottomSheetModalProvider>
        <BottomSheetModal ref={bottomSheetModalRef} snapPoints={["50%", "90%"]}>
          <BottomSheetScrollView
            contentContainerStyle={styles.contentContainer}
          >
            <Text
              style={tw`font-PoppinsMedium text-base text-center text-black`}
            >
              Choose your Shopper
            </Text>
            <Text style={tw` border-b w-full`}></Text>
            <ScrollView>
              {/* ================= Shopper list -============================ */}
              {getAllShoppers?.data.map((item: any, index: number) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedIndex(index);
                    setShopperId(item?.id);
                  }}
                  key={item?.id}
                  style={tw`flex-row items-center  mt-6 w-[85%] gap-7`}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedIndex(index);
                      setShopperId(item?.id);
                    }}
                    style={tw.style(
                      `border w-5 h-5  justify-center items-center rounded-sm`,
                      selectedIndex === index
                        ? `bg-primary border-0`
                        : `bg-transparent`
                    )}
                  >
                    {selectedIndex === index ? (
                      <Text style={tw`text-white text-sm`}>✔</Text>
                    ) : null}
                  </TouchableOpacity>
                  <View
                    style={tw` flex-row items-center bg-white shadow-md rounded-lg w-full px-5  py-3 gap-4`}
                  >
                    <Image
                      style={tw`w-16 h-16 rounded-full`}
                      source={ImgShopperOne}
                    />
                    <Text
                      style={tw`font-PoppinsSemiBold text-base w-full text-black`}
                    >
                      {item?.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              {/*  ------------- button ---------- */}
              <View style={tw`flex-row justify-between items-center mt-5 px-5`}>
                <TouchableOpacity
                  onPress={() => handleCloseModalPress()}
                  style={tw`bg-[#E8E8E8] px-10 py-2.5 rounded-full`}
                >
                  <Text style={tw`font-PoppinsMedium text-black text-lg`}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCloseModalPress()}
                  style={tw`bg-primary px-10 py-2.5 rounded-full`}
                >
                  <Text style={tw`font-PoppinsMedium text-white text-lg`}>
                    Select
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </BottomSheetScrollView>
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
    height: 400,
  },
  centeredViewCalender: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalViewCalender: {
    margin: 20,
    backgroundColor: "white",
    width: "85%",
    borderRadius: 28,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default placeOrder;
