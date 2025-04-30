import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { notificationData } from "./NotificationData";

const notification = () => {
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"Notification"} />
      <ScrollView style={tw`mx-5`} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={tw`flex justify-end items-end`}>
          <Text
            style={tw`underline text-regularText font-PoppinsRegular text-sm`}
          >
            Clear all
          </Text>
        </TouchableOpacity>

        <View style={tw`flex justify-center mb-3 gap-3`}>
          {notificationData.map((notification) => (
            <TouchableOpacity
              onPress={() =>
                notification.status === "arrived"
                  ? router.push("/user/notification/orderAccept")
                  : notification.status === "pickUp"
                  ? router.push("/user/shoppers/beforeChatShopper")
                  : // router.push("/")
                    null
              }
              key={notification.id}
              style={tw`flex-row justify-start items-center p-4   rounded-lg gap-5 ${
                notification.status === "arrived"
                  ? "bg-[#DEFFE7]"
                  : notification.status === "pickUp"
                  ? "bg-[#DEFFE7]"
                  : "bg-[#e6e8eb]"
              }`}
            >
              <Image
                style={tw`w-16 h-16 border-2 border-white rounded-full`}
                source={notification.image}
              />

              <View>
                <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
                  {notification.title}
                </Text>
                <Text
                  // numberOfLines={3}
                  style={tw`font-PoppinsRegular text-sm text-regularText`}
                >
                  {notification.description}
                </Text>
                <Text style={tw`font-PoppinsRegular text-base text-black`}>
                  {notification.time}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default notification;
