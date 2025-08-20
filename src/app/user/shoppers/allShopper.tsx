import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { ImgChatProfile } from "@/assets/images";
import { SvgXml } from "react-native-svg";
import { IconLocationWhite } from "@/assets/icon";
import IwtButton from "@/src/lib/buttons/IwtButton";
import { FlatList } from "react-native-gesture-handler";
import {
  useGetAllShopperQuery,
  useGetPersonalShopperQuery,
  useMakeShopperMutation,
} from "@/src/redux/apiSlices/profileSlieces";

const allShopper = () => {
  // ===================================== all apis =====================================
  const { data: allShopperData, isLoading } = useGetAllShopperQuery({});
  const [makeShopper, { isLoading: isAdding }] = useMakeShopperMutation();
  const { data: myShopperData } = useGetPersonalShopperQuery({});

  // ============= handle make Shopper  -====================================

  const handleMakeShopper = async (id) => {
    try {
      const response = await makeShopper(id).unwrap();
      if (response?.status) {
        router.push({
          pathname: "/Toaster",
          params: { res: response?.message },
        });
      }
    } catch (error) {
      console.log(error, "make Shopper not success .");
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={tw`bg-[#F3F5F7] rounded-2xl p-4 my-3 mx-5`}>
        <View style={tw`flex-row items-center gap-3 mb-5`}>
          <Image style={tw`w-20 h-20 rounded-full`} source={ImgChatProfile} />
          <View>
            <Text
              numberOfLines={1}
              style={tw`flex-1 font-PoppinsSemiBold text-base text-black`}
            >
              {item?.name}
            </Text>
            <View style={tw`flex-row gap-1`}>
              <SvgXml xml={IconLocationWhite} />
              <Text
                numberOfLines={1}
                style={tw`flex-1 font-PoppinsMedium text-sm text-regularText `}
              >
                {item?.address ? item?.address : "No Address"}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={tw`flex-1 font-PoppinsRegular text-base text-black`}
            >
              {item?.phone ? item?.phone : "No Phone"}
            </Text>
            <Text style={tw`font-PoppinsSemiBold text-base text-primary`}>
              {item?.total_delivery} total deliveries
            </Text>
          </View>
        </View>
        <View>
          <IwtButton
            onPress={() => handleMakeShopper(item?.id)}
            containerStyle={[
              tw`myShopperData?.shopper?.id === item?.id ? 'bg-red-700' : 'bg-primary'`,
            ]}
            title={
              myShopperData?.shopper?.id === item?.id
                ? "Remove Shopper"
                : "Make Personal Shopper"
            }
          />
        </View>
      </View>
    );
  };
  return (
    <View>
      <BackWithComponent onPress={() => router.back()} title={"My Shopper"} />

      <View>
        <FlatList
          data={allShopperData?.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toLocaleString()}
          contentContainerStyle={tw`pb-36`}
          ListEmptyComponent={() =>
            isLoading ? (
              <View style={tw`justify-center items-center`}>
                <ActivityIndicator size="large" color={tw.color("red-500")} />
              </View>
            ) : (
              <View style={tw`flex-1 items-center justify-center pt-10`}>
                <Text style={tw`font-PoppinsSemiBold text-lg text-gray-600 `}>
                  No Shopper Found
                </Text>
              </View>
            )
          }
        />
      </View>
    </View>
  );
};

export default allShopper;
