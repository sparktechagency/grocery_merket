import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router, useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import InputText from "@/src/lib/inputs/InputText";
import { IconEyes, IconEyesShow } from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import TButton from "@/src/lib/buttons/TButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useChangePasswordMutation } from "@/src/redux/apiSlices/authSlices";

const changePassword = () => {
  const [roleData, setRoleData] = React.useState("");
  const [showEyeNew, setShowEyeNew] = useState(false);
  const [showEyeConfirm, setShowEyeConfirm] = useState(false);

  const { email } = useLocalSearchParams();

  //  ------------ all api ---------------- #
  const [passwordData, { isLoading }] = useChangePasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new_password: "",
      confirmed_password: "",
    },
  });
  const onSubmit = async (data: any) => {
    try {
      const payload = {
        email: email,
        new_password: data.new_password,
        confirmed_password: data.confirmed_password,
      };
      const response = await passwordData({ payload }).unwrap();
      console.log(response, "this is response----------->");
      if (response.status) {
        router.replace("/auth/resetPassSuccess");
      }
    } catch (error) {
      console.log(error, "New password not added .");
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };

  // ----------- get user  role -----------------
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
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={"Change password"}
        fastComponentContentStyle={tw`shadow-lg`}
      />
      <View style={tw`mx-5 flex-1 justify-between pb-6`}>
        <ScrollView
          // keyboardShouldPersistTaps=""
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`py-3 pb-6`}
        >
          <View style={tw`gap-4`}>
            <View>
              <Text style={tw` text-regularText text-sm`}>
                Enter your new password
              </Text>
            </View>
            <Controller
              control={control}
              rules={{
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: "Please spacial char password",
                },
                required: {
                  value: true,
                  message: "Password is required",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  value={value}
                  onChangeText={(test) => onChange(test)}
                  onBlur={onBlur}
                  touched
                  errorText={errors?.new_password?.message}
                  placeholder="New Password"
                  textInputProps={{
                    secureTextEntry: showEyeNew ? false : true,
                  }}
                  secureTextEntry={showEyeNew ? false : true}
                  svgSecondIcon={showEyeNew ? IconEyesShow : IconEyes}
                  svgSecondOnPress={() => setShowEyeNew(!showEyeNew)}
                  containerStyle={tw`rounded-xl `}
                  inputStyle={tw`font-PoppinsRegular`}
                  placeholderStyle={tw`text-gray-700`}
                />
              )}
              name="new_password"
            />
            <Controller
              control={control}
              rules={{
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: "Please spacial char password",
                },
                required: {
                  value: true,
                  message: "Password is required",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  value={value}
                  onChangeText={(test) => onChange(test)}
                  onBlur={onBlur}
                  touched
                  errorText={errors?.confirmed_password?.message}
                  placeholder="Confirm Password"
                  textInputProps={{
                    secureTextEntry: showEyeConfirm ? false : true,
                  }}
                  secureTextEntry={showEyeConfirm ? false : true}
                  svgSecondIcon={showEyeConfirm ? IconEyesShow : IconEyes}
                  svgSecondOnPress={() => setShowEyeConfirm(!showEyeConfirm)}
                  placeholderStyle={tw`text-gray-700`}
                  containerStyle={tw`rounded-xl `}
                  inputStyle={tw`font-PoppinsRegular`}
                  textXOutRangeFirst={5}
                />
              )}
              name="confirmed_password"
            />
          </View>
        </ScrollView>
        <View style={tw`rounded-full`}>
          <TButton
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            // onPress={() => router.push("/auth/resetPassSuccess")}
            title="Update password"
            containerStyle={tw`rounded-xl  ${
              roleData === "user" ? "bg-primary" : "bg-primaryShopper"
            }`}
          />
        </View>
      </View>
    </View>
  );
};

export default changePassword;
