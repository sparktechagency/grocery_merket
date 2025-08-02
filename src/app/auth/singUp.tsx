import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, router, useRouter } from "expo-router";
import { Logo } from "@/assets/images";
import tw from "@/src/lib/tailwind";
import InputText from "@/src/lib/inputs/InputText";
import {
  IconEyes,
  IconEyesShow,
  IconGoogle,
  IconNext,
  IconNextCorner,
} from "@/assets/icon";
import TButton from "@/src/lib/buttons/TButton";
import { SvgXml } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRegisterMutation } from "@/src/redux/apiSlices/authSlices";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useRole } from "@/src/hook/useRole";

const singUp = () => {
  const role = useRole();
  const [isShow, setIsShow] = React.useState<boolean>(false);
  const [roleData, setRoleData] = React.useState("");

  // -------------------------- all api --------------------------
  const [userData] = useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      role: roleData || role,
    };
    try {
      const response = await userData(payload).unwrap();
      //  await AsyncStorage.setItem("loginInfo", JSON.stringify(data));
      if (response) {
        console.log(response, "Registration response ----->");
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Registration Successful",
          textBody: "Welcome aboard!",
        });
        router.replace({
          pathname: "/auth/OTPCode",
          params: { email: response?.user?.email },
        });
      }
    } catch (error) {
      console.log(error, "Registration error ----->");
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Registration Failed",
        textBody: "Please check your details and try again.",
      });
    }
  };

  // ----------- get user  role -----------------
  // Retrieve on mount
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
    <View style={tw`flex-1 bg-base`}>
      <ScrollView
        contentContainerStyle={tw`flex-grow px-5 justify-center`}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={tw`flex-1 justify-center items-center`}>
          <View style={tw` mb-4`}>
            <Image style={tw`w-36 h-36 mx-auto`} source={Logo} />
            {roleData === "shopper" ? (
              <Text style={tw`font-PoppinsSemiBold text-xl text-black mx-auto`}>
                Register as a shopper
              </Text>
            ) : (
              <Text style={tw`font-PoppinsSemiBold text-xl text-black mx-auto`}>
                Register as a User
              </Text>
            )}
          </View>
          <View style={tw`w-full gap-2`}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Enter Your Username",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="Name"
                  value={value}
                  onChangeText={(test) => onChange(test)}
                  onBlur={onBlur}
                  touched
                  errorText={errors?.name?.message}
                  textInputProps={{
                    placeholder: "Madhab Mozumder",
                  }}
                  containerStyle={tw``}
                />
              )}
              name="name"
            />
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
                    placeholder: "example@gmail.com",
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

            <View style={tw`rounded-full h-12`}>
              <TButton
                onPress={handleSubmit(onSubmit)}
                // onPress={() => router.push("/auth/antherAuth")}
                title="Register"
                containerStyle={tw`rounded-md`}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={tw`flex-row justify-between items-center  px-6 pb-6`}>
        <Text style={tw` text-sm font-PoppinsRegular text-black`}>
          Already have an account?
        </Text>
        <Link style={tw`text-black font-PoppinsMedium flex-row`} href={"/auth"}>
          Login
          <SvgXml style={tw`ml-2`} xml={IconNext} />
        </Link>
      </View>
    </View>
  );
};

export default singUp;
