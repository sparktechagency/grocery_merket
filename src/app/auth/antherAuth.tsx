import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ImgFaceScanWhite, ImgFingerScanWhite } from "@/assets/images";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import { useRole } from "@/src/hook/useRole";

const antherAuth = () => {
  const role = useRole();
  return (
    <View style={tw`flex-1 justify-center px-6`}>
      <View style={tw` justify-between text-center h-[70%] `}>
        <View style={tw`flex-row justify-center items-center gap-3`}>
          <View style={tw`p-5 bg-primary rounded-3xl`}>
            <Image style={tw`w-10 h-10`} source={ImgFingerScanWhite} />
          </View>
          <View style={tw`p-5 bg-primary rounded-3xl`}>
            <Image style={tw`w-10 h-10`} source={ImgFaceScanWhite} />
          </View>
        </View>
        <Text style={tw`font-PoppinsSemiBold text-xl text-black text-center`}>
          Add Fingerprint and facial authentication for better security
        </Text>

        <View style={tw`flex-row justify-between items-center`}>
          <TouchableOpacity
            onPress={() => {
              if (role === "user") {
                router.replace("/user/drawer/home");
              } else if (role === "shopper") {
                router.replace("/shopper/home/home");
              }
            }}
            style={tw`px-7 py-3 bg-[#dbdada] rounded-lg`}
          >
            <Text style={tw`font-PoppinsMedium text-base text-[#5802D0]`}>
              Skip
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/auth/addFingerPrint")}
            style={tw`px-8 py-3 bg-primary rounded-lg`}
          >
            <Text style={tw`font-PoppinsMedium text-base text-white`}>
              Add Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default antherAuth;
