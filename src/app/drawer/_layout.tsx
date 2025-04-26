import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import Drawer from "expo-router/drawer";
import { Base } from "@/utils/utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";
import tw from "@/src/lib/tailwind";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { SvgXml } from "react-native-svg";
import { IconCross } from "@/assets/icon";
import { Checkbox, Slider } from "react-native-ui-lib";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const [sliderState, setSliderState] = React.useState<number>(0);
  const insets = useSafeAreaInsets();
  const stores = ["Abc 1", "Mackdonalds", "Starbucks", "Abc 2"];
  const [selectedStores, setSelectedStores] = React.useState(false);

  const toggleCheckbox = (store: string) => {
    setSelectedStores((prev: any) => ({
      ...prev,
      [store]: !prev[store],
    }));
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={tw`flex-1 pb-[${insets.bottom}px]`}
    >
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`font-PoppinsMedium text-lg text-black`}>
          Price Range
        </Text>
        <Pressable
          onPress={() => props?.navigation?.closeDrawer()}
          style={tw`p-3 bg-[#F0F0F0] rounded-full`}
        >
          <SvgXml xml={IconCross} />
        </Pressable>
      </View>

      <Slider
        containerStyle={tw`w-72 text-center mx-auto`}
        value={sliderState}
        onValueChange={(value) => setSliderState(value)}
        minimumValue={0}
        maximumValue={500}
        step={75}
        thumbTintColor="#00AF91"
        minimumTrackTintColor="#00332E"
        maximumTrackTintColor="#00332E"
      />
      <View style={tw`flex-row justify-between items-center px-6 mt-4`}>
        <Text style={tw`font-PoppinsMedium text-base text-black`}>
          ${sliderState}
        </Text>
        <Text style={tw`font-PoppinsMedium text-base text-black`}>$500</Text>
      </View>

      <View style={tw`p-4`}>
        <Text style={tw`font-PoppinsSemiBold text-xl mb-4`}>Stores</Text>

        <View style={tw`flex-row flex-wrap justify-between`}>
          {stores.map((store, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleCheckbox(store)}
              style={tw`flex-row items-center mb-4 w-[48%]`}
            >
              <Checkbox
                size={18}
                color="black"
                // label="Both"
                labelStyle={tw`font-PoppinsBold text-base text-[#262626]`}
                value={!!selectedStores[store]}
                onValueChange={() => toggleCheckbox(store)}
              />

              <Text style={tw`text-base text-black font-PoppinsRegular`}>
                {store}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default function _layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerPosition: "right",
          swipeEnabled: false,
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        {/* <Drawer.Screen name="" /> */}
      </Drawer>
      <StatusBar backgroundColor={Base} animated barStyle={"dark-content"} />
    </GestureHandlerRootView>
  );
}
