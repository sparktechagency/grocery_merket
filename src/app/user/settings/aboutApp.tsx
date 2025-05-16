import { View, Text, ScrollView } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";

const aboutApp = () => {
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"About App"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={tw`p-5 bg-white`}
      >
        <Text style={tw`text-base text-black font-bold mb-4`}>
          Welcome to grocery app, your ultimate solution for a seamless grocery
          shopping experience.
        </Text>

        <Text style={tw`text-base text-gray-700 mb-3`}>
          Designed to simplify your daily needs, our app connects you with a
          wide variety of fresh, high-quality grocery items at the best prices.
        </Text>

        <Text style={tw`text-base text-black font-bold mb-2`}>
          With Grocery, you can:
        </Text>

        <View style={tw`mb-4`}>
          <Text style={tw`text-base text-gray-800 mb-2`}>
            • <Text style={tw`font-bold`}>Shop Conveniently:</Text> Browse
            through an extensive catalog of fruits, vegetables, pantry staples,
            dairy products, and more, all from the comfort of your home.
          </Text>

          <Text style={tw`text-base text-gray-800 mb-2`}>
            • <Text style={tw`font-bold`}>Save Time:</Text> Skip the lines and
            heavy bags—order in just a few taps and get your groceries delivered
            straight to your doorstep.
          </Text>

          <Text style={tw`text-base text-gray-800 mb-2`}>
            • <Text style={tw`font-bold`}>Enjoy Great Deals:</Text> Take
            advantage of exclusive discounts, offers, and rewards to save more
            on every purchase.
          </Text>

          <Text style={tw`text-base text-gray-800`}>
            • <Text style={tw`font-bold`}>Stay Updated:</Text> Keep track of
            your orders and get notified about new arrivals, seasonal items, and
            special promotions.
          </Text>
        </View>

        <Text style={tw`text-base text-gray-700 mb-3`}>
          Whether you're stocking up for the week or just grabbing a few
          essentials, Grocery app is here to make your grocery shopping fast,
          easy, and stress-free.
        </Text>

        <Text style={tw`text-base text-gray-700`}>
          Start shopping smarter today—download Grocery app and experience the
          convenience for yourself!
        </Text>
      </ScrollView>
    </View>
  );
};

export default aboutApp;
