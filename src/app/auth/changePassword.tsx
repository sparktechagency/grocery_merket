import { View, Text } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import InputText from "@/src/lib/inputs/InputText";
import { IconEyes } from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import TButton from "@/src/lib/buttons/TButton";

const changePassword = () => {
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
        title={"Change password"}
      />
      <View style={tw`mx-5 flex-1 justify-between pb-6`}>
        <View>
          <Controller
            control={control}
            rules={{
              pattern: {
                value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message: "Please spacial char password",
              },
              required: {
                value: true,
                message: "Password is required",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="Current password"
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.password?.message}
                textInputProps={{
                  placeholder: "******",
                }}
                svgSecondIcon={IconEyes}
                containerLayoutStyle={tw`mb-1 `}
              />
            )}
            name="password"
          />
          <Controller
            control={control}
            rules={{
              pattern: {
                value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message: "Please spacial char password",
              },
              required: {
                value: true,
                message: "Password is required",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="New password"
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.password?.message}
                textInputProps={{
                  placeholder: "******",
                }}
                svgSecondIcon={IconEyes}
                containerLayoutStyle={tw`mb-1 `}
              />
            )}
            name="password"
          />
          <Controller
            control={control}
            rules={{
              pattern: {
                value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message: "Please spacial char password",
              },
              required: {
                value: true,
                message: "Password is required",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="Confirm new password"
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.password?.message}
                textInputProps={{
                  placeholder: "******",
                }}
                svgSecondIcon={IconEyes}
                containerLayoutStyle={tw`mb-1`}
              />
            )}
            name="password"
          />
        </View>

        <View style={tw`rounded-full`}>
          <TButton
            // onPress={handleSubmit(onSubmit)}
            onPress={() => router.push("/drawer/home")}
            title="Update password"
            containerStyle={tw`rounded-full `}
          />
        </View>
      </View>
    </View>
  );
};

export default changePassword;
