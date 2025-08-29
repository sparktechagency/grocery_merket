import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { useGetAboutUsQuery } from "@/src/redux/apiSlices/homePageApiSlices";
import { PrimaryColor } from "@/utils/utils";

const aboutApp = () => {
  // ======================= api ==========================
  const { data, isLoading } = useGetAboutUsQuery({});
  return (
    <View style={tw`flex-1 bg-base`}>
      {isLoading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size={"large"} color={PrimaryColor} />
        </View>
      ) : (
        <View style={tw`flex-1`}>
          <BackWithComponent
            onPress={() => router.back()}
            title={"About App"}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={tw`p-5 bg-white`}
          >
            <Text>{data?.data?.content}</Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default aboutApp;
