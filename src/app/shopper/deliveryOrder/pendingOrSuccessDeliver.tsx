import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import React from "react";
import BackButton from "@/src/lib/backHeader/BackButton";
import tw from "@/src/lib/tailwind";
import { ImgShopperDeliverSuccess, ImgSuccessDelivery } from "@/assets/images";
import TButton from "@/src/lib/buttons/TButton";
import { router, useLocalSearchParams } from "expo-router";
import { useGetTruckOrdersQuery } from "@/src/redux/apiSlices/orderSlices";
import { PrimaryColor } from "@/utils/utils";

const pendingOrSuccessDeliver = () => {
  const { orderId } = useLocalSearchParams();
  const [isDelivery, setIsDelivery] = React.useState(false);

  // ====================== api ======================
  const { data: truckOrderDetails, isLoading } = useGetTruckOrdersQuery({});

  const handleRefreshOrderStatus = () => {
    try {
      const response = truckOrderDetails({ orderId });
      if (response?.success) {
        setIsDelivery(true);
      }
    } catch (error) {
      console.log(error, "this is error");
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };

  React.useEffect(() => {
    handleRefreshOrderStatus();
  }, [truckOrderDetails]);

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size={"large"} color={PrimaryColor} />
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <BackButton />
      {isDelivery ? (
        <View style={tw`flex-1  justify-between items-center`}>
          <View style={tw`flex-1 px-10 justify-center items-center`}>
            <Image
              style={tw`h-24 aspect-square`}
              source={ImgShopperDeliverSuccess}
            />
            <View>
              <Text
                style={tw`font-PoppinsSemiBold text-lg text-primaryShopper mx-auto`}
              >
                Waiting for customer confirmation
              </Text>
              <Text
                style={tw`font-PoppinsRegular text-sm text-regularText mx-auto`}
              >
                Lorem ipsum dolor sit amet consectetur. Fames eu tellus mauris
                facilisi tellus urna.
              </Text>
              <Pressable>
                <Text
                  style={tw`font-PoppinsBold text-lg text-primaryShopper mx-auto underline`}
                >
                  Go Home
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={tw`w-full rounded-full mt-3 px-5 h-12 mb-5`}>
            <TButton
              onPress={() => handleRefreshOrderStatus()}
              title="Refresh again"
              containerStyle={tw`rounded-md w-full bg-primaryShopper`}
            />
          </View>
        </View>
      ) : (
        <View style={tw`flex-1 justify-between items-center`}>
          <View style={tw`flex-1 px-10 justify-center items-center`}>
            <Image style={tw`h-40 aspect-square`} source={ImgSuccessDelivery} />
            <View>
              <Text
                style={tw`font-PoppinsSemiBold text-lg text-primaryShopper mx-auto`}
              >
                Order delivered successfully
              </Text>
              <Text
                style={tw`font-PoppinsRegular text-sm text-regularText mx-auto`}
              >
                Lorem ipsum dolor sit amet consectetur. Fames eu tellus mauris
                facilisi tellus urna.
              </Text>
            </View>
          </View>

          <View style={tw`w-full  mt-3 px-5 mb-5`}>
            <Pressable
              onPress={() => router.push("/shopper/home/home")}
              style={tw`w-full my-3`}
            >
              <Text
                style={tw`font-PoppinsBlack text-lg text-regularText text-center`}
              >
                Back to Home
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default pendingOrSuccessDeliver;
