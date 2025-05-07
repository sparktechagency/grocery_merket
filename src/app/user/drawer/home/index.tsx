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
  IconComparison,
  IconLocation,
  IconLove,
  IconNotification,
  IconRightArrowSingle,
  IconShopping,
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
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import { Modal } from "react-native-ui-lib";

const HomeScreen = () => {
  const [notification, setNotification] = React.useState(false);
  const [addToCart, setAddToCart] = React.useState(true);

  const [modalVisible, setModalVisible] = React.useState(false);

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
    <TouchableOpacity
      onPress={() => router.push("/user/storeProduct/storeProduct")}
      style={tw`m-2 bg-white w-48 rounded-md shadow-md`}
    >
      <Image source={item.image} style={tw`w-full h-28 rounded-t-md`} />
      <View style={tw`flex-row justify-between items-center p-2`}>
        <Text style={tw` text-sm mt-2 font-PoppinsMedium`}>
          {item.category_name}
        </Text>
        <Pressable
          onPress={() => router.push("/user/storeProduct/storeProduct")}
          style={tw`p-1.5 text-center bg-[#F0F0F0] rounded-full`}
        >
          <SvgXml xml={IconArrowCorner} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
  interface CardDataProps {
    image: any;
    category: string;
    brand: string;
    title: string;
    weight: string;
    price: number;
    isNew: boolean;
    isFavorite: boolean;
  }

  const cardData = ({ item }: CardDataProps) => (
    <Pressable
      onPress={() => router.push("/user/storeProduct/productDetails")}
      style={tw`relative w-52 h-56 bg-[#dbdee0] m-2 p-3 py-4 rounded-xl`}
    >
      <Image source={item?.image} style={tw` mx-auto p-3`} />
      <Text
        style={tw`absolute font-PoppinsSemiBold text-[10px] px-2 py-1 bg-[#56A5FF] rounded-r-full top-4 z-10 `}
      >
        New
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/user/storeProduct/productDetails")}
        style={tw`absolute  bg-transparent right-3 top-4`}
      >
        <BlurView
          intensity={60}
          style={tw`p-2 border border-white rounded-full  overflow-hidden`}
        >
          <SvgXml xml={IconLove} />
        </BlurView>
      </TouchableOpacity>
      <View style={tw`flex-row justify-between items-center gap-2 mt-3 `}>
        <Text
          style={tw`font-PoppinsMedium text-xs text-regularText bg-[#dddcdc] px-1.5 py-0.5 shadow-sm rounded-sm`}
        >
          {item.category}
        </Text>
        <Text
          style={tw`bg-[#FF5F00] font-PoppinsMedium text-xs px-1.5 py-0.5 shadow-sm rounded-sm text-white`}
        >
          {item.brand}
        </Text>
      </View>
      <Text style={tw`font-PoppinsSemiBold text-sm text-black mt-2`}>
        {item.title}
      </Text>
      <Text style={tw`font-PoppinsSemiBold text-xs text-[#787878]`}>
        {item.weight}
      </Text>
      <View style={tw`flex-row justify-between items-center mt-1`}>
        <Text style={tw`font-PoppinsBold text-base text-[#006B27]`}>
          ${item?.price}
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={tw`p-2 bg-white shadow-md rounded-full`}
        >
          <SvgXml xml={IconShopping} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );

  return (
    <View style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`pb-24`}>
        <View style={tw`px-5 flex-row justify-between mt-3 mb-5`}>
          <Pressable
            onPress={() => router.push("/user/drawer/home/profile")}
            style={tw`flex-row justify-center items-center gap-2`}
          >
            <SvgXml xml={IconLocation} />
            <View>
              <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
                Hello, Benjamin
              </Text>

              <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
                Kodiak Island
              </Text>
            </View>
          </Pressable>

          <View style={tw`flex-row items-center gap-3`}>
            <TouchableOpacity
              onPress={() =>
                router.push("/user/priceComparison/priceComparison")
              }
              style={tw`relative p-3 bg-white shadow-lg rounded-lg`}
            >
              <SvgXml xml={IconComparison} />
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => router.push("/user/addToCart/simpleCart")}
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
              onPress={() => router.push("/user/drawer/home/stores")}
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
              onPress={() => router.push("/user/storeProduct/storeProduct")}
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={CartData}
              renderItem={cardData}
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
              onPress={() => router.push("/user/storeProduct/storeProduct")}
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={CartData}
              renderItem={cardData}
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
              onPress={() => router.push("/user/storeProduct/storeProduct")}
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={CartData}
              renderItem={cardData}
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
              onPress={() => router.push("/user/storeProduct/storeProduct")}
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={CartData}
              renderItem={cardData}
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
              onPress={() => router.push("/user/storeProduct/storeProduct")}
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={CartData}
              renderItem={cardData}
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
              onPress={() => router.push("/user/storeProduct/storeProduct")}
              style={tw`flex-row justify-center gap-1 items-center`}
            >
              <Text>View all</Text>
              <SvgXml xml={IconRightArrowSingle} />
            </TouchableOpacity>
          </View>

          <View style={tw`pl-4`}>
            <FlatList
              data={CartData}
              renderItem={cardData}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
            />
          </View>
        </View>

        <StatusBar backgroundColor={Base} animated barStyle={"dark-content"} />
        <Modal
          animationType="slide"
          style={tw`w-[90%]`}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={tw`flex-1 justify-center items-center bg-black/50`}>
            <View style={tw`bg-white w-80 rounded-2xl py-6 px-8`}>
              <Text style={tw`text-center font-PoppinsBold text-xl mb-4`}>
                Added to cart
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={tw`px-10 py-3 border border-[#686868] rounded-xl`}
              >
                <Text style={tw`font-PoppinsRegular text-base text-center`}>
                  Remove from cart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={tw`px-10 py-3  bg-primary rounded-xl mt-3`}
              >
                <Text
                  style={tw`font-PoppinsSemiBold text-base text-white text-center`}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
