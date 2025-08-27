import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { SvgXml } from "react-native-svg";
import {
  IconLocationWhite,
  IconRightArrowShopper,
  IconRightArrowShopperDown,
} from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import { CartData } from "@/src/components/CardData";
import Collapsible from "react-native-collapsible";
import TButton from "@/src/lib/buttons/TButton";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useGetRecentOrderDetailsQuery } from "@/src/redux/apiSlices/shopperHomeApiSlices";
import { PrimaryColor } from "@/utils/utils";

const OrderDeliverSuccess = () => {
  const { orderId } = useLocalSearchParams();
  const [viewOrderDetails, setViewOrderDetails] = React.useState(true);

  //   ============= api ========================
  const {
    data: orderDetails,
    error,
    isLoading,
  } = useGetRecentOrderDetailsQuery(Number(orderId));

  return (
    <ScrollView>
      <BackWithComponent onPress={() => router.back()} title={"Pick-Up"} />

      {isLoading ? (
        <ActivityIndicator size={"large"} color={PrimaryColor} />
      ) : (
        <View style={tw`px-5`}>
          <View style={tw`p-4 rounded-md bg-[#e3e7eb]`}>
            <View style={tw`flex-row gap-1 items-center `}>
              <Text style={tw`font-PoppinsRegular text-base text-black mb-1`}>
                Store:
              </Text>
              <Text style={tw`font-PoppinsMedium`}>
                {orderDetails?.data?.pick_up_location?.name || "Outer Store "}
              </Text>
            </View>
            <View style={tw`flex-row gap-1`}>
              <SvgXml xml={IconLocationWhite} />
              <Text style={tw`font-PoppinsMedium text-base text-regularText`}>
                {orderDetails?.data?.pick_up_location?.address?.addressLine1}
              </Text>
            </View>
          </View>
          {/* --------------- Order details -------------- */}
          <View style={tw`py-4 px-5 rounded-md bg-[#e3e7eb] mt-7 mb-3`}>
            <Text
              style={tw`font-PoppinsSemiBold text-lg text-black mb-4 mx-auto`}
            >
              Order Details
            </Text>
            <View>
              <View style={tw`flex-row gap-1 items-center`}>
                <Text
                  style={tw`font-PoppinsRegular text-base text-regularText mb-1`}
                >
                  Order id:
                </Text>
                <Text style={tw`font-PoppinsSemiBold`}>
                  # {orderDetails?.data?.order_id}
                </Text>
              </View>
              <View style={tw`flex-row gap-1 items-center`}>
                <Text
                  style={tw`font-PoppinsRegular text-base text-regularText mb-1`}
                >
                  Customer name:
                </Text>
                <Text style={tw`font-PoppinsSemiBold`}>
                  {orderDetails?.data?.customer?.name}
                </Text>
              </View>
              <View style={tw`flex-row gap-1 items-center`}>
                <Text
                  style={tw`font-PoppinsRegular text-base text-regularText mb-1`}
                >
                  Email:
                </Text>
                <Text style={tw`font-PoppinsSemiBold`}>
                  {orderDetails?.data?.customer?.email}
                </Text>
              </View>
              <View style={tw`flex-row gap-1 items-center`}>
                <Text
                  style={tw`font-PoppinsRegular text-base text-regularText mb-1`}
                >
                  Amount:
                </Text>
                <Text style={tw`font-PoppinsSemiBold`}>
                  $ {orderDetails?.data?.total_price}
                </Text>
              </View>
            </View>

            <View>
              <Text style={tw`border-b border-[#C8C8C8] w-full`}></Text>
              <TouchableOpacity
                onPress={() => setViewOrderDetails(!viewOrderDetails)}
                style={tw`flex-row justify-start items-center gap-2 my-2`}
              >
                <Text
                  style={tw`font-PoppinsMedium text-primaryShopper text-base `}
                >
                  View order items {orderDetails?.data?.items?.length}
                </Text>
                <SvgXml
                  xml={
                    viewOrderDetails
                      ? IconRightArrowShopper
                      : IconRightArrowShopperDown
                  }
                />
              </TouchableOpacity>

              <Collapsible collapsed={viewOrderDetails}>
                {orderDetails?.data?.items?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={tw`flex-row items-center p-2 rounded-xl bg-white mb-3 shadow-sm`}
                  >
                    <Image
                      source={{ uri: item?.product_image }}
                      style={tw`w-14 h-14 rounded-md`}
                      resizeMode="contain"
                    />
                    <View style={tw`ml-4`}>
                      <Text
                        numberOfLines={2}
                        style={tw`flex-1 font-PoppinsRegular text-sm text-black pr-3`}
                      >
                        {item?.product_name}
                      </Text>
                      <Text
                        style={tw`font-PoppinsSemiBold text-sm text-primary `}
                      >
                        ${item?.unit_price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </Collapsible>

              <Text style={tw`border-b border-[#C8C8C8] w-full`}></Text>

              <View style={tw`flex-row justify-start items-center gap-2`}>
                <Text
                  style={tw`font-PoppinsRegular text-base text-regularText my-3.5`}
                >
                  Order status:
                </Text>
                <Text
                  style={[
                    tw`font-PoppinsMedium px-1 py-0.5 rounded-md`,
                    orderDetails?.data?.payment?.payment_status === "pending"
                      ? tw`text-[#FF00EE] bg-[#FFE8FD]`
                      : null,
                    orderDetails?.data?.payment?.payment_status === "delivered"
                      ? tw`text-primary bg-[#E8FFEE]`
                      : null,
                  ]}
                >
                  {orderDetails?.data?.payment?.payment_status}
                </Text>
              </View>
              <View style={tw`flex-row justify-start items-center gap-2`}>
                <Text
                  style={tw`font-PoppinsRegular text-base text-regularText`}
                >
                  Payment:
                </Text>
                <Text
                  style={tw`font-PoppinsMedium px-1 py-0.5 rounded-md text-primary bg-[#E8FFEE] `}
                >
                  {orderDetails?.data?.payment?.payment_method}
                </Text>
              </View>
              <Text style={tw`border-b border-[#C8C8C8] w-full`}></Text>
              <View style={tw`rounded-full mt-3 h-12`}>
                <TButton
                  // onPress={handleSubmit(onSubmit)}
                  onPress={() => router.push("/shopper/home/home")}
                  title="Go Back Home"
                  containerStyle={tw`rounded-md bg-primaryShopper`}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default OrderDeliverSuccess;
