import { View, Text, StatusBar, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import Drawer from "expo-router/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "@/src/lib/tailwind";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { SvgXml } from "react-native-svg";
import { IconCross } from "@/assets/icon";
import { Checkbox, Slider } from "react-native-ui-lib";
import {
  ImgBread,
  ImgBurger,
  ImgDairy,
  ImgDrink,
  ImgFruit,
  ImgProtein,
  ImgSnack,
  ImgVegetable,
} from "@/assets/images";
import TButton from "@/src/lib/buttons/TButton";

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
  const categoryData = [
    {
      id: 1,
      title: "Fruits",
      icon: ImgFruit,
    },
    {
      id: 2,
      title: "Vegetables",
      icon: ImgVegetable,
    },
    {
      id: 3,
      title: "Drinks",
      icon: ImgDrink,
    },
    {
      id: 4,
      title: "Bakery ",
      icon: ImgBread,
    },
    {
      id: 5,
      title: "Snacks",
      icon: ImgSnack,
    },
    {
      id: 6,
      title: "Dairy",
      icon: ImgDairy,
    },
    {
      id: 7,
      title: "Fast Food",
      icon: ImgBurger,
    },
    {
      id: 8,
      title: "Meat ",
      icon: ImgProtein,
    },
  ];

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

      {/*  ---------- stores filter -------------- */}

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
                style={tw`mr-1.5 rounded-none`}
              />

              <Text style={tw`text-base text-black font-PoppinsSemiBold`}>
                {store}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* --------------- category filtering ----------------- */}
      <View>
        <Text style={tw`font-PoppinsSemiBold text-xl mb-4`}>Categories</Text>

        <View style={tw`p-4`}>
          {categoryData.map(
            (category): JSX.Element => (
              <View
                key={category.id}
                style={tw`flex-row justify-between items-center my-2 pr-5`}
              >
                <View style={tw`flex-row gap-2.5`}>
                  <Image source={category?.icon} />
                  <Text style={tw`font-PoppinsSemiBold text-sm text-black`}>
                    {category.title}
                  </Text>
                </View>
                <Checkbox
                  size={18}
                  color="black"
                  // label="Both"
                  labelStyle={tw`font-PoppinsBold text-base text-[#262626]`}
                  // value={!!selectedStores[store]}
                  // onValueChange={() => toggleCheckbox(store)}
                  style={tw`mr-1.5 rounded-none`}
                />
              </View>
            )
          )}
        </View>
      </View>

      <View style={tw`rounded-full h-12`}>
        <TButton
          // onPress={handleSubmit(onSubmit)}
          // onPress={() => router.push("/")}
          onPress={() => props?.navigation?.closeDrawer()}
          title="APPLY FILTER"
          containerStyle={tw`rounded-md`}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default function _layout() {
  return (
    <>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerPosition: "right",
          swipeEnabled: false,
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="home" />
      </Drawer>
    </>
  );
}
