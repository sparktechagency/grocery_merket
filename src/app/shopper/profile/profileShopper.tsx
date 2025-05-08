import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { ImgProfileImg } from "@/assets/images";
import { SvgXml } from "react-native-svg";
import {
  IconGetterThen,
  IconLocationProfile,
  IconLocationSelected,
  IconLogOut,
  IconNotificationSelected,
  IconOrderSelected,
  IconOrderShopper,
  IconPersonalShopper,
  IconPrivacyPolicyShopper,
  IconProfileSelected,
  IconProfileShopper,
  IconRightArrow,
  IconSettingsSelected,
  IconSettingsShopper,
  IconTeliphone,
  IconTransactionsSelected,
} from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const profileShopper = () => {
  const removeRoleData = async () => {
    try {
      await AsyncStorage.removeItem("role");
      router.push("/role/role");
    } catch (e) {
      // remove error
    }
  };

  return (
    <View style={tw`flex-1 mx-4 gap-5`}>
      <View
        style={tw` flex-row justify-start items-centers bg-primaryShopper rounded-xl p-7 mt-5 gap-3 `}
      >
        <Image style={tw`w-24 h-24 rounded-full `} source={ImgProfileImg} />
        <View>
          <Text style={tw`text-white font-PoppinsRegular text-sm my-2`}>
            Interior Alaska Shopping Co.
          </Text>
          <View style={tw`flex-row gap-1 `}>
            <SvgXml xml={IconTeliphone} />
            <Text style={tw`text-white font-PoppinsRegular text-sm `}>
              +95632587456
            </Text>
          </View>

          <Text style={tw`text-white font-PoppinsMedium text-lg mt-1`}>
            Total: 500 deliveries
          </Text>
        </View>
      </View>

      <View style={tw`bg-[#e8eaec] p-3.5 rounded-xl  gap-5`}>
        <TouchableOpacity
          onPress={() => router.push("/user/users/userDetails")}
          style={tw`flex-row justify-between items-center w-full`}
        >
          <View style={tw`flex-row justify-start items-center  gap-3`}>
            <View
              style={tw`w-10 h-10 justify-center text-center items-center bg-[#D8EFFF] mr-5 rounded-full`}
            >
              <SvgXml xml={IconProfileShopper} />
            </View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>
              My Account
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/user/users/userDetails")}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/user/users/userOrder")}
          style={tw`flex-row justify-between items-center`}
        >
          <View style={tw`flex-row justify-start items-center gap-3`}>
            <View
              style={tw`w-10 h-10 justify-center text-center items-center bg-[#D8EFFF] mr-5 rounded-full`}
            >
              <SvgXml xml={IconOrderShopper} />
            </View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>
              My orders
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/user/users/userOrder")}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>
      </View>

      <View style={tw`bg-[#e8eaec] p-3.5 rounded-xl  gap-5`}>
        <TouchableOpacity
          onPress={() => router.push("/shopper/profile/privacyAndPolicy")}
          style={tw`flex-row justify-between items-center`}
        >
          <View style={tw`flex-row justify-start items-center gap-3`}>
            <View
              style={tw`w-10 h-10 justify-center text-center items-center bg-[#D8EFFF] mr-5 rounded-full`}
            >
              <SvgXml xml={IconPrivacyPolicyShopper} />
            </View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>
              Privacy policy
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/shopper/profile/privacyAndPolicy")}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/shopper/settings/settings")}
          style={tw`flex-row justify-between items-center`}
        >
          <View style={tw`flex-row justify-start items-center gap-3`}>
            <View
              style={tw`w-10 h-10 justify-center text-center items-center bg-[#D8EFFF] mr-5 rounded-full`}
            >
              <SvgXml xml={IconSettingsShopper} />
            </View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>
              Settings
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/shopper/settings/settings")}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>
      </View>

      <View style={tw`bg-[#e8eaec] p-3.5 rounded-xl  gap-5`}>
        <TouchableOpacity
          onPress={() => router.push("/user/settings/settings")}
          style={tw`flex-row justify-between items-center`}
        >
          <View style={tw`flex-row justify-start items-center gap-3`}>
            <View
              style={tw`w-10 h-10 justify-center text-center items-center bg-[#D8EFFF] mr-5 rounded-full`}
            >
              <SvgXml xml={IconPersonalShopper} />
            </View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>
              Personal Shopper
            </Text>
          </View>
          <Text style={tw`font-PoppinsRegular text-base text-black`}>100</Text>
        </TouchableOpacity>
      </View>
      {/* --------------------- log out button =---------------- */}
      <View style={tw`bg-[#FFE5E5] p-3.5 rounded-xl  gap-5`}>
        <TouchableOpacity
          onPress={() => removeRoleData()}
          style={tw`flex-row justify-between items-center`}
        >
          <View style={tw`flex-row justify-start items-center gap-3`}>
            <View
              style={tw`w-10 h-10 justify-center text-center items-center bg-[#D8EFFF] mr-5 rounded-full`}
            >
              <SvgXml xml={IconLogOut} />
            </View>
            <Text style={tw`font-PoppinsMedium text-base text-black`}>
              Logout
            </Text>
          </View>
          <Pressable
            onPress={() => removeRoleData()}
            style={tw`py-2.5 px-3.5 bg-white rounded-full`}
          >
            <SvgXml xml={IconGetterThen} />
          </Pressable>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default profileShopper;
