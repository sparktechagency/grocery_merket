import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import BackButton from "@/src/lib/backHeader/BackButton";
import { SvgXml } from "react-native-svg";
import { IconLocationWhite } from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import IwtButton from "@/src/lib/buttons/IwtButton";
import { router, useLocalSearchParams } from "expo-router";
import { useGetShopperDetailsQuery } from "@/src/redux/apiSlices/profileSlieces";

const beforeChatShopper = () => {
  const { shopperId } = useLocalSearchParams();

  // -=========================== apis  ===============================
  const { data, isLoading } = useGetShopperDetailsQuery(shopperId);

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton
        containerStyle={tw`shadow-lg`}
        onPress={() => router.back()}
      />

      {isLoading ? (
        <ActivityIndicator size={"large"} color={"PrimaryColor"} />
      ) : (
        <View style={tw`bg-[#F3F5F7] rounded-2xl p-4 mx-5`}>
          <View style={tw`flex-row items-center gap-3 mb-5`}>
            <Image
              style={tw`w-20 h-20 rounded-full`}
              source={{ uri: data?.data?.photo }}
              resizeMode="contain"
            />
            <View>
              <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
                {data?.data?.name}
              </Text>
              {data?.data?.address ? (
                <View style={tw` flex-row gap-1`}>
                  <SvgXml xml={IconLocationWhite} />
                  <Text
                    numberOfLines={1}
                    style={tw`flex-1 font-PoppinsMedium text-sm text-regularText `}
                  >
                    {data?.data?.address}
                  </Text>
                </View>
              ) : (
                <Text style={tw`font-PoppinsMedium text-sm text-regularText `}>
                  No address found
                </Text>
              )}

              <Text style={tw`font-PoppinsRegular text-base text-black`}>
                {data?.data?.phone}
              </Text>
              <Text style={tw`font-PoppinsSemiBold text-base text-primary`}>
                {data?.data?.total_delivery} total deliveries
              </Text>
            </View>
          </View>
          <View>
            <IwtButton
              onPress={() =>
                router.push({
                  pathname: "/user/messaging/messaging",
                  params: { shopperId: shopperId },
                })
              }
              title="Chat with shopper"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default beforeChatShopper;
