import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { SvgXml } from "react-native-svg";
import {
  IconGetterThen,
  IconLogOut,
  IconOrderShopper,
  IconPersonalShopper,
  IconPrivacyPolicyShopper,
  IconProfileShopper,
  IconSettingsShopper,
  IconTeliphone,
} from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetProfileQuery } from "@/src/redux/apiSlices/profileSlieces";
import { Image } from "expo-image";
import { ImgNoShopper } from "@/assets/images";
import { useLogoutMutation } from "@/src/redux/apiSlices/authSlices";

const profileShopper = () => {
  // =-================== apis =====================
  const { data: getUserProfileData } = useGetProfileQuery({});
  const [logout] = useLogoutMutation();

  const removeRoleData = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      await logout(token).unwrap();
      await AsyncStorage.removeItem("role");
      await AsyncStorage.removeItem("token");
      router.replace("/role/role");
    } catch (e) {
      // remove error
      console.log("Error reading role from AsyncStorage", e);
      router.push({
        pathname: "/Toaster",
        params: { res: e?.message || e },
      });
    }
  };

  return (
    <View style={tw`flex-1 mx-4 gap-5`}>
      <View
        style={tw` flex-row justify-start items-center bg-primaryShopper rounded-xl px-4 py-6 mt-5 gap-3 `}
      >
        <View style={tw`w-20 h-20`}>
          <Image
            style={tw`w-20 h-20 rounded-full `}
            source={ImgNoShopper}
            contentFit="contain"
          />
        </View>

        <View>
          <Text style={tw`text-white font-PoppinsRegular text-sm my-2`}>
            {getUserProfileData?.user?.name
              ? getUserProfileData?.user?.name
              : "No Name"}
          </Text>

          {getUserProfileData?.user?.phone ? (
            <View style={tw`flex-row gap-1 `}>
              <SvgXml xml={IconTeliphone} />
              <Text style={tw`text-white font-PoppinsRegular text-sm `}>
                {getUserProfileData?.user?.phone}
              </Text>
            </View>
          ) : (
            <Text style={tw`text-white font-PoppinsRegular text-sm `}>
              No Phone
            </Text>
          )}

          <Text style={tw`text-white font-PoppinsSemiBold text-sm mt-1`}>
            Total: {getUserProfileData?.user?.total_delivery} deliveries
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
          onPress={() => router.push("/shopper/profile/myOrderStatus")}
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
            onPress={() => router.push("/shopper/profile/myOrderStatus")}
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
