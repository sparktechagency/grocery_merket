import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import tw from "@/src/lib/tailwind";
import InputText from "@/src/lib/inputs/InputText";
import { IconEyes, IconEyesShow, IconNext } from "@/assets/icon";
import { Checkbox } from "react-native-ui-lib";
import TButton from "@/src/lib/buttons/TButton";
import { Logo } from "@/assets/images";
import { SvgXml } from "react-native-svg";
import { useRole } from "@/src/hook/useRole";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoginMutation } from "@/src/redux/apiSlices/authSlices";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
const login = () => {
  const [isShow, setIsShow] = React.useState<boolean>(false);
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const role = useRole();

  // -------------------------- all api --------------------------
  const [credentials, { isLoading, isError }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: any) => {
    console.log(data, " onSubmit data");
    try {
      if (isChecked === true) {
        await AsyncStorage.setItem("loginInfo", JSON.stringify(data));
      }
      const response = await credentials(data).unwrap();
      if (response) {
        await AsyncStorage.setItem("token", response?.token);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Login Successful",
          textBody: "Welcome back!",
        });
        router.replace(
          role === "shopper" ? "/shopper/home/home" : "/user/drawer/home"
        );
      }
    } catch (error) {
      console.log(error, "Login error ----->");
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Login Failed",
        textBody: "Please check your credentials and try again.",
      });
    }
  };

  const handleCheckBox = async () => {
    setIsChecked(!isChecked);
    try {
      await AsyncStorage.setItem("check", JSON.stringify(isChecked));
    } catch (error) {
      console.log(error, "User Info Storage not save ---->");
    }
  };
  return (
    <View style={tw`flex-1 bg-base`}>
      <ScrollView
        contentContainerStyle={tw`flex-grow px-5 justify-center`}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={tw` flex-1 justify-center  items-center`}>
          <View style={tw`mb-4`}>
            <Image style={tw`w-36 h-36 mx-auto`} source={Logo} />
            {role === "shopper" ? (
              <Text style={tw`font-PoppinsSemiBold text-xl text-black mx-auto`}>
                Login as a shopper
              </Text>
            ) : (
              <Text style={tw`font-PoppinsSemiBold text-xl text-black mx-auto`}>
                Login as a User
              </Text>
            )}
          </View>
          <View style={tw`w-full gap-2`}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please input valid email",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="Email "
                  value={value}
                  onChangeText={(test) => onChange(test)}
                  onBlur={onBlur}
                  touched
                  errorText={errors?.email?.message}
                  textInputProps={{
                    placeholder: "madhab@gmail.com",
                  }}
                  containerStyle={tw``}
                />
              )}
              name="email"
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
                  label="Password"
                  value={value}
                  onChangeText={(test) => onChange(test)}
                  onBlur={onBlur}
                  touched
                  errorText={errors?.password?.message}
                  textInputProps={{
                    placeholder: "******",

                    secureTextEntry: isShow ? false : true,
                  }}
                  secureTextEntry={isShow ? false : true}
                  svgSecondIcon={isShow ? IconEyesShow : IconEyes}
                  svgSecondOnPress={() => setIsShow(!isShow)}
                  containerLayoutStyle={tw`mb-3`}
                />
              )}
              name="password"
            />

            <View style={tw`flex-row justify-between mb-10`}>
              <View style={tw`flex-row gap-2 items-center rounded-none`}>
                <TouchableOpacity
                  onPress={() => handleCheckBox()}
                  style={tw.style(
                    `border w-5 h-5  justify-center items-center rounded-sm`,
                    isChecked ? `bg-primary border-0` : `bg-transparent`
                  )}
                >
                  {isChecked ? (
                    <Text style={tw`text-white text-sm`}>✔</Text>
                  ) : null}
                </TouchableOpacity>
                <Text>Remember me</Text>
              </View>
              <Text
                style={tw`text-black border-b text-[12px] font-PoppinsRegular`}
              >
                <Link href={"/auth/forgetPassword"}>Forget password?</Link>
              </Text>
            </View>

            <View style={tw`rounded-full h-12`}>
              <TButton
                onPress={handleSubmit(onSubmit)}
                isLoading={isLoading}
                title="Sign in"
                containerStyle={tw`rounded-md`}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={tw`flex-row justify-between items-center bg-white px-5 pb-6 `}
      >
        <Text style={tw` text-sm font-PoppinsRegular text-black`}>
          Don’t have an account?
        </Text>
        <Link
          style={tw`text-black font-PoppinsMedium flex-row`}
          href={"/auth/singUp"}
        >
          Register
          <SvgXml style={tw`ml-2`} xml={IconNext} />
        </Link>
      </View>
    </View>
  );
};

export default login;
