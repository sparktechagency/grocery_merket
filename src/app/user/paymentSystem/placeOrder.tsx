import {
  View,
  Text,
  ScrollView,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { Link, router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import {
  IconCalender,
  IconCheckout,
  IconLeftLineArrow,
  IconMasterCard,
  IconPaymentSelected,
  IconPlaceOrderSelected,
  IconRightArrowSingle,
  IconTime,
} from "@/assets/icon";

import TButton from "@/src/lib/buttons/TButton";
import { Calendar } from "react-native-calendars";
import { TextInput } from "react-native-gesture-handler";
import { Checkbox, Dialog, PanningProvider } from "react-native-ui-lib";
import { ImgShopperOne, ImgShopperTwo } from "@/assets/images";

const placeOrder = () => {
  const [isCalenderModal, setIsCalenderModal] = React.useState(false);
  const [isTimeModal, setIsTimeModal] = React.useState(false);
  const [calenderValue, setCalenderValue] = React.useState("");
  const [isShopperModal, setIsShopperModal] = React.useState(false);
  const [isSelected, setSelection] = React.useState(false);

  const [hour, setHour] = React.useState("08");
  const [minute, setMinute] = React.useState("00");
  const [amPm, setAmPm] = React.useState("AM");

  const formatTime = () => {
    return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")} ${amPm}`;
  };

  const handleOK = () => {
    console.log("Selected time:", formatTime());
    setIsTimeModal(false);
  };

  return (
    <View style={tw`flex-1 `}>
      <BackWithComponent onPress={() => router.back()} title={"Place Order"} />

      <ScrollView>
        <View style={tw`px-5`}>
          <View style={tw`flex-row items-center justify-between px-4 py-4`}>
            {/* Step 1: Checkout */}
            <View style={tw`items-center`}>
              <View style={tw`border-2 border-primary rounded-full`}>
                <View
                  style={tw`w-14 h-14 rounded-full bg-primary justify-center items-center m-1`}
                >
                  <SvgXml xml={IconCheckout} width={24} height={24} />
                </View>
              </View>
              <Text style={tw`text-center text-black mt-2`}>Checkout</Text>
            </View>
            {/* Arrow */}
            <View>
              <SvgXml xml={IconLeftLineArrow} />
            </View>
            {/* Step 2: Payment */}
            <View style={tw`items-center`}>
              <View style={tw`border-2 border-primary rounded-full`}>
                <View
                  style={tw`w-14 h-14 rounded-full  bg-primary justify-center items-center m-1`}
                >
                  <SvgXml xml={IconPaymentSelected} width={24} height={24} />
                </View>
              </View>
              <Text style={tw`text-center text-black mt-2`}>Payment</Text>
            </View>
            {/* Arrow */}
            <View>
              <SvgXml xml={IconLeftLineArrow} />
            </View>
            {/* Step 3: Place Order */}
            <View style={tw`items-center`}>
              <View style={tw`border-2 border-primary rounded-full`}>
                <View
                  style={tw`w-14 h-14 rounded-full  bg-primary justify-center items-center m-1`}
                >
                  <SvgXml xml={IconPlaceOrderSelected} width={24} height={24} />
                </View>
              </View>
              <Text style={tw`text-center text-black mt-2`}>Place order</Text>
            </View>
          </View>

          <View style={tw`w-full bg-[#e7e9eb] rounded-xl  mt-2`}>
            <View
              style={tw`flex-row justify-between items-center rounded-t-lg bg-white px-5 py-2`}
            >
              <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
                Delivery address
              </Text>
              <Link
                href={"/user/users/userDetails"}
                style={tw`underline font-PoppinsRegular text-[#56A5FF]`}
              >
                Change
              </Link>
            </View>
            <View style={tw`px-5 py-3`}>
              <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
                Home
              </Text>
              <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
                Kodiak Island
              </Text>
              <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
                Alaska
              </Text>

              <Text style={tw`font-PoppinsRegular text-base text-black mb-2`}>
                Mobile:{" "}
                <Text
                  style={tw`font-PoppinsRegular text-base text-regularText`}
                >
                  {" "}
                  01254698756
                </Text>
              </Text>
            </View>
          </View>

          <View
            style={tw`flex-row items-center px-5 py-4 rounded-xl bg-[#eceff1] mb-3 shadow-md mt-5`}
          >
            <View
              style={tw`w-14 h-14 flex justify-center items-center bg-white rounded-full shadow-sm`}
            >
              <SvgXml xml={IconMasterCard} style={tw`w-16 h-16 rounded-md`} />
            </View>
            <View style={tw`ml-4`}>
              <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
                Mastercard
              </Text>
              <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                **** **** **** 4568
              </Text>
              <View style={tw`flex-row gap-7 items-center mt-1`}>
                <Text style={tw`font-PoppinsMedium text-sm text-black`}>
                  Exp: 06/26
                </Text>
                <Text style={tw`font-PoppinsMedium text-sm text-black`}>
                  CVV: 123
                </Text>
              </View>
            </View>
          </View>

          <View style={tw`w-full bg-[#e7e9eb]  rounded-xl mt-4`}>
            <View style={tw`flex-row  rounded-t-lg bg-white px-5 py-2`}>
              <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
                Order bill
              </Text>
            </View>
            <View style={tw`px-5 py-3`}>
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
              <View style={tw`flex-row justify-between items-center mt-2`}>
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
              <View style={tw`flex-row justify-between items-center mt-2`}>
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
              <View style={tw`flex-row justify-between items-center mt-2`}>
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
              <View style={tw`w-full mb-2`}>
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
          </View>

          <View style={tw`mt-3 mb-5`}>
            <View style={tw`mb-3`}>
              <Text style={tw`font-PoppinsRegular text-base text-black`}>
                Choose Delivery Date
              </Text>
              <TouchableOpacity
                onPress={() => setIsCalenderModal(true)}
                style={tw`border border-gray-400 w-full h-12 rounded-sm flex-row justify-between items-center px-5`}
              >
                <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                  {calenderValue ? calenderValue : "Select Date"}
                </Text>
                <SvgXml xml={IconCalender} />
              </TouchableOpacity>
            </View>

            <View style={tw`mb-3`}>
              <Text style={tw`font-PoppinsRegular text-base text-black`}>
                Choose Delivery Time
              </Text>
              <TouchableOpacity
                onPress={() => setIsTimeModal(true)}
                style={tw`border border-gray-400 w-full h-12 rounded-sm flex-row justify-between items-center px-5`}
              >
                <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                  {formatTime ? formatTime() : " Select Time"}
                </Text>
                <SvgXml xml={IconTime} />
              </TouchableOpacity>
            </View>

            <View style={tw``}>
              <Text style={tw`font-PoppinsRegular text-base text-black`}>
                shopper
              </Text>
              <TouchableOpacity
                onPress={() => setIsShopperModal(true)}
                style={tw`border border-gray-400 w-full h-12 rounded-sm flex-row justify-between items-center px-5`}
              >
                <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                  Choose your shopper
                </Text>
                <SvgXml xml={IconRightArrowSingle} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`rounded-full my-4`}>
            <TButton
              // onPress={handleSubmit(onSubmit)}
              onPress={() => router.push("/user/paymentSystem/orderSuccess")}
              title="Place Order"
              containerStyle={tw`rounded-full `}
            />
          </View>
        </View>
      </ScrollView>

      {/* --------- calender modal is open ---------------- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCalenderModal}
        onRequestClose={() => {
          setIsCalenderModal(!isCalenderModal);
        }}
      >
        <View style={styles.centeredViewCalender}>
          <View style={styles.modalViewCalender}>
            <Calendar
              style={{
                height: 400,
              }}
              theme={{
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                textSectionTitleColor: "#b6c1cd",
                selectedDayBackgroundColor: "#00adf5",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#00adf5",
                dayTextColor: "#2d4150",
                textDisabledColor: "#dd99ee",
              }}
              // Initially visible month. Default = now
              current={"2025-05-03"}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              minDate={"2022-01-01"}
              // Max date
              maxDate={"2026-12-31"}
              // Handler which gets executed on day press
              onDayPress={(day) => {
                console.log("Selected day", day);
              }}
              // Mark specific dates
              markedDates={{
                "2025-05-03": {
                  selected: true,
                  marked: true,
                  selectedColor: "blue",
                },
              }}
            />
            <View style={tw`w-full flex-row justify-between `}>
              <TouchableOpacity
                onPress={() => setIsCalenderModal(!isCalenderModal)}
              >
                <Text style={tw`font-PoppinsMedium text-sm text-[#65558F]`}>
                  Clear
                </Text>
              </TouchableOpacity>

              <View style={tw`flex-row gap-5`}>
                <TouchableOpacity
                  onPress={() => setIsCalenderModal(!isCalenderModal)}
                >
                  <Text style={tw`font-PoppinsMedium text-sm text-[#65558F]`}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsCalenderModal(!isCalenderModal)}
                >
                  <Text style={tw`font-PoppinsMedium text-sm text-[#65558F]`}>
                    ok
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* ------ is time modal is open ----------------- */}
      <Modal
        onDismiss={() => console.log("dismissed")}
        animationType="slide"
        transparent={true}
        visible={isTimeModal}
        onRequestClose={() => {
          setIsTimeModal(!isTimeModal);
        }}
      >
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white w-80 rounded-2xl p-5`}>
            <Text style={tw`text-center text-lg mb-4`}>Enter time</Text>

            <View style={tw`flex-row items-center justify-center mb-5`}>
              <TextInput
                style={tw`border-b-2 border-indigo-500 text-xl w-16 text-center mx-1`}
                value={hour}
                keyboardType="numeric"
                onChangeText={(text) => setHour(text)}
                maxLength={2}
              />
              <Text style={tw`text-xl`}>:</Text>
              <TextInput
                style={tw`border-b-2 border-indigo-500 text-xl w-16 text-center mx-1`}
                value={minute}
                keyboardType="numeric"
                onChangeText={(text) => setMinute(text)}
                maxLength={2}
              />

              <View style={tw`ml-3`}>
                <TouchableOpacity
                  onPress={() => setAmPm("AM")}
                  style={tw`border px-3 py-1 rounded-md mb-1 ${
                    amPm === "AM" ? "bg-pink-200" : ""
                  }`}
                >
                  <Text>AM</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setAmPm("PM")}
                  style={tw`border px-3 py-1 rounded-md ${
                    amPm === "PM" ? "bg-pink-200" : ""
                  }`}
                >
                  <Text>PM</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity onPress={() => setIsTimeModal(false)}>
                <Text style={tw`text-indigo-600 text-base`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleOK}>
                <Text style={tw`text-indigo-600 text-base`}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ------ shopper modal open ------------ */}
      <Dialog
        width={"100%"}
        height={"60%"}
        bottom={true}
        containerStyle={tw`flex-1 bg-white rounded-t-3xl p-5`}
        visible={isShopperModal}
        onDismiss={() => console.log("dismissed")}
        panDirection={PanningProvider.Directions.DOWN}
      >
        <Text style={tw`font-PoppinsMedium text-base text-center text-black`}>
          Choose your Shopper
        </Text>
        <Text style={tw` border-b w-full`}></Text>

        <View style={tw`flex-row items-center  mt-8 w-[85%] gap-7`}>
          <Checkbox
            value={isSelected}
            onValueChange={setSelection}
            color="#000"
            // selectedIconColor="#000000"
            // borderColor="#000000"
          />
          <View
            style={tw` flex-row bg-white shadow-md rounded-lg w-full px-5  py-3 gap-4`}
          >
            <Image style={tw`w-16 h-16 rounded-full`} source={ImgShopperTwo} />
            <View>
              <Text
                style={tw`font-PoppinsSemiBold text-base w-full text-black`}
              >
                Theresa Webb
              </Text>
              <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
                My Personal Shopper
              </Text>
              <Link
                href={"/user/shoppers/myShoppers"}
                style={tw`underline font-PoppinsRegular text-sm text-primary `}
              >
                Change
              </Link>
            </View>
          </View>
        </View>

        <View style={tw`flex-row items-center  mt-6 w-[85%] gap-7`}>
          <Checkbox
            value={isSelected}
            onValueChange={setSelection}
            color="#000"
            // selectedIconColor="#000000"
            // borderColor="#000000"
          />
          <View
            style={tw` flex-row items-center bg-white shadow-md rounded-lg w-full px-5  py-3 gap-4`}
          >
            <Image style={tw`w-16 h-16 rounded-full`} source={ImgShopperOne} />
            <Text style={tw`font-PoppinsSemiBold text-base w-full text-black`}>
              Random Shopper
            </Text>
          </View>
        </View>

        <View style={tw`flex-row justify-between items-center mt-12 px-6`}>
          <TouchableOpacity
            onPress={() => setIsShopperModal(!isShopperModal)}
            style={tw`bg-[#E8E8E8] px-10 py-2.5 rounded-full`}
          >
            <Text style={tw`font-PoppinsMedium text-black text-lg`}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsShopperModal(!isShopperModal)}
            style={tw`bg-primary px-10 py-2.5 rounded-full`}
          >
            <Text style={tw`font-PoppinsMedium text-white text-lg`}>
              Select
            </Text>
          </TouchableOpacity>
        </View>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredViewCalender: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalViewCalender: {
    margin: 20,
    backgroundColor: "white",
    width: "85%",
    borderRadius: 28,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default placeOrder;
