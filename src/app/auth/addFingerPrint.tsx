import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { ImgFingerPrint } from "@/assets/images";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

const addFingerPrint = () => {
  useEffect(() => {
    setTimeout(() => {
      handlePresentModalPress();
    }, 300);
  }, []);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(async () => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={"Add Fingerprint"}
      />

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={["30%"]}
          onDismiss={() => {
            router.back();
          }}
        >
          <BottomSheetScrollView
            contentContainerStyle={styles.contentContainer}
          >
            <View
              style={tw`w-[70%] min-h-44 rounded-3xl justify-center items-center mx-auto bg-white py-4 gap-2`}
            >
              <Image style={tw`w-11 h-11`} source={ImgFingerPrint} />
              <Text style={tw`font-PoppinsSemiBold text-lg text-black`}>
                Touch ID
              </Text>
              <Text style={tw`font-PoppinsRegular text-base text-black`}>
                madhab15820@gmail.com
              </Text>
              <View style={tw`w-full border-b border-regularText`}></View>
              <TouchableOpacity onPress={() => router.push("/auth/addFace")}>
                <Text style={tw`font-PoppinsSemiBold text-lg text-blue-700`}>
                  Action
                </Text>
              </TouchableOpacity>
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

export default addFingerPrint;
