import { View, Text, Image } from "react-native";
import React from "react";
import tw from "@/src/lib/tailwind";
import TButton from "@/src/lib/buttons/TButton";
import { router } from "expo-router";
import {
  ImgShopperChngPassSuccess,
  ImgUserChngPassSuccess,
} from "@/assets/images";
import AsyncStorage from "@react-native-async-storage/async-storage";

const resetPassSuccess = () => {
  const [roleData, setRoleData] = React.useState("");
  // ----------- get user  role -----------------
  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem("role");
      const role = value ? JSON.parse(value) : null;
      setRoleData(role);
    } catch (e) {
      console.error("Error reading role from AsyncStorage", e);
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);
  return (
    <View style={tw`flex-1 justify-center items-center px-5`}>
      <View style={tw`items-center`}>
        <Image
          source={
            roleData === "shopper"
              ? ImgShopperChngPassSuccess
              : ImgUserChngPassSuccess
          }
        />
        <Text
          style={tw`font-PoppinsSemiBold text-base mx-auto mt-6 mb-4 ${
            roleData === "shopper" ? "text-primaryShopper" : "text-primary"
          }`}
        >
          Password reset Successful
        </Text>
      </View>

      <View style={tw`rounded-full w-full h-12`}>
        <TButton
          // onPress={handleSubmit(onSubmit)}

          onPress={() => router.push("/role/role")}
          title="Back To Login"
          containerStyle={tw`w-full rounded-md ${
            roleData === "shopper" ? "bg-primaryShopper" : "bg-primary"
          } `}
        />
      </View>
    </View>
  );
};

export default resetPassSuccess;
