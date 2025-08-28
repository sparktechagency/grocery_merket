import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { useGetShopperNotificationsQuery } from "@/src/redux/apiSlices/shopperNotificationsSlices";

const ShopperNotification = () => {
  const { data: shopperNotificationData, isLoading } =
    useGetShopperNotificationsQuery({});

  const headerComponent = () => (
    <BackWithComponent onPress={() => router.back()} title="Notifications" />
  );

  const renderItem = ({ item }) => {
    // -------------- time and date --------------
    const timestamp = item?.created_at;
    const dateObject = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = dateObject.toLocaleDateString("en-US", options);
    return (
      <View
        style={tw`flex-row p-3 w-[99%]  rounded-lg bg-[#e6e8eb] items-center gap-3`}
      >
        <View
          style={tw`w-14 h-14 justify-center items-center border-2 border-white rounded-full`}
        >
          <Image
            style={tw`w-10 h-10 `}
            source={{ uri: shopperNotificationData?.icon }}
            resizeMode="center"
          />
        </View>
        <View>
          <Text style={tw`flex-1 font-PoppinsSemiBold text-sm text-black `}>
            {item?.title}
          </Text>
          <View style={tw`w-[95%]  overflow-hidden pr-6`}>
            <Text
              numberOfLines={2}
              style={tw`flex-1 font-PoppinsRegular text-sm text-regularText `}
            >
              {item?.message}
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-2 `}>
            <Text style={tw`font-PoppinsRegular text-sm text-black`}>
              {formattedDate}
            </Text>
            <Text style={tw`font-PoppinsRegular text-sm text-black`}>
              {dateObject.toLocaleTimeString("en-US")}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={headerComponent}
      contentContainerStyle={tw`gap-2 px-5`}
      data={shopperNotificationData?.notifications}
      renderItem={renderItem}
      keyExtractor={(item) => item?.id.toString()}
      ListEmptyComponent={
        isLoading ? (
          <View style={tw`justify-center items-center`}>
            <ActivityIndicator size="large" color={tw.color("red-500")} />
          </View>
        ) : (
          <Text style={tw`text-center mt-4 text-gray-500`}>
            No Order products.
          </Text>
        )
      }
    />
  );
};

export default ShopperNotification;
