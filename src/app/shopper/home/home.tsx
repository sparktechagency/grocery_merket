import { View, Text, TouchableOpacity, Image, Switch } from "react-native";
import React from "react";
import { FlatList, Pressable } from "react-native-gesture-handler";
import { CartData } from "@/src/components/CardData";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import { SvgXml } from "react-native-svg";
import {
  IconAddToCat,
  IconArrowCorner,
  IconComparison,
  IconConnerArrowGreen,
  IconLocation,
  IconNotification,
  IconSettingsGreen,
} from "@/assets/icon";
import { ImgShopperShop } from "@/assets/images";
import { LinearGradient } from "expo-linear-gradient";

const ShopperHome = () => {
  const [notification, setNotification] = React.useState(false);

  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const headerComponent = () => (
    <View style={tw`px-5`}>
      <View style={tw` flex-row justify-between  my-5`}>
        <Pressable
          onPress={() => router.push("/shopper/profile/profileShopper")}
          style={tw`flex-row justify-center items-center gap-2`}
        >
          <SvgXml xml={IconLocation} />
          <View>
            <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
              Hello, Benjamin
            </Text>

            <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
              Kodiak Island
            </Text>
          </View>
        </Pressable>

        <View style={tw`flex-row items-center gap-3`}>
          <TouchableOpacity
            onPress={() => router.push("/user/priceComparison/priceComparison")}
            style={tw`relative p-3 bg-white shadow-lg rounded-lg`}
          >
            <SvgXml xml={IconSettingsGreen} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/user/notification/notification")}
            style={tw`relative p-3 bg-white shadow-lg rounded-lg`}
          >
            <SvgXml xml={IconNotification} />
            {notification ? (
              <Text
                style={tw`absolute top-0 right-0 px-1 bg-orange text-white rounded-full`}
              >
                2
              </Text>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>

      <LinearGradient
        colors={["#23AA49", "#63C37E"]}
        style={tw`py-7 px-3 flex-row justify-start items-center mb-4 rounded-xl gap-4`}
      >
        <Image source={ImgShopperShop} />
        <View>
          <Text style={tw`font-PoppinsSemiBold text-lg text-white`}>
            4 delivery orders found!
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/shopper/deliveryOrder/deliveryOrder")}
            style={tw`flex-row justify-center mt-3 items-center px-3  w-32 h-7 bg-white rounded-full gap-2`}
          >
            <Text style={tw`text-primary`}>View Details</Text>
            <SvgXml xml={IconConnerArrowGreen} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={tw`flex-row justify-between items-center`}>
        <View>
          <Text style={tw`font-PoppinsRegular text-base text-black`}>
            Status: Online
          </Text>
          <Text style={tw`text-regularText font-PoppinsRegular text-xs`}>
            Open to deliver any order.
          </Text>
        </View>
        <View>
          <Switch
            trackColor={{ false: "#767577", true: "#23AA49" }}
            thumbColor={isEnabled ? "#FFFFFF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            // style={{
            //   transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
            // }}
            value={isEnabled}
          />
        </View>
      </View>

      <View style={tw`my-3`}>
        <Text style={tw`font-PoppinsSemiBold text-base text-black my-4`}>
          Pending order
        </Text>
        {CartData?.map((item) => (
          <View
            style={tw`bg-gray-100 p-4 rounded-xl flex-row justify-between items-center shadow-md mb-4`}
          >
            <View style={tw`flex-1`}>
              <Text style={tw`text-black font-PoppinsSemiBold`}>
                Order id: <Text style={tw`font-PoppinsBold`}>#500</Text>
              </Text>
              <Text style={tw`text-regularText`}>
                Customer: <Text style={tw`text-black`}>Rich</Text>
              </Text>

              <Text
                style={tw`bg-[#FFE8FD] text-[#FF00EE] w-20 h-7 text-center px-3 py-1 mt-3 rounded-md text-xs font-PoppinsSemiBold`}
              >
                Pending
              </Text>
            </View>

            <View style={tw`items-end`}>
              <Text style={tw`text-primary font-PoppinsBold text-lg`}>
                $50.00
              </Text>
              <TouchableOpacity
                style={tw`mt-2 bg-primaryShopper px-4 py-1.5 rounded-lg`}
              >
                <Text style={tw`text-white font-PoppinsMedium text-sm`}>
                  View details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <Text style={tw`font-PoppinsSemiBold text-base text-black my-4`}>
        Recent orders
      </Text>
    </View>
  );

  const renderItem = () => (
    <View
      style={tw`bg-gray-100 p-4 rounded-xl flex-row justify-between items-center mx-5 shadow-md mb-4`}
    >
      <View style={tw`flex-1`}>
        <Text style={tw`text-black font-PoppinsSemiBold`}>
          Order id: <Text style={tw`font-PoppinsBold`}>#500</Text>
        </Text>
        <Text style={tw`text-regularText`}>
          Customer: <Text style={tw`text-black`}>Rich</Text>
        </Text>

        <Text
          style={tw`bg-green-100 text-primary w-20 h-7 text-center px-3 py-1 mt-3 rounded-md text-xs font-PoppinsSemiBold`}
        >
          Delivered
        </Text>
      </View>

      <View style={tw`items-end`}>
        <Text style={tw`text-primary font-PoppinsBold text-lg`}>$50.00</Text>
        <TouchableOpacity
          style={tw`mt-2 bg-primaryShopper px-4 py-1.5 rounded-lg`}
        >
          <Text style={tw`text-white font-PoppinsMedium text-sm`}>
            View details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        ListHeaderComponent={headerComponent}
        data={CartData}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id.toLocaleString()}
      />
    </View>
  );
};

export default ShopperHome;
