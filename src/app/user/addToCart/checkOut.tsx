import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { Link, router } from "expo-router";

import { SvgXml } from "react-native-svg";
import {
  IconCheckout,
  IconLeftLineArrow,
  IconPayment,
  IconPlaceOrder,
} from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import TButton from "@/src/lib/buttons/TButton";
import { useGetCartQuery } from "@/src/redux/apiSlices/cartSlices";
import { Image } from "expo-image";
import { useGetProfileQuery } from "@/src/redux/apiSlices/profileSlieces";
import OrderBill from "@/src/components/OrderBill";

const checkOut = () => {
  // ---------------------------- all apis ----------------------------------
  const { data: getCartData } = useGetCartQuery({});
  const { data: getProfileInfo } = useGetProfileQuery({});

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"Checkout"} />

      <ScrollView>
        {/* ------------------- Steps ---------------- */}
        <View style={tw`mx-5`}>
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
              <View
                style={tw`w-14 h-14 rounded-full border-2 border-primary justify-center items-center`}
              >
                <SvgXml xml={IconPlaceOrder} width={24} height={24} />
              </View>
              <Text style={tw`text-center text-black mt-2`}>Place order</Text>
            </View>
          </View>
        </View>

        <View style={tw`mx-5 mt-3`}>
          <View style={tw`mt-4`}>
            {getCartData?.cart?.map((data) => (
              <Pressable
                key={data?.id}
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

                    <Text
                      style={tw`font-PoppinsRegular text-sm text-regularText`}
                    >
                      {data?.size}
                    </Text>
                    {data?.promo_price !== "0" ? (
                      <View>
                        <View style={tw`flex-row items-center gap-1`}>
                          <Text
                            style={tw`font-PoppinsSemiBold text-sm text-primary`}
                          >
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
                        <Text
                          style={tw`font-PoppinsSemiBold text-sm text-primary`}
                        >
                          $ {data?.regular_price}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* =================== quantity counter =================== */}
              </Pressable>
            ))}
          </View>

          <View style={tw`w-full bg-[#e7e9eb]  rounded-xl mt-2`}>
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
                {getProfileInfo?.data?.name}
              </Text>
              <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
                {getProfileInfo?.data?.address}
              </Text>

              <Text style={tw`font-PoppinsRegular text-base text-black mb-2`}>
                Mobile:{" "}
                <Text
                  style={tw`font-PoppinsRegular text-base text-regularText`}
                >
                  {getProfileInfo?.data?.phone}
                </Text>
              </Text>
            </View>
          </View>

          {/* ----=============================== order bill info ===================== */}
          <OrderBill
            headerTitle={"Order Bill"}
            totalItems={getCartData?.total_products}
            subTotal={getCartData?.total_price}
            deliveryCharge={0}
            tax={0}
            total={getCartData?.total_price}
          />

          <View style={tw`rounded-full my-4`}>
            <TButton
              onPress={() =>
                router.push({
                  pathname: "/user/paymentSystem/placeOrder",
                  // pathname: "/user/paymentSystem/payment",
                  params: {
                    userInfo: JSON.stringify(getProfileInfo?.data),
                    cartInfo: JSON.stringify(getCartData),
                  },
                })
              }
              title="Next"
              containerStyle={tw`rounded-full `}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default checkOut;
