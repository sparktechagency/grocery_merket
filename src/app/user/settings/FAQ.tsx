import { ActivityIndicator, ScrollView, View } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { OnCollapsable } from "@/src/components/OnCollapsable";
import { useGetFAQQuery } from "@/src/redux/apiSlices/homePageApiSlices";
import { PrimaryColor } from "@/utils/utils";

const FAQ = () => {
  const { data, isLoading } = useGetFAQQuery({});

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1`}
    >
      <BackWithComponent onPress={() => router.back()} title={"FAQ"} />
      <View style={tw`mx-5`}>
        {isLoading ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size={"large"} color={PrimaryColor} />
          </View>
        ) : (
          data?.data?.map((item, index) => (
            <OnCollapsable
              answer={item?.answer}
              question={item?.question}
              key={item.id}
              index={index}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default FAQ;
