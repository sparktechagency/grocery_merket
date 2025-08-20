import { View, Text, Image } from "react-native";
import React from "react";
import tw from "@/src/lib/tailwind";
import { ImgChatProfile, ImgNoShopper } from "@/assets/images";
import { SvgXml } from "react-native-svg";
import { IconLocationWhite } from "@/assets/icon";
import IwtButton from "@/src/lib/buttons/IwtButton";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import {
  useGetPersonalShopperQuery,
  useRemoveShopperMutation,
} from "@/src/redux/apiSlices/profileSlieces";

const myShoppers = () => {
  // ------------------ all apis ------------------
  const { data: myShopperData } = useGetPersonalShopperQuery({});
  const [deleteShopper] = useRemoveShopperMutation();

  const handleRemoveShopper = async () => {
    try {
      const response = await deleteShopper().unwrap();
      if (response) {
        router.push({
          pathname: "/Toaster",
          params: { res: response?.message },
        });
      }
    } catch (error) {
      console.log(error, "remove Shopper not success .");
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={"My Shopper"}
        containerStyle={tw`shadow-md`}
      />

      {myShopperData && myShopperData?.shopper ? (
        <View style={tw`bg-[#F3F5F7] rounded-2xl p-4 my-3 mx-5`}>
          <View style={tw`flex-row items-center gap-3 mb-5`}>
            <Image style={tw`w-20 h-20 rounded-full`} source={ImgChatProfile} />
            <View>
              <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
                {myShopperData?.shopper?.name}
              </Text>
              <View style={tw`flex-row gap-1`}>
                <SvgXml xml={IconLocationWhite} />
                <Text style={tw`font-PoppinsMedium text-sm text-regularText `}>
                  {myShopperData?.shopper?.address
                    ? myShopperData?.shopper?.address
                    : "No Address"}
                </Text>
              </View>
              <Text style={tw`font-PoppinsRegular text-base text-black`}>
                {myShopperData?.shopper?.phone
                  ? myShopperData?.shopper?.phone
                  : "No Phone"}
              </Text>
              <Text style={tw`font-PoppinsSemiBold text-base text-primary`}>
                {myShopperData?.shopper?.total_delivery} total deliveries
              </Text>
            </View>
          </View>
          <View>
            <IwtButton
              containerStyle={tw`bg-red-700`}
              titleStyle={tw`text-white`}
              // onPress={() => router.push("/user/messaging/messaging")}
              onPress={() => handleRemoveShopper()}
              title="Remove Personal Shopper"
            />
          </View>
        </View>
      ) : (
        <View style={tw` items-center px-5 `}>
          <Image style={tw`mb-8`} source={ImgNoShopper} />
          <Text style={tw`font-PoppinsMedium text-base text-black mb-4`}>
            You have no personal shopper right now
          </Text>
          <View style={tw`w-full`}>
            <IwtButton
              // onPress={() => router.push("/user/messaging/messaging")}
              onPress={() => router.push("/user/shoppers/allShopper")}
              title="Make One"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default myShoppers;
