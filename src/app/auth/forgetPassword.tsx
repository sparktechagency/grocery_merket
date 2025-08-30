import { View, Text } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import InputText from "@/src/lib/inputs/InputText";
import tw from "@/src/lib/tailwind";
import TButton from "@/src/lib/buttons/TButton";
import { router } from "expo-router";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { useForgotPasswordMutation } from "@/src/redux/apiSlices/authSlices";

const forgetPassword = () => {
  // -------------------------- all api --------------------------
  const [email] = useForgotPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data: any) => {
    try {
      const response = await email(data).unwrap();
      if (response) {
        console.log(response, "Email sent successfully");
        router.push({
          pathname: "/auth/forgetOtpCode",
          params: { email: data.email },
        });
      }
    } catch (error) {
      console.log(error, "Error in submitting email");
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };

  return (
    <View style={tw`flex-1 flex-grow justify-between `}>
      <View>
        <BackWithComponent
          onPress={() => router.back()}
          title="Forgot Password?"
        />

        <View style={tw`px-5 mt-6`}>
          <Text
            style={tw`font-PoppinsRegular text-sm text-regularText mb-3 mt-16`}
          >
            Enter your email address to verify it’s you. We will send a code to
            this email.
          </Text>

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
                inputStyle={tw`text-black`}
                placeholderStyle={tw`text-regularText`}
                containerStyle={tw`rounded-md`}
              />
            )}
            name="email"
          />
        </View>
      </View>
      <View style={tw`rounded-full mt-6 h-12 px-5 mb-6`}>
        <TButton
          onPress={handleSubmit(onSubmit)}
          // onPress={() => router.push({
          //   pathname: "/auth/OTPCode",
          // })}
          title="Send code"
          containerStyle={tw`rounded-md`}
          titleStyle={tw`font-PoppinsSemiBold text-lg`}
        />
      </View>
    </View>
  );
};

export default forgetPassword;
