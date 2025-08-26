import { View, Text, TouchableOpacity, Image, Switch } from "react-native";
import React, { useEffect } from "react";
import { FlatList, Pressable } from "react-native-gesture-handler";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import { SvgXml } from "react-native-svg";
import {
  IconConnerArrowGreen,
  IconLocation,
  IconNotification,
  IconSettingsGreen,
} from "@/assets/icon";
import { ImgShopperShop } from "@/assets/images";
import { LinearGradient } from "expo-linear-gradient";
import { useGetProfileQuery } from "@/src/redux/apiSlices/profileSlieces";
import { useGetShopperNotificationsQuery } from "@/src/redux/apiSlices/shopperNotificationsSlices";
import {
  useGetPendingOrderQuery,
  useGetRecentOrderQuery,
} from "@/src/redux/apiSlices/shopperHomeApiSlices";
import OrderedCard from "@/src/components/OrderedCard";
import useLocation from "@/src/hook/useLocation";
import { useSetUserLocationMutation } from "@/src/redux/apiSlices/homePageApiSlices";

const ShopperHome = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const { longitude, latitude, errorMsg } = useLocation();

  //  -------------- api  ----------------
  const { data: getUserProfileData } = useGetProfileQuery({});
  const { data: notifications } = useGetShopperNotificationsQuery({});
  const { data: recentOrder } = useGetRecentOrderQuery({});
  const { data: getPendingOrder } = useGetPendingOrderQuery({});
  const [location] = useSetUserLocationMutation();

  const stgLongitude = longitude?.toString() ?? "";
  const stgLatitude = latitude?.toString() ?? "";

  useEffect(() => {
    const setLocation = async () => {
      if (!longitude || !latitude) return;
      try {
        await location({
          longitude: stgLongitude,
          latitude: stgLatitude,
        }).unwrap();
      } catch (error) {
        console.log(error, "set user location not match -------------------");
      }
    };
    setLocation();
  }, [longitude, latitude]);

  const headerComponent = () => (
    <View style={tw`flex-1 px-5`}>
      <View style={tw` flex-row justify-between  my-5`}>
        <Pressable
          onPress={() => router.push("/shopper/profile/profileShopper")}
          style={tw`flex-row justify-center items-center gap-2`}
        >
          <SvgXml xml={IconLocation} />
          <View>
            <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
              {getUserProfileData?.user?.name}
            </Text>
            <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
              {getUserProfileData?.user?.address
                ? getUserProfileData?.user?.address
                : "No Address"}
            </Text>
          </View>
        </Pressable>

        <View style={tw`flex-row items-center gap-3`}>
          <TouchableOpacity
            onPress={() => router.push("/shopper/settings/settings")}
            style={tw`relative p-3 bg-white shadow-lg rounded-lg`}
          >
            <SvgXml xml={IconSettingsGreen} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/user/notifications/notification")}
            style={tw`relative p-3 bg-white shadow-lg rounded-lg`}
          >
            <SvgXml xml={IconNotification} />
            {notifications?.notifications?.length > 0 ? (
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
          <Text style={tw`font-PoppinsMedium text-base text-white`}>
            {getPendingOrder?.data?.length || 0} delivery orders found!
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/shopper/deliveryOrder/pendingOrder")}
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

      <Text style={tw`font-PoppinsSemiBold text-base text-black my-4`}>
        Delivered orders
      </Text>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <OrderedCard
        key={item?.order_id}
        customerName={item?.user_name}
        orderStatus={"Delivered"}
        orderId={item?.order_id}
        totalPrice={item?.total_price}
        onPress={() => router.push("/shopper/deliveryOrder/pickUp")}
      />
    );
  };
  return (
    <View>
      <FlatList
        ListHeaderComponent={headerComponent}
        data={recentOrder?.data}
        renderItem={renderItem}
        keyExtractor={(item) => item?.order_id.toString()}
        ListEmptyComponent={() => (
          <View style={tw`my-3 justify-center items-center`}>
            <Text style={tw`font-PoppinsMedium text-regularText text-center`}>
              No Delivered Order
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ShopperHome;
