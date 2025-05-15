import { View, Text, ScrollView } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import InputText from "@/src/lib/inputs/InputText";
import { IconEyes } from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import TButton from "@/src/lib/buttons/TButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const changePassword = () => {
  const [roleData, setRoleData] = React.useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      confirm_password: "",
      old_password: "",
      new_password: "",
    },
  });
  // const onSubmit = (data: any) => console.log(data);

  // console.log(errors);

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
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={"Change password"}
      />
      <View style={tw`mx-5 flex-1 justify-between pb-6`}>
        <ScrollView
          // keyboardShouldPersistTaps=""
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`py-3 pb-6`}
        >
          <View style={tw`gap-3`}>
            <Controller
              control={control}
              rules={{
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
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
                  focusSTyle={tw`border-blue-500`}
                  errorText={errors?.old_password?.message}
                  placeholderStyle={tw`text-gray-700`}
                  svgSecondIcon={IconEyes}
                  containerStyle={tw`rounded-full `}
                  placeholder="Old Password"
                  inputStyle={tw`font-PoppinsRegular`}
                  textXOutRangeFirst={10}
                />
              )}
              name="old_password"
            />
            <Controller
              control={control}
              rules={{
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
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
                  svgSecondIcon={IconEyes}
                  containerStyle={tw`rounded-full `}
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
                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
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
                  errorText={errors?.password?.message}
                  placeholder="Confirm Password"
                  svgSecondIcon={IconEyes}
                  placeholderStyle={tw`text-gray-700`}
                  containerStyle={tw`rounded-full `}
                  inputStyle={tw`font-PoppinsRegular`}
                  textXOutRangeFirst={5}
                />
              )}
              name="confirm_password"
            />
          </View>
        </ScrollView>
        <View style={tw`rounded-full`}>
          <TButton
            // onPress={handleSubmit(onSubmit)}
            onPress={() => router.push("/auth/resetPassSuccess")}
            title="Update password"
            containerStyle={tw`rounded-full  ${
              roleData === "user" ? "bg-primary" : "bg-primaryShopper"
            }`}
          />
        </View>
      </View>
    </View>
  );
};

export default changePassword;
