import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import TButton from "@/src/lib/buttons/TButton";
import { SvgXml } from "react-native-svg";
import { IconEdit } from "@/assets/icon";
import { ImgProfileImg } from "@/assets/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/src/redux/apiSlices/profileSlieces";

const editUserDetails = () => {
  const [roleData, setRoleData] = React.useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(null);
  // ------------------ all api --------------------
  const { data: profileDataRead } = useGetProfileQuery({});
  const [profileData, { isLoading }] = useUpdateProfileMutation();

  //  ------------------ update user profile data ---------------

  const handleEditProfile = async () => {
    try {
      const userData = {
        name: name ? name : profileDataRead?.user?.name,
        phone: phone ? phone : profileDataRead?.user?.phone,
        address: address ? address : profileDataRead?.user?.address,
      };
      const response = await profileData(userData).unwrap();
      if (response.status) {
        router.replace("/user/users/userDetails");
      }
    } catch (error) {
      console.log(error, "Edit profile update not success .");
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };

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
  }, []);

  return (
    <View style={tw`flex-1  bg-white`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={"My Account"}
        fastComponentContentStyle={tw`shadow-lg`}
        // containerStyle={tw`shadow-xl border`}
      />
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`pb-6 px-4`}
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

          <View style={tw`gap-4`}>
            <View>
              <Text style={tw`font-PoppinsMedium text-lg text-black ml-2`}>
                Name
              </Text>
              <View
                style={tw` bg-gray-200 rounded-full w-full h-12 flex-row justify-start items-center  px-4`}
              >
                <TextInput
                  onChangeText={(text) => setName(text)}
                  defaultValue={profileDataRead?.user?.name}
                  style={tw`flex-1 text-base`}
                />
              </View>
            </View>

            <View>
              <Text style={tw`font-PoppinsMedium text-lg text-black ml-2`}>
                Phone
              </Text>
              <View
                style={tw` bg-gray-200 rounded-full w-full h-12 flex-row justify-start items-center  px-4`}
              >
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(text) => setPhone(text)}
                  defaultValue={profileDataRead?.user?.phone}
                  style={tw`flex-1 text-base`}
                />
              </View>
            </View>

            <View>
              <Text style={tw`font-PoppinsMedium text-lg text-black ml-2`}>
                Address
              </Text>
              <View
                style={tw` bg-gray-200 rounded-full w-full h-12 flex-row justify-start items-center  px-4`}
              >
                <TextInput
                  onChangeText={(text) => setAddress(text)}
                  defaultValue={profileDataRead?.user?.address}
                  style={tw`flex-1 text-base`}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={tw`w-full pb-6`}>
        <TButton
          isLoading={isLoading}
          onPress={() => handleEditProfile()}
          title="save & change"
          containerStyle={tw`rounded-full mx-6  mt-10 ${
            roleData === "user" ? "bg-primary" : "bg-primaryShopper"
          }`}
        />
      </View>
    </View>
  );
};
export default editUserDetails;
