import { View, Text } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import InputText from "@/src/lib/inputs/InputText";
import tw from "@/src/lib/tailwind";
import TButton from "@/src/lib/buttons/TButton";
import { router } from "expo-router";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";

const forgetPassword = () => {
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
  const onSubmit = (data: any) => console.log(data);

  console.log(errors);

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent
        onPress={() => router.back()}
        title="Forgot Password?"
      />

      <View style={tw`px-5`}>
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
              containerStyle={tw``}
            />
          )}
          name="email"
        />
        <View style={tw`rounded-full mt-6 h-12`}>
          <TButton
            // onPress={handleSubmit(onSubmit)}
            onPress={() => router.push("/auth/OTPCode")}
            title="Send code"
            containerStyle={tw`rounded-md`}
            titleStyle={tw`font-PoppinsSemiBold text-lg`}
          />
        </View>
      </View>
    </View>
  );
};

export default forgetPassword;
