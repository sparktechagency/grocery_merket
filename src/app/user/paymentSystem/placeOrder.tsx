import {
  View,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useCallback, useRef } from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { Link, router, useLocalSearchParams } from "expo-router";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import {
  IconCalender,
  IconCheckout,
  IconLeftLineArrow,
  IconPlaceOrderSelected,
  IconRightArrowSingle,
  IconTime,
} from "@/assets/icon";

import TButton from "@/src/lib/buttons/TButton";
import { Calendar } from "react-native-calendars";
import { TextInput } from "react-native-gesture-handler";
import { ImgShopperOne, ImgShopperTwo } from "@/assets/images";
import OrderBill from "@/src/components/OrderBill";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { set } from "react-hook-form";
import { useGetAllShopperQuery } from "@/src/redux/apiSlices/profileSlieces";

const placeOrder = () => {
  const [isCalenderModal, setIsCalenderModal] = React.useState(false);
  const [markedDates, setMarkedDates] = React.useState({});
  const [isTimeModal, setIsTimeModal] = React.useState(false);
  const [calenderValue, setCalenderValue] = React.useState("");
  const [isChecked, setIsChecked] = React.useState<boolean>(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(async () => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleCheckBox = async () => {
    setIsChecked(!isChecked);
  };

  const { userInfo, cartInfo } = useLocalSearchParams();
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  const parsedCartInfo = cartInfo ? JSON.parse(cartInfo) : null;

  const [hour, setHour] = React.useState("08");
  const [minute, setMinute] = React.useState("00");
  const [amPm, setAmPm] = React.useState("AM");

  // ******************************* API CALLS ****************************************************
  const { data: getAllShoppers, isLoading: isGetAllShopperLoading } =
    useGetAllShopperQuery({});

  console.log(
    getAllShoppers?.data,
    "get all shoppers ----------------------->"
  );

  // -------------------------------------- calender and time handler ------------------------------

  const formatTime = () => {
    return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")} ${amPm}`;
  };
  const handleOK = () => {
    console.log("Selected time:", formatTime());
    setIsTimeModal(false);
  };
  const today = new Date().toISOString().split("T")[0];
  const handleDayPress = (day) => {
    setCalenderValue(day.dateString);
    setMarkedDates({
      [day?.dateString]: {
        selected: true,
        marked: true,
        selectedColor: "#00BFFF",
      },
    });
  };
  const renderDay = (day) => {
    const isPastDate = day.dateString < today;
    const isDisabled = isPastDate;
    return (
      <TouchableOpacity
        onPress={() => {
          handleDayPress(day);
        }}
        disabled={isDisabled}
        style={{
          backgroundColor: isDisabled
            ? "rgba(0, 0, 0, 0.1)"
            : calenderValue === day.dateString
            ? tw.color("bg-primary")
            : "transparent",
          borderRadius: 20,
          width: 35,
          height: 35,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: isPastDate
              ? "rgba(0, 0, 0, 0.5)"
              : calenderValue === day.dateString
              ? "#FFFFFF"
              : "#000000",
          }}
        >
          {day.day}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`flex-1 `}>
      <BackWithComponent onPress={() => router.back()} title={"Place Order"} />

      <ScrollView>
        <View style={tw`px-5`}>
          {/* ------------------- Steps ---------------- */}
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
            <View style={tw` flex-1 justify-center items-center pb-3`}>
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

          {/*  ======================= userInfo =-================================== */}

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
                {parsedUserInfo?.name}
              </Text>
              <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
                {parsedUserInfo?.address}
              </Text>

              <Text style={tw`font-PoppinsRegular text-base text-black mb-2`}>
                Mobile:
                <Text
                  style={tw`font-PoppinsRegular text-base text-regularText`}
                >
                  {parsedUserInfo?.phone}
                </Text>
              </Text>
            </View>
          </View>

          {/* -======================== order info ================== */}
          <OrderBill
            headerTitle={"Order bill"}
            totalItems={parsedCartInfo?.total_products}
            subTotal={parsedCartInfo?.total_price}
            deliveryCharge={0}
            tax={0}
            total={parsedCartInfo?.total_price}
          />
          {/*  --====================== time and date or profile ================== */}
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
                onPress={() => handlePresentModalPress()}
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
              style={[
                {
                  height: 400,
                  width: 350,
                },
                tw`rounded-lg`,
              ]}
              dayComponent={({ date }) => renderDay(date)}
              markedDates={markedDates}
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
        onDismiss={() => setIsTimeModal(!isTimeModal)}
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
      <BottomSheetModalProvider>
        <BottomSheetModal ref={bottomSheetModalRef} snapPoints={["50%", "90%"]}>
          <BottomSheetScrollView
            contentContainerStyle={styles.contentContainer}
          >
            <Text
              style={tw`font-PoppinsMedium text-base text-center text-black`}
            >
              Choose your Shopper
            </Text>
            <Text style={tw` border-b w-full`}></Text>
            <ScrollView>
              {/* ================= Shopper list -============================ */}
              {getAllShoppers?.data.map((item: any, index: number) => (
                <TouchableOpacity
                  onPress={() => handleCheckBox()}
                  key={item?.id}
                  style={tw`flex-row items-center  mt-6 w-[85%] gap-7`}
                >
                  <TouchableOpacity
                    onPress={() => handleCheckBox()}
                    style={tw.style(
                      `border w-5 h-5  justify-center items-center rounded-sm`,
                      isChecked ? `bg-primary border-0` : `bg-transparent`
                    )}
                  >
                    {isChecked ? (
                      <Text style={tw`text-white text-sm`}>✔</Text>
                    ) : null}
                  </TouchableOpacity>
                  <View
                    style={tw` flex-row items-center bg-white shadow-md rounded-lg w-full px-5  py-3 gap-4`}
                  >
                    <Image
                      style={tw`w-16 h-16 rounded-full`}
                      source={ImgShopperOne}
                    />
                    <Text
                      style={tw`font-PoppinsSemiBold text-base w-full text-black`}
                    >
                      Random Shopper
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              {/*  ------------- button ---------- */}
              <View
                style={tw`flex-row justify-between items-center mt-12 px-6`}
              >
                <TouchableOpacity
                  onPress={() => handleCloseModalPress()}
                  style={tw`bg-[#E8E8E8] px-10 py-2.5 rounded-full`}
                >
                  <Text style={tw`font-PoppinsMedium text-black text-lg`}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCloseModalPress()}
                  style={tw`bg-primary px-10 py-2.5 rounded-full`}
                >
                  <Text style={tw`font-PoppinsMedium text-white text-lg`}>
                    Select
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      {/* ------ shopper modal open ------------ */}
      {/* <BottomSheetModalProvider>
        <BottomSheetModal ref={bottomSheetModalRef} snapPoints={["50%", "90%"]}>
          <BottomSheetScrollView
            contentContainerStyle={styles.contentContainer}
          >
            <Text
              style={tw`font-PoppinsMedium text-base text-center text-black`}
            >
              Choose your Shopper
            </Text>
            <Text style={tw` border-b w-full`}></Text>
            <ScrollView>
              <View style={tw`flex-row items-center  mt-8 w-[85%] gap-7`}>
                <TouchableOpacity
                  onPress={() => handleCheckBox()}
                  style={tw.style(
                    `border w-5 h-5  justify-center items-center rounded-sm`,
                    isChecked ? `bg-primary border-0` : `bg-transparent`
                  )}
                >
                  {isChecked ? (
                    <Text style={tw`text-white text-sm`}>✔</Text>
                  ) : null}
                </TouchableOpacity>
                <View
                  style={tw` flex-row bg-white shadow-md rounded-lg w-full px-5  py-3 gap-4`}
                >
                  <Image
                    style={tw`w-16 h-16 rounded-full`}
                    source={ImgShopperTwo}
                  />
                  <View>
                    <Text
                      style={tw`font-PoppinsSemiBold text-base w-full text-black`}
                    >
                      Theresa Webb
                    </Text>
                    <Text
                      style={tw`font-PoppinsRegular text-sm text-regularText`}
                    >
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
                <TouchableOpacity
                  onPress={() => handleCheckBox()}
                  style={tw.style(
                    `border w-5 h-5  justify-center items-center rounded-sm`,
                    isChecked ? `bg-primary border-0` : `bg-transparent`
                  )}
                >
                  {isChecked ? (
                    <Text style={tw`text-white text-sm`}>✔</Text>
                  ) : null}
                </TouchableOpacity>
                <View
                  style={tw` flex-row items-center bg-white shadow-md rounded-lg w-full px-5  py-3 gap-4`}
                >
                  <Image
                    style={tw`w-16 h-16 rounded-full`}
                    source={ImgShopperOne}
                  />
                  <Text
                    style={tw`font-PoppinsSemiBold text-base w-full text-black`}
                  >
                    Random Shopper
                  </Text>
                </View>
              </View>

              <View
                style={tw`flex-row justify-between items-center mt-12 px-6`}
              >
                <TouchableOpacity
                  onPress={() => handleCloseModalPress()}
                  style={tw`bg-[#E8E8E8] px-10 py-2.5 rounded-full`}
                >
                  <Text style={tw`font-PoppinsMedium text-black text-lg`}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCloseModalPress()}
                  style={tw`bg-primary px-10 py-2.5 rounded-full`}
                >
                  <Text style={tw`font-PoppinsMedium text-white text-lg`}>
                    Select
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 16,
    height: 400,
  },
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
