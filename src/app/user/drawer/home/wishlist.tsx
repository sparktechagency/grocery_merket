import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import {
  IconAddToCartWhite,
  IconDelete,
  IconMuniceButton,
  IconPlusButton,
} from "@/assets/icon";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { CartData } from "@/src/components/CardData";
import { Swipeable } from "react-native-gesture-handler";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { Dialog, PanningProvider } from "react-native-ui-lib";
import { ImgBurger } from "@/assets/images";

const wishlist = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const SwipeToDeleteCard = ({
    data,
    onDelete,
    onAddToCart,
  }: {
    data: any;
    onDelete: () => void;
    onAddToCart: () => void;
  }) => {
    const renderRightActions = () => (
      <TouchableOpacity
        onPress={onDelete}
        style={tw`bg-[#FF5353] justify-center items-center w-24 h-[90%] rounded-lg`}
      >
        <SvgXml xml={IconDelete} />
      </TouchableOpacity>
    );

    const renderLeftActions = () => (
      <TouchableOpacity
        onPress={onAddToCart}
        style={tw`bg-primary justify-center items-center w-24 h-[90%] rounded-lg`}
      >
        <SvgXml xml={IconAddToCartWhite} />
      </TouchableOpacity>
    );

    return (
      <Swipeable
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        rightThreshold={70}
        leftThreshold={70}
      >
        <TouchableOpacity
          style={tw`flex-row justify-between items-center p-2 rounded-xl mx-5 bg-white mb-2`}
        >
          <Image source={data.image} />
          <View>
            <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
              {data.title}
            </Text>
            <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
              {data.weight}
            </Text>
            <Text style={tw`font-PoppinsSemiBold text-base text-[#006B27]`}>
              ${data.price}
            </Text>
          </View>
          <View style={tw`items-center gap-1.5 bg-slate-50 rounded-full`}>
            <TouchableOpacity
              style={tw`px-2.5 py-3.5 rounded-full bg-[#eff3f7]`}
            >
              <SvgXml xml={IconMuniceButton} />
            </TouchableOpacity>
            <Text>00</Text>
            <TouchableOpacity style={tw`p-2.5 rounded-full bg-primary`}>
              <SvgXml xml={IconPlusButton} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <AlertNotificationRoot>
      <View>
        <BackWithComponent onPress={() => router.back()} title="Stores" />
        <ScrollView style={tw``}>
          {CartData.map((item) => (
            <SwipeToDeleteCard
              key={item.id}
              data={item}
              onDelete={() => setIsModalVisible(true)}
              onAddToCart={() =>
                Toast.show({
                  type: ALERT_TYPE.SUCCESS,
                  title: "Success",
                  textBody: "Added add to cart",
                })
              }
            />
          ))}
        </ScrollView>

        <Dialog
          width={"100%"}
          height={"35%"}
          bottom={true}
          containerStyle={tw`flex-1 bg-white rounded-t-3xl p-5`}
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          panDirection={PanningProvider.Directions.DOWN}
        >
          <Text style={tw`font-PoppinsMedium text-base text-center text-black`}>
            Remove from cart ?
          </Text>
          <Text style={tw` border-b w-full`}></Text>

          <View
            style={tw`flex-row items-center p-3 rounded-2xl bg-white mt-7 mb-3 shadow-md`}
          >
            <Image
              source={ImgBurger}
              style={tw`w-14 h-14 rounded-md`}
              resizeMode="contain"
            />
            <View style={tw`ml-4`}>
              <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
                Red Apple
              </Text>
              <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
                1kg
              </Text>
              <Text
                style={tw`font-PoppinsSemiBold text-base text-primary mt-1`}
              >
                $55
              </Text>
            </View>
          </View>

          <View style={tw`flex-row justify-between items-center mt-8 `}>
            <TouchableOpacity
              onPress={() => setIsModalVisible(!isModalVisible)}
              style={tw`bg-[#E8E8E8] px-10 py-2.5 rounded-full`}
            >
              <Text style={tw`font-PoppinsMedium text-black text-lg`}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsModalVisible(!isModalVisible)}
              style={tw`bg-[#FF0000] px-10 py-2.5 rounded-full`}
            >
              <Text style={tw`font-PoppinsMedium text-white text-lg`}>
                Yes, remove
              </Text>
            </TouchableOpacity>
          </View>
        </Dialog>
      </View>
    </AlertNotificationRoot>
  );
};

export default wishlist;
