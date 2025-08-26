import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { ImgProfileImg } from "@/assets/images";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconEdit } from "@/assets/icon";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import TButton from "@/src/lib/buttons/TButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetProfileQuery } from "@/src/redux/apiSlices/profileSlieces";

const userDetails = () => {
  const [roleData, setRoleData] = React.useState("");
  // --------------------- all api -----------------------
  const { data: profileData } = useGetProfileQuery({});

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem("role");
      const role = value ? JSON.parse(value) : null;
      setRoleData(role);
    } catch (e) {
      console.log("Error reading role from AsyncStorage", e);
    }
  };

  React.useEffect(() => {
    getUserData();
    return () => {};
  }, []);

  return (
    <View style={tw`flex-1  bg-white`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={"My Account"}
        fastComponentContentStyle={tw`shadow-lg`}
      />
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
        style={tw`px-5`}
      >
        <View>
          <View style={tw`relative mx-auto my-10`}>
            <Image style={tw`w-24 h-24 rounded-full`} source={ImgProfileImg} />
            <TouchableOpacity
              style={tw`absolute bottom-1 right-1 w-6 h-6  border-2 justify-center items-center border-white shadow-sm bg-primary rounded-full`}
            >
              <SvgXml xml={IconEdit} />
            </TouchableOpacity>
          </View>

          <View style={tw`flex gap-3`}>
            <View>
              <Text style={tw`font-PoppinsMedium text-lg text-black`}>
                Name
              </Text>
              <View
                style={tw` bg-gray-200 rounded-full w-full h-12 flex-row justify-center items-center  px-4`}
              >
                <Text
                  style={tw`flex-1 font-PoppinsMedium text-base text-regularText `}
                >
                  {profileData?.user?.name}
                </Text>
              </View>
            </View>

            <View>
              <Text style={tw`font-PoppinsMedium text-lg text-black`}>
                Phone
              </Text>
              <View
                style={tw` bg-gray-200 rounded-full w-full h-12 flex-row justify-center items-center  px-4`}
              >
                <Text
                  style={tw`flex-1 font-PoppinsMedium text-base text-regularText `}
                >
                  {profileData?.user?.phone
                    ? profileData?.user?.phone
                    : "No Phone"}
                </Text>
              </View>
            </View>
            <View>
              <Text style={tw`font-PoppinsMedium text-lg text-black`}>
                Address
              </Text>
              <View
                style={tw` bg-gray-200 rounded-full w-full h-12 flex-row justify-center items-center  px-4`}
              >
                <Text
                  style={tw`flex-1 font-PoppinsMedium text-base text-regularText `}
                >
                  {profileData?.user?.address
                    ? profileData?.user?.address
                    : "No Address"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={tw`w-full pb-6`}>
        <TButton
          onPress={() => router.push("/user/users/editUserDetails")}
          title="Edit"
          containerStyle={tw.style(
            "rounded-full mx-6 mt-10",
            roleData === "user" ? "bg-primary" : "bg-primaryShopper"
          )}
        />
      </View>
    </View>
  );
};

export default userDetails;
