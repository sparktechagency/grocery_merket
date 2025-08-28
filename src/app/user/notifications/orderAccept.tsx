import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { use, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import tw from "@/src/lib/tailwind";
import {
  ImgOrderFour,
  ImgOrderOne,
  ImgOrderThree,
  ImgOrderTwo,
} from "@/assets/images";
import TButton from "@/src/lib/buttons/TButton";
import { usePickedUpItemsMutation } from "@/src/redux/apiSlices/homePageApiSlices";
import { PrimaryColor } from "@/utils/utils";
import { useUpdateOrderMutation } from "@/src/redux/apiSlices/orderSlices";

const orderData = [
  {
    id: 1,
    image: ImgOrderOne,
    name: "Fresh Apple",
    weight: "1 kg",
  },
  {
    id: 2,
    image: ImgOrderTwo,
    name: "Fresh Carrot",
    weight: "1 kg",
  },
  {
    id: 3,
    image: ImgOrderThree,
    name: "Broccoli",
    weight: "1 kg",
  },
  {
    id: 4,
    image: ImgOrderFour,
    name: "Red paper",
    weight: "1 kg",
  },
];

const OrderAccept = () => {
  const { orderId } = useLocalSearchParams();
  const [orderItems, setOrderItems] = React.useState([]);

  // ===================== api j=-===================
  const [requestedData, { isLoading }] = usePickedUpItemsMutation();
  const [orderStatus] = useUpdateOrderMutation();

  useEffect(() => {
    const readRequestedData = async () => {
      try {
        const response = await requestedData({ order_id: orderId }).unwrap();
        if (response) {
          setOrderItems(response);
        }
      } catch (error) {
        console.error(error, "this is error");
      }
    };
    readRequestedData();
  }, [requestedData, orderId]);

  // -------- render section --------
  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size={"large"} color={PrimaryColor} />
      </View>
    );
  }

  const HandleReceivedOrder = async () => {
    try {
      const response = await orderStatus({
        id: orderId,
        status: "order_delivered",
      }).unwrap();
      if (response?.success) {
        router.push({
          pathname: "/user/notifications/orderReceived",
        });
      }
    } catch (error) {
      console.error(error, "this is error");
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"Notification"} />
      <ScrollView>
        <View style={tw`flex-row flex-wrap justify-between mx-5 mt-10`}>
          {orderItems?.data?.map((order, index) => (
            <View
              key={index}
              style={tw`flex-row items-center gap-2 mb-4 bg-[#e8dcfa] h-20 px-5 py-4 w-[48%] rounded-2xl`}
            >
              <Image
                style={tw`w-14 h-14`}
                source={{ uri: order.product_image }}
                resizeMode="contain"
              />
              <View>
                <Text style={tw`font-PoppinsSemiBold text-base`}>
                  {order.product_name.slice(0, 10)}
                </Text>

                <View style={tw`flex-row items-center gap-2`}>
                  <Text style={tw`font-PoppinsRegular text-sm`}>Quantity:</Text>
                  <Text
                    style={tw`font-PoppinsSemiBold text-sm
                    `}
                  >
                    {order.quantity}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={tw`px-5 mt-12`}>
          <Text
            style={tw`font-PoppinsSemiBold text-base text-[#5802D0] w-full text-center mx-auto px-16 mb-8`}
          >
            Your order has arrived. Please receive your order.
          </Text>
          <TButton
            // onPress={handleSubmit(onSubmit)}
            onPress={() => HandleReceivedOrder()}
            title="Receive order"
            containerStyle={tw`rounded-full bg-[#5802D0]`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderAccept;
