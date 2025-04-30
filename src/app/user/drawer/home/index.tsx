import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { SvgXml } from "react-native-svg";
import {
  IconAddToCat,
  IconArrowCorner,
  IconLocation,
  IconNotification,
  IconRightArrowSingle,
} from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import DiscountCarousel from "@/src/components/Carousel";
import { Base } from "@/utils/utils";
import {
  ImgBeverage,
  ImgDairyBakery,
  ImgFruits,
  ImgMeatEgg,
  ImgSnacks,
  ImgSpices,
} from "@/assets/images";
import { FlatList } from "react-native-gesture-handler";
import { CartData } from "@/src/components/CardData";
import { CardItem } from "@/src/components/CardItem";
import { router } from "expo-router";

const HomeScreen = () => {
  const [notification, setNotification] = React.useState(false);
  const [addToCart, setAddToCart] = React.useState(true);

  // ------------ Category Data  item state hare ------------
  const categoryData = [
    {
      id: 1,
      image: ImgFruits,
      category_name: "Fruits & Vegetables",
    },
    {
      id: 2,
      image: ImgDairyBakery,
      category_name: "Dairy & Bakery",
    },
    {
      id: 3,
      image: ImgSpices,
      category_name: "Spices",
    },
    {
      id: 4,
      image: ImgSnacks,
      category_name: "Snacks",
    },
    {
      id: 5,
      image: ImgBeverage,
      category_name: "Beverage",
    },
    {
      id: 6,
      image: ImgMeatEgg,
      category_name: "Meat & Eggs",
    },
  ];
  interface CategoryProp {
    image: any;
    id: number;
    category_name: string;
  }
  const categoryItem = ({ item }: { item: CategoryProp }) => (
    <TouchableOpacity style={tw`m-2 bg-white w-48 rounded-md shadow-md`}>
      <Image source={item.image} style={tw`w-full h-28 rounded-t-md`} />
      <View style={tw`flex-row justify-between items-center p-2`}>
        <Text style={tw` text-sm mt-2 font-PoppinsMedium`}>
          {item.category_name}
        </Text>
        <Pressable style={tw`p-1.5 text-center bg-[#F0F0F0] rounded-full`}>
          <SvgXml xml={IconArrowCorner} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`pb-24`}>
        <View style={tw`px-5 flex-row justify-between mt-3 mb-5`}>
          <View style={tw`flex-row justify-center items-center gap-2`}>
            <SvgXml xml={IconLocation} />
            <View>
              <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
                Hello, Benjamin
              </Text>

              <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
                Kodiak Island
              </Text>
            </View>
          </View>

          <View style={tw`flex-row items-center gap-3`}>
            <TouchableOpacity
              onPress={() => router.push("/user/addToCart/cart")}
              style={tw`relative p-3 bg-white shadow-lg rounded-lg`}
            >
              <SvgXml xml={IconAddToCat} />
              {addToCart ? (
                <Text
                  style={tw`absolute top-0 right-0 px-1 bg-orange text-white rounded-full`}
                >
                  2
                </Text>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/user/notification/notification")}
              style={tw`relative p-3 bg-white shadow-lg rounded-lg`}
            >
              <SvgXml xml={IconNotification} />
              {notification ? (
                <Text
                  style={tw`absolute top-0 right-0 px-1 bg-orange text-white rounded-full`}
                >
                  2
                </Text>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>

        {/* ------------- carousel banner ============================ */}

        <DiscountCarousel />

        {/* ----------- Category section -------------------- */}
        <View>
          <View style={tw`flex-row justify-between items-center mt-5 px-4`}>
            <Text style={tw`font-PoppinsSemiBold text-xl text-black`}>
              Category
            </Text>
            <TouchableOpacity
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={categoryData}
              renderItem={categoryItem}
              // numColumns={2}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              // scrollIndicatorInsets={false}
            />
          </View>
        </View>

        {/* ============== Beast Seller section =============== */}

        <View>
          <View style={tw`flex-row justify-between items-center mt-5  px-4`}>
            <Text style={tw`font-PoppinsSemiBold text-xl text-black`}>
              Beast Seller
            </Text>
            <TouchableOpacity
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={CartData}
              renderItem={CardItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
            />
          </View>
        </View>

        {/* ============== exclusive offer ========= */}

        <View>
          <View style={tw`flex-row justify-between items-center mt-5  px-4`}>
            <Text style={tw`font-PoppinsSemiBold text-xl text-black`}>
              Exclusive offer
            </Text>
            <TouchableOpacity
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={CartData}
              renderItem={CardItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
            />
          </View>
        </View>

        {/* ================ Mackdonalds section ------------------ */}
        <View>
          <View style={tw`flex-row justify-between items-center mt-5  px-4`}>
            <Text style={tw`font-PoppinsSemiBold text-xl text-black`}>
              Mackdonalds
            </Text>
            <TouchableOpacity
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={CartData}
              renderItem={CardItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
            />
          </View>
        </View>

        {/*  ------------------- Starbucks section ---------------  */}
        <View>
          <View style={tw`flex-row justify-between items-center mt-5  px-4`}>
            <Text style={tw`font-PoppinsSemiBold text-xl text-black`}>
              Starbucks
            </Text>
            <TouchableOpacity
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={CartData}
              renderItem={CardItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
            />
          </View>
        </View>

        {/* ----------------- Store name 1 section start  */}
        <View>
          <View style={tw`flex-row justify-between items-center mt-5  px-4`}>
            <Text style={tw`font-PoppinsSemiBold text-xl text-black`}>
              Store name 1
            </Text>
            <TouchableOpacity
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={CartData}
              renderItem={CardItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
            />
          </View>
        </View>

        {/* -------------------- Store name 2 ----------------- */}
        <View>
          <View style={tw`flex-row justify-between items-center mt-5  px-4`}>
            <Text style={tw`font-PoppinsSemiBold text-xl text-black`}>
              Store name 2
            </Text>
            <TouchableOpacity
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={CartData}
              renderItem={CardItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
            />
          </View>
        </View>

        <StatusBar backgroundColor={Base} animated barStyle={"dark-content"} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
