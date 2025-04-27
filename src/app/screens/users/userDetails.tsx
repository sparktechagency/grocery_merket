import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ImgProfileImg } from "@/assets/images";
import { Controller, useForm } from "react-hook-form";
import InputText from "@/src/lib/inputs/InputText";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconEdit } from "@/assets/icon";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import TButton from "@/src/lib/buttons/TButton";

const userDetails = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      location: "",
    },
  });
  const onSubmit = (data: any) => console.log(data);

  console.log(errors);

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"My Account"} />

      <View style={tw`relative mx-auto my-10`}>
        <Image style={tw`w-24 h-24 rounded-full`} source={ImgProfileImg} />
        <TouchableOpacity
          style={tw`absolute bottom-1 right-1 w-6 h-6  border-2 justify-center items-center border-white shadow-sm bg-primary rounded-full`}
        >
          <SvgXml xml={IconEdit} />
        </TouchableOpacity>
      </View>

      <View style={tw`mx-5`}>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Name is required",
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
                placeholder: "Benjamin Wilkison",
              }}
              containerStyle={tw`rounded-full`}
            />
          )}
          name="name"
        />
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Name is required",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label="Phone"
              value={value}
              onChangeText={(test) => onChange(test)}
              onBlur={onBlur}
              touched
              errorText={errors?.phone?.message}
              textInputProps={{
                placeholder: "+95632587456",
              }}
              containerStyle={tw`rounded-full`}
            />
          )}
          name="phone"
        />
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Name is required",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label="Location"
              value={value}
              onChangeText={(test) => onChange(test)}
              onBlur={onBlur}
              touched
              errorText={errors?.location?.message}
              textInputProps={{
                placeholder: "Kodiak Island",
              }}
              containerStyle={tw`rounded-full`}
            />
          )}
          name="location"
        />
      </View>

      <TButton
        // onPress={handleSubmit(onSubmit)}
        onPress={() => router.push("/screens/users/editUserDetails")}
        title="Edit"
        containerStyle={tw`rounded-md mx-6  mt-10`}
      />
    </View>
  );
};

export default userDetails;
