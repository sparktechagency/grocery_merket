import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router, useLocalSearchParams } from "expo-router";
import { SvgXml } from "react-native-svg";
import {
  IconLocationWhite,
  IconRightArrowShopper,
  IconRightArrowShopperDown,
} from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import Collapsible from "react-native-collapsible";
import TButton from "@/src/lib/buttons/TButton";
import { useGetPendingOrderDetailsQuery } from "@/src/redux/apiSlices/shopperHomeApiSlices";

const pickUp = () => {
  const { orderId } = useLocalSearchParams();
  const [viewOrderDetails, setViewOrderDetails] = React.useState(true);

  // ====================== api ======================
  const { data: pendingOrderDetails, isLoading } =
    useGetPendingOrderDetailsQuery(Number(orderId));

  return (
    <ScrollView>
      <BackWithComponent onPress={() => router.back()} title={"Pick-Up"} />
      <View style={tw`px-5`}>
        <View style={tw`p-4 rounded-md bg-[#e3e7eb]`}>
          <View style={tw`flex-row gap-1  items-center`}>
            <Text style={tw`font-PoppinsRegular text-base text-black mb-1`}>
              Store name:
            </Text>
            <Text style={tw`font-PoppinsMedium text-xs `}>
              {pendingOrderDetails?.data?.nearest_store?.name}
            </Text>
          </View>
          <View style={tw`flex-row gap-1`}>
            <SvgXml xml={IconLocationWhite} />
            <Text style={tw`font-PoppinsMedium text-base text-regularText`}>
              {pendingOrderDetails?.data?.nearest_store?.address?.addressLine1}
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
              <Text style={tw`font-PoppinsMedium text-base`}>
                # {pendingOrderDetails?.data?.order_id}
              </Text>
            </View>

            <View style={tw`flex-row gap-1 items-center`}>
              <Text
                style={tw`font-PoppinsRegular text-base text-regularText mb-1`}
              >
                Customer name:
              </Text>
              <Text style={tw`font-PoppinsMedium text-base`}>
                {pendingOrderDetails?.data?.customer?.name}
              </Text>
            </View>

            <View style={tw`flex-row gap-1 items-center`}>
              <Text
                style={tw`font-PoppinsRegular text-base text-regularText mb-1`}
              >
                Email:
              </Text>
              <Text style={tw`font-PoppinsMedium text-base`}>
                {pendingOrderDetails?.data?.customer?.email}
              </Text>
            </View>

            <View style={tw`flex-row gap-1 items-center`}>
              <Text
                style={tw`font-PoppinsRegular text-base text-regularText mb-1`}
              >
                Address:
              </Text>
              <Text style={tw`font-PoppinsMedium text-base`}>
                {pendingOrderDetails?.data?.customer?.address}
              </Text>
            </View>
            <View style={tw`flex-row gap-1 items-center`}>
              <Text
                style={tw`font-PoppinsRegular text-base text-regularText mb-1`}
              >
                Amount:
              </Text>
              <Text style={tw`font-PoppinsMedium text-base`}>
                $ {pendingOrderDetails?.data?.total_price}
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
                View order items {pendingOrderDetails?.data?.items?.length}
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
              {pendingOrderDetails?.data?.items?.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={tw`flex-row items-center px-2 py-1 rounded-xl bg-white mb-3 shadow-sm h-16`}
                >
                  <Image
                    source={{ uri: item?.product_image }}
                    style={tw`w-14 h-14 rounded-md`}
                    resizeMode="contain"
                  />
                  <View style={tw`ml-4`}>
                    <Text
                      numberOfLines={1}
                      style={tw`flex-1 font-PoppinsSemiBold text-sm text-black`}
                    >
                      {item?.product_name}
                    </Text>

                    <Text
                      style={tw`font-PoppinsSemiBold text-sm text-primary mt-1`}
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
                style={tw`font-PoppinsMedium px-1 py-0.5 rounded-md text-[#FF00EE] bg-[#FFE8FD] `}
              >
                Pending
              </Text>
            </View>
            <View style={tw`flex-row justify-start items-center gap-2`}>
              <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
                Payment:
              </Text>
              <Text
                style={tw`font-PoppinsMedium px-1 py-0.5 rounded-md text-primary bg-[#E8FFEE] `}
              >
                Online paid
              </Text>
            </View>
            <Text style={tw`border-b border-[#C8C8C8] w-full`}></Text>
            <View style={tw`rounded-full mt-3 h-12`}>
              <TButton
                // onPress={handleSubmit(onSubmit)}
                onPress={() =>
                  router.push({
                    pathname: "/shopper/deliveryOrder/mapArrived",
                    params: {
                      orderId: pendingOrderDetails?.data?.order_id,
                    },
                  })
                }
                title="Go to Store"
                containerStyle={tw`rounded-md bg-primaryShopper`}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default pickUp;
