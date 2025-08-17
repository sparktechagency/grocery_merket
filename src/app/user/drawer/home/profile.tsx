import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { ImgProfileImg } from "@/assets/images";
import { SvgXml } from "react-native-svg";
import {
  IconGetterThen,
  IconLocationProfile,
  IconLocationSelected,
  IconLogOut,
  IconMyShopper,
  IconNotificationSelected,
  IconOrderSelected,
  IconProfileSelected,
  IconSettingsSelected,
  IconTeliphone,
  IconTransactionsSelected,
} from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetProfileQuery } from "@/src/redux/apiSlices/profileSlieces";

const profile = () => {
  // =================== all api ----------------------
  const { data: profileData } = useGetProfileQuery({});

  const removeRoleData = async () => {
    try {
      await AsyncStorage.removeItem("role");
      router.push("/role/role");
      console.log("role data removed");
    } catch (e) {
      // remove error
    }
  };

  return (
    <ScrollView style={tw`flex-grow mb-24`}>
      <View style={tw`flex-1 mx-4 gap-5`}>
        <View
          style={tw` flex-row justify-start  bg-primary rounded-xl px-4 py-5 mt-5 gap-3 `}
        >
          <Image style={tw`w-24 h-24 rounded-full `} source={ImgProfileImg} />
          <View>
            <Text style={tw`text-white font-PoppinsRegular text-sm my-2`}>
              {profileData?.data?.name}
            </Text>
            {profileData?.data?.address ? (
              <View style={tw`flex-row gap-1 `}>
                <SvgXml xml={IconLocationProfile} />
                <Text style={tw`text-white font-PoppinsRegular text-sm `}>
                  {profileData?.data?.address}
                </Text>
              </View>
            ) : (
              <Text style={tw`text-sm text-regularText`}>No Address</Text>
            )}
            {profileData?.data?.phone ? (
              <View style={tw`flex-row gap-1 mt-2`}>
                <SvgXml xml={IconTeliphone} />
                <Text style={tw`text-white font-PoppinsRegular text-sm`}>
                  {profileData?.data?.phone}
                </Text>
              </View>
            ) : (
              <Text style={tw`text-sm text-regularText`}>No Phone Number</Text>
            )}
          </View>
        </View>

        <View style={tw`bg-[#e8eaec] p-3.5 rounded-xl  gap-5`}>
          <TouchableOpacity
            onPress={() => router.push("/user/users/userDetails")}
            style={tw`flex-row justify-between items-center w-full`}
          >
            <View style={tw`flex-row justify-start items-center  gap-3`}>
              <View
                style={tw`w-10 h-10 justify-center text-center items-center bg-[#ECFFF1] mr-5 rounded-full`}
              >
                <SvgXml xml={IconProfileSelected} />
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
            onPress={() => router.push("/user/shoppers/myShoppers")}
            style={tw`flex-row justify-between items-center`}
          >
            <View style={tw`flex-row justify-start items-center gap-3`}>
              <View
                style={tw`w-10 h-10 justify-center text-center items-center bg-[#ECFFF1] mr-5 rounded-full`}
              >
                <SvgXml xml={IconMyShopper} />
              </View>
              <Text style={tw`font-PoppinsMedium text-base text-black`}>
                My Shopper
              </Text>
            </View>
            <Pressable
              onPress={() => router.push("/user/shoppers/myShoppers")}
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
                style={tw`w-10 h-10 justify-center text-center items-center bg-[#ECFFF1] mr-5 rounded-full`}
              >
                <SvgXml xml={IconOrderSelected} />
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
            onPress={() => router.push("/user/notification/notification")}
            style={tw`flex-row justify-between items-center w-full`}
          >
            <View style={tw`flex-row justify-start items-center  gap-3`}>
              <View
                style={tw`w-10 h-10 justify-center text-center items-center bg-[#ECFFF1] mr-5 rounded-full`}
              >
                <SvgXml xml={IconNotificationSelected} />
              </View>
              <Text style={tw`font-PoppinsMedium text-base text-black`}>
                Notifications
              </Text>
            </View>
            <Pressable
              onPress={() => router.push("/user/notification/notification")}
              style={tw`py-2.5 px-3.5 bg-white rounded-full`}
            >
              <SvgXml xml={IconGetterThen} />
            </Pressable>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/user/transactions/transactions")}
            style={tw`flex-row justify-between items-center`}
          >
            <View style={tw`flex-row justify-start items-center gap-3`}>
              <View
                style={tw`w-10 h-10 justify-center text-center items-center bg-[#ECFFF1] mr-5 rounded-full`}
              >
                <SvgXml xml={IconTransactionsSelected} />
              </View>
              <Text style={tw`font-PoppinsMedium text-base text-black`}>
                Transactions
              </Text>
            </View>
            <Pressable
              onPress={() => router.push("/user/transactions/transactions")}
              style={tw`py-2.5 px-3.5 bg-white rounded-full`}
            >
              <SvgXml xml={IconGetterThen} />
            </Pressable>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/user/settings/settings")}
            style={tw`flex-row justify-between items-center`}
          >
            <View style={tw`flex-row justify-start items-center gap-3`}>
              <View
                style={tw`w-10 h-10 justify-center text-center items-center bg-[#ECFFF1] mr-5 rounded-full`}
              >
                <SvgXml xml={IconSettingsSelected} />
              </View>
              <Text style={tw`font-PoppinsMedium text-base text-black`}>
                Settings
              </Text>
            </View>
            <Pressable
              onPress={() => router.push("/user/settings/settings")}
              style={tw`py-2.5 px-3.5 bg-white rounded-full`}
            >
              <SvgXml xml={IconGetterThen} />
            </Pressable>
          </TouchableOpacity>
        </View>
        <View style={tw`bg-[#FFE5E5] p-3.5 rounded-xl  gap-5`}>
          <TouchableOpacity
            onPress={() => removeRoleData()}
            style={tw`flex-row justify-between items-center`}
          >
            <View style={tw`flex-row justify-start items-center gap-3`}>
              <View
                style={tw`w-10 h-10 justify-center text-center items-center bg-[#ECFFF1] mr-5 rounded-full`}
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
    </ScrollView>
  );
};

export default profile;
