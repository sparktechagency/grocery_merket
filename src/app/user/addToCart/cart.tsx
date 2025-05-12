import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import tw from "@/src/lib/tailwind";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { CartData } from "@/src/components/CardData";
import { SvgXml } from "react-native-svg";
import { IconDelete, IconMuniceButton, IconPlusButton } from "@/assets/icon";
import TButton from "@/src/lib/buttons/TButton";
import { ImgBurger, ImgEmpty, ImgShopperOne } from "@/assets/images";
import { Swipeable } from "react-native-gesture-handler";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { Dialog, PanningProvider } from "react-native-ui-lib";

const SwipeToDeleteCard = ({
  data,
  onDelete,
}: {
  data: any;
  onDelete: () => void;
}) => {
  const renderRightActions = () => (
    <TouchableOpacity
      onPress={onDelete}
      style={tw`bg-[#FF5353] justify-center items-center w-24 h-[90%] rounded-lg`}
    >
      <SvgXml xml={IconDelete} />
    </TouchableOpacity>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      rightThreshold={70}
      leftThreshold={70}
    >
      <TouchableOpacity
        style={tw`flex-row justify-between items-center p-2 rounded-xl bg-white mb-2`}
      >
        <Image style={tw` h-20`} source={data.image} />
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
          <TouchableOpacity style={tw`px-2.5 py-3.5 rounded-full bg-[#eff3f7]`}>
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

const cart = () => {
  const [isCart, setIsCart] = React.useState(true);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  return (
    <AlertNotificationRoot>
      <View style={tw`flex-1  `}>
        {isCart ? (
          <View style={tw`flex-1`}>
            <BackWithComponent onPress={() => router.back()} title={"Cart"} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`mx-5`}
            >
              {CartData?.map((item) => (
                <SwipeToDeleteCard
                  key={item.id}
                  data={item}
                  onDelete={() => setIsModalVisible(true)}
                />
              ))}

              <View style={tw`bg-[#F3F5F7] p-4 my-16 rounded-xl`}>
                <View style={tw`flex-row justify-between items-center`}>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    Total items:
                  </Text>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    3
                  </Text>
                </View>
                <View style={tw`flex-row justify-between items-center mt-2.5`}>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    Sub total:
                  </Text>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    $50.55
                  </Text>
                </View>
                <View style={tw`flex-row justify-between items-center mt-2.5`}>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    Delivery charge:
                  </Text>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    $4.45
                  </Text>
                </View>
                <View style={tw`flex-row justify-between items-center mt-2.5`}>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    Tax:
                  </Text>
                  <Text
                    style={tw`font-PoppinsRegular text-base text-regularText`}
                  >
                    $0.5
                  </Text>
                </View>
                {/*  ====== border bottom ---------- */}
                <View style={tw`w-full mb-3`}>
                  <Text
                    style={tw`w-full mx-auto border-b border-regularText  `}
                  ></Text>
                </View>

                <View style={tw`flex-row justify-between items-center`}>
                  <Text style={tw`font-PoppinsSemiBold text-lg text-black`}>
                    Total:
                  </Text>
                  <Text style={tw`font-PoppinsSemiBold text-lg text-black`}>
                    $55.05
                  </Text>
                </View>
              </View>

              <View style={tw`rounded-full mb-6`}>
                <TButton
                  // onPress={handleSubmit(onSubmit)}
                  onPress={() => router.push("/user/addToCart/checkOut")}
                  title="Checkout"
                  containerStyle={tw`rounded-full `}
                />
              </View>
            </ScrollView>
          </View>
        ) : (
          <View style={tw`flex-1 mx-5 flex-col justify-between `}>
            <BackWithComponent onPress={() => router.back()} title={"Cart"} />
            <View style={tw` w-full text-center px-16 mx-auto`}>
              <View>
                <Image style={tw`mx-auto`} source={ImgEmpty} />
                <Text
                  style={tw`font-PoppinsSemiBold text-xl text-black mt-3 mx-auto`}
                >
                  Your cart is empty!
                </Text>
                <Text
                  style={tw`font-PoppinsRegular text-base text-regularText text-center mt-3  mx-auto`}
                >
                  Start shopping, add some groceries to your cart. Added items
                  will appear here.
                </Text>
              </View>
            </View>

            <View style={tw`rounded-full mb-6`}>
              <TButton
                // onPress={handleSubmit(onSubmit)}
                onPress={() => router.push("/user/drawer/home")}
                title="Back to store"
                containerStyle={tw`rounded-full `}
              />
            </View>
          </View>
        )}
      </View>

      <Dialog
        width={"100%"}
        height={"40%"}
        bottom={true}
        containerStyle={tw`flex-1 bg-white rounded-t-3xl p-5`}
        visible={isModalVisible}
        onDismiss={() => console.log("dismissed")}
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
            <Text style={tw`font-PoppinsSemiBold text-base text-primary mt-1`}>
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
            onPress={() => {
              setIsModalVisible(!isModalVisible);
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Success",
                textBody: "This Item Removed!",
              });
            }}
            style={tw`bg-[#FF0000] px-10 py-2.5 rounded-full`}
          >
            <Text style={tw`font-PoppinsMedium text-white text-lg`}>
              Yes, remove
            </Text>
          </TouchableOpacity>
        </View>
      </Dialog>
    </AlertNotificationRoot>
  );
};

export default cart;
