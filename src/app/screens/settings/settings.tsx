import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
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
import { Dialog, PanningProvider } from "react-native-ui-lib";

const settings = () => {
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  return (
    <View>
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
          onPress={() => setIsVisibleModal(!isVisibleModal)}
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
            onPress={() => setIsVisibleModal(!isVisibleModal)}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/screens/settings/aboutApp")}
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
            // onPress={() => router.push("/screens/users/userAddress")}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/screens/settings/FAQ")}
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
            onPress={() => router.push("/screens/settings/FAQ")}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>
      </View>

      {/* ================= Privacy modal ================ */}

      <Dialog
        width={"100%"}
        height={"40%"}
        visible={isVisibleModal}
        containerStyle={tw`flex-1 bg-white rounded-t-3xl `}
        onDismiss={() => setIsVisibleModal(false)}
        panDirection={PanningProvider.Directions.DOWN}
        bottom={true}
      >
        <View>
          <View style={tw`flex-row justify-between items-center mt-6 mx-6`}>
            <Text> </Text>
            <Text style={tw`font-PoppinsMedium text-xl text-black`}>
              Privacy
            </Text>
            <Pressable
              style={tw``}
              onPress={() => setIsVisibleModal(!isVisibleModal)}
            >
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
              // onPress={() => setIsVisibleModal(!isVisibleModal)}
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
                onPress={() => setIsVisibleModal(!isVisibleModal)}
                style={tw`py-2.5 px-3.5 bg-[#ECFFF1] rounded-full`}
              >
                <SvgXml xml={IconGetterThen} />
              </Pressable>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => setIsVisibleModal(!isVisibleModal)}
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
                onPress={() => setIsVisibleModal(!isVisibleModal)}
                style={tw`py-2.5 px-3.5 bg-[#ECFFF1] rounded-full`}
              >
                <SvgXml xml={IconGetterThen} />
              </Pressable>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog>
    </View>
  );
};

export default settings;
