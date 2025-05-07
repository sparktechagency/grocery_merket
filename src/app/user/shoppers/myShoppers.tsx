import { View, Text, Image } from "react-native";
import React from "react";
import tw from "@/src/lib/tailwind";
import { ImgChatProfile, ImgNoShopper } from "@/assets/images";
import { SvgXml } from "react-native-svg";
import { IconLocationWhite } from "@/assets/icon";
import IwtButton from "@/src/lib/buttons/IwtButton";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { FlatList } from "react-native-gesture-handler";

const myShoppers = () => {
  const [isShopper, setIsShopper] = React.useState(true);

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
              textBody: "Shopper Added Success",
            })
          }
          title="Remove Personal Shopper"
        />
      </View>
    </View>
  );

  return (
    <AlertNotificationRoot>
      <View style={tw`flex-1 bg-white`}>
        <BackWithComponent onPress={() => router.back()} title={"My Shopper"} />

        {isShopper ? (
          <View>
            <FlatList
              contentContainerStyle={tw`pb-24`}
              data={shopperData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toLocaleString()}
            />
          </View>
        ) : (
          <View style={tw`px-5 items-center  my-auto`}>
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
    </AlertNotificationRoot>
  );
};

export default myShoppers;
