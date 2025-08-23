import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { useGetNotificationsQuery } from "@/src/redux/apiSlices/notificationSlices";
import { PrimaryColor } from "@/utils/utils";

const notification = () => {
  // ------------------ all apis ------------------
  const { data, isLoading: isLoadingNotification } = useGetNotificationsQuery(
    {}
  );

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"Notification"} />
      <ScrollView style={tw`mx-5`} showsVerticalScrollIndicator={false}>
        <View style={tw`gap-3`}>
          {isLoadingNotification ? (
            <ActivityIndicator size={"large"} color={PrimaryColor} />
          ) : data?.notifications.length === 0 ? (
            <View style={tw`flex-row justify-center items-center`}>
              <Text style={tw`font-PoppinsRegular text-lg text-regularText `}>
                No Notification
              </Text>
            </View>
          ) : (
            data?.notifications.map((notification) => {
              // -------------- time and date --------------
              const timestamp = notification?.created_at;
              const dateObject = new Date(timestamp);
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              const formattedDate = dateObject.toLocaleDateString(
                "en-US",
                options
              );

              return (
                <TouchableOpacity
                  onPress={() =>
                    notification.type === "arrived"
                      ? router.push({
                          pathname: "/user/notification/orderAccept",
                          params: { shopperId: notification?.shopper_id },
                        })
                      : notification.type === "order pickedup"
                      ? router.push({
                          pathname: "/user/shoppers/beforeChatShopper",
                          params: { shopperId: notification?.shopper_id },
                        })
                      : null
                  }
                  key={notification.id}
                  style={tw`flex-row p-3 w-[99%] gap-2 rounded-lg ${
                    notification.type === "arrived"
                      ? "bg-[#DEFFE7]"
                      : notification.type === "order pickedup"
                      ? "bg-[#DEFFE7]"
                      : "bg-[#e6e8eb]"
                  }`}
                >
                  <View
                    style={tw`w-14 h-14 justify-center items-center border-2 border-white rounded-full`}
                  >
                    <Image
                      style={tw`w-10 h-10 `}
                      source={{ uri: data?.icon }}
                      resizeMode="center"
                    />
                  </View>

                  <View>
                    <Text
                      style={tw`flex-1 font-PoppinsSemiBold text-sm text-black `}
                    >
                      {notification?.title}
                    </Text>
                    <View style={tw`w-[95%]  overflow-hidden pr-6`}>
                      <Text
                        numberOfLines={2}
                        style={tw`flex-1 font-PoppinsRegular text-sm text-regularText `}
                      >
                        {notification?.message}
                      </Text>
                    </View>
                    <View style={tw`flex-row items-center gap-2`}>
                      <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                        {formattedDate}
                      </Text>

                      <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                        {dateObject.toLocaleTimeString("en-US")}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default notification;
