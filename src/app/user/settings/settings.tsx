import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useCallback, useRef } from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import {
  IconAbout,
  IconChangeKey,
  IconCross,
  IconFacePrivacy,
  IconFAQ,
  IconFingerPrivacy,
  IconGetterThen,
  IconPrivacy,
} from "@/assets/icon";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

const settings = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(async () => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"Settings"} />
      <View style={tw`bg-[#e8eaec] p-3.5 rounded-xl mx-5 shadow-md gap-5`}>
        <TouchableOpacity
          onPress={() => router.push("/auth/changePassword")}
          style={tw`flex-row justify-between items-center w-full`}
        >
          <View style={tw`flex-row justify-start items-center  gap-3`}>
            <View
              style={tw`w-10 h-10 justify-center text-center items-center bg-[#ECFFF1] mr-5 rounded-full`}
            >
              <SvgXml xml={IconChangeKey} />
            </View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>
              Change password
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/auth/changePassword")}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePresentModalPress}
          style={tw`flex-row justify-between items-center`}
        >
          <View style={tw`flex-row justify-start items-center gap-3`}>
            <View
              style={tw`w-10 h-10 justify-center text-center items-center bg-[#ECFFF1] mr-5 rounded-full`}
            >
              <SvgXml xml={IconPrivacy} />
            </View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>
              Privacy
            </Text>
          </View>
          <Pressable
            onPress={handlePresentModalPress}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/user/settings/aboutApp")}
          style={tw`flex-row justify-between items-center`}
        >
          <View style={tw`flex-row justify-start items-center gap-3`}>
            <View
              style={tw`w-10 h-10 justify-center text-center items-center bg-[#ECFFF1] mr-5 rounded-full`}
            >
              <SvgXml xml={IconAbout} />
            </View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>
              About app
            </Text>
          </View>
          <Pressable
            // onPress={() => router.push("/user/users/userAddress")}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/user/settings/FAQ")}
          style={tw`flex-row justify-between items-center`}
        >
          <View style={tw`flex-row justify-start items-center gap-3`}>
            <View
              style={tw`w-10 h-10 justify-center text-center items-center bg-[#ECFFF1] mr-5 rounded-full`}
            >
              <SvgXml xml={IconFAQ} />
            </View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>FAQ</Text>
          </View>
          <Pressable
            onPress={() => router.push("/user/settings/FAQ")}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>
      </View>

      {/* ================= Privacy modal ================ */}

      <BottomSheetModalProvider>
        <BottomSheetModal ref={bottomSheetModalRef} snapPoints={["50%", "90%"]}>
          <BottomSheetScrollView
            contentContainerStyle={styles.contentContainer}
          >
            <View>
              <View style={tw`flex-row justify-between items-center mt-6 mx-6`}>
                <Text> </Text>
                <Text style={tw`font-PoppinsMedium text-xl text-black`}>
                  Privacy
                </Text>
                <Pressable style={tw``} onPress={handleCloseModalPress}>
                  <SvgXml width={32} height={32} xml={IconCross} />
                </Pressable>
              </View>
              {/*  ====== border bottom ---------- */}
              <View style={tw`w-full px-5`}>
                <Text
                  style={tw`w-full mx-auto border-b border-regularText  `}
                ></Text>
              </View>
              <View style={tw`px-8 mt-10`}>
                <TouchableOpacity
                  onPress={() => router.push("/auth/addFingerPrint")}
                  style={tw`flex-row justify-between items-center border  rounded-xl border-primary p-2.5`}
                >
                  <View style={tw`flex-row justify-start items-center gap-3`}>
                    <View
                      style={tw`w-10 h-10 justify-center text-center items-center bg-[#ECFFF1] mr-5 rounded-full`}
                    >
                      <SvgXml xml={IconFingerPrivacy} />
                    </View>
                    <Text style={tw`font-PoppinsMedium text-base text-black`}>
                      Add Fingerprint
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => router.push("/auth/addFingerPrint")}
                    style={tw`py-2.5 px-3.5 bg-[#ECFFF1] rounded-full`}
                  >
                    <SvgXml xml={IconGetterThen} />
                  </Pressable>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/auth/addFace")}
                  style={tw`flex-row justify-between items-center border  rounded-xl border-primary p-2.5 mt-3`}
                >
                  <View style={tw`flex-row justify-start items-center gap-3`}>
                    <View
                      style={tw`w-10 h-10 justify-center text-center items-center bg-[#ECFFF1] mr-5 rounded-full`}
                    >
                      <SvgXml xml={IconFacePrivacy} />
                    </View>
                    <Text style={tw`font-PoppinsMedium text-base text-black`}>
                      Add face id
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => router.push("/auth/addFace")}
                    style={tw`py-2.5 px-3.5 bg-[#ECFFF1] rounded-full`}
                  >
                    <SvgXml xml={IconGetterThen} />
                  </Pressable>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
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

export default settings;
