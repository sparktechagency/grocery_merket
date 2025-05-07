import { View, Text, Image } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { ImgChatProfile } from "@/assets/images";
import { SvgXml } from "react-native-svg";
import { IconLocationWhite } from "@/assets/icon";
import IwtButton from "@/src/lib/buttons/IwtButton";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { FlatList } from "react-native-gesture-handler";

const allShopper = () => {
  const shopperData = [
    {
      id: 1,
      name: "a",
    },
    {
      id: 2,
      name: "s",
    },
    {
      id: 3,
      name: "d",
    },
    {
      id: 4,
      name: "f",
    },
    {
      id: 5,
      name: "a",
    },
    {
      id: 6,
      name: "s",
    },
  ];

  const renderItem = () => (
    <View style={tw`bg-[#F3F5F7] rounded-2xl p-4 my-3 mx-5`}>
      <View style={tw`flex-row items-center gap-3 mb-5`}>
        <Image style={tw`w-20 h-20 rounded-full`} source={ImgChatProfile} />
        <View>
          <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
            Theresa Webb
          </Text>
          <View style={tw`flex-row gap-1`}>
            <SvgXml xml={IconLocationWhite} />
            <Text style={tw`font-PoppinsMedium text-sm text-regularText `}>
              Road no. 10, Block C, Dhaka
            </Text>
          </View>
          <Text style={tw`font-PoppinsRegular text-base text-black`}>
            (505) 555-0125
          </Text>
          <Text style={tw`font-PoppinsSemiBold text-base text-primary`}>
            200 total deliveries
          </Text>
        </View>
      </View>
      <View>
        <IwtButton
          // onPress={() => router.push("/user/messaging/messaging")}
          onPress={() =>
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Success",
              textBody: "Remove Success",
            })
          }
          title="Remove Personal Shopper"
        />
      </View>
    </View>
  );

  return (
    <AlertNotificationRoot>
      <View>
        <BackWithComponent onPress={() => router.back()} title={"My Shopper"} />

        <View>
          <FlatList
            data={shopperData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toLocaleString()}
            contentContainerStyle={tw`pb-36`}
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default allShopper;
