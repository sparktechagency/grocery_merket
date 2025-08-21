import { View, Text, StatusBar, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  Pressable,
  ScrollView,
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
import Slider from "@react-native-community/slider";
import TButton from "@/src/lib/buttons/TButton";
import {
  useKogerAllCategoriesQuery,
  useKogerAllStoreQuery,
} from "@/src/redux/apiSlices/homePageApiSlices";
import { FilterProvider, useFilters } from "../useContext/filterContext";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const [sliderState, setSliderState] = React.useState<number>(0);
  const insets = useSafeAreaInsets();
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [selectedStores, setSelectedStores] = React.useState<string[]>([]);
  const { setFilters } = useFilters();

  // -************************************ All apis ************************************-
  const { data: categoriesData, isLoading: isCategoryLoading } =
    useKogerAllCategoriesQuery({});
  const { data: storesData, isLoading: isStoresLoading } =
    useKogerAllStoreQuery({});

  // --------------------- filter data ---------------------
  const filteredData = {
    categories: selectedCategories,
    storeName: selectedStores,
    price: sliderState,
  };

  // ------------ categories checkbox ------------
  const handleCategoryCheckBox = (category: string) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((item) => item !== category) // remove if already selected
          : [...prev, category] // add if not selected
    );
  };
  // ------------ stores checkbox ------------
  const handleStoresCheckBox = (stores: string) => {
    setSelectedStores(
      (prev) =>
        prev.includes(stores)
          ? prev.filter((item) => item !== stores) // remove if already selected
          : [...prev, stores] // add if not selected
    );
  };

  const handleApply = () => {
    setFilters(filteredData);
    props?.navigation?.closeDrawer();
  };
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={tw`flex-1 pb-[${insets.bottom}px]`}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw`pb-4`}
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
        {/* ===================== price slider ================ */}

        <Slider
          style={{ width: 300, height: 10, paddingTop: 16 }}
          minimumValue={0}
          maximumValue={500}
          onValueChange={(value) => setSliderState(value)}
          minimumTrackTintColor="#00332E"
          maximumTrackTintColor="#00332E"
        />

        <View style={tw`flex-row justify-between items-center px-6 mt-4`}>
          <Text style={tw`font-PoppinsMedium text-base text-black`}>
            $ {Math.round(sliderState)}
          </Text>
          <Text style={tw`font-PoppinsMedium text-base text-black`}>$500</Text>
        </View>

        {/*  ---------- stores filter -------------- */}

        <View style={tw`p-4`}>
          <Text style={tw`font-PoppinsSemiBold text-xl mb-4`}>Stores</Text>

          <View style={tw`gap-3`}>
            {storesData?.stores.map((store, index) => {
              const isChecked = selectedStores.includes(store);
              return (
                <TouchableOpacity
                  onPress={() => handleStoresCheckBox(store)}
                  key={index}
                  style={tw`flex-row items-center`}
                >
                  <Text
                    numberOfLines={1}
                    style={tw`flex-1 text-base text-black font-PoppinsSemiBold`}
                  >
                    {store}
                  </Text>
                  {/* =================== checkbox  ================ */}
                  <TouchableOpacity
                    onPress={() => handleStoresCheckBox(store)}
                    style={tw.style(
                      `border w-5 h-5  justify-center items-center rounded-sm`,
                      isChecked ? `bg-primary border-0` : `bg-transparent`
                    )}
                  >
                    {isChecked ? (
                      <Text style={tw`text-white text-sm`}>✔</Text>
                    ) : null}
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* --------------- category filtering ----------------- */}
        <View>
          <Text style={tw`font-PoppinsSemiBold text-xl mb-4`}>Categories</Text>

          <View style={tw`p-4`}>
            {categoriesData?.categories.map((category, index): JSX.Element => {
              const isChecked = selectedCategories.includes(category);
              return (
                <View
                  key={index}
                  style={tw`flex-row justify-between items-center my-2 pr-5`}
                >
                  <View style={tw`flex-row gap-2.5`}>
                    <Text style={tw`font-PoppinsSemiBold text-sm text-black`}>
                      {category}
                    </Text>
                  </View>

                  {/* =================== checkbox  ================ */}
                  <TouchableOpacity
                    onPress={() => handleCategoryCheckBox(category)}
                    style={tw.style(
                      `border w-5 h-5  justify-center items-center rounded-sm`,
                      isChecked ? `bg-primary border-0` : `bg-transparent`
                    )}
                  >
                    {isChecked ? (
                      <Text style={tw`text-white text-sm`}>✔</Text>
                    ) : null}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        <View style={tw`rounded-full h-12 `}>
          <TButton
            onPress={() => handleApply()}
            title="APPLY FILTER"
            containerStyle={tw`rounded-md`}
          />
        </View>
      </ScrollView>
    </DrawerContentScrollView>
  );
};

export default function _layout() {
  return (
    <>
      <FilterProvider>
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
      </FilterProvider>
    </>
  );
}
