import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import TButton from "@/src/lib/buttons/TButton";
import InputText from "@/src/lib/inputs/InputText";
import { Controller, useForm } from "react-hook-form";
import { SvgXml } from "react-native-svg";
import { IconEdit } from "@/assets/icon";
import { ImgProfileImg } from "@/assets/images";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";

const editUserDetails = () => {
  const [roleData, setRoleData] = React.useState("");

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
  // const onSubmit = (data: any) => console.log(data);

  // console.log(errors);

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
        contentContainerStyle={tw`pb-6`}
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

          <View style={tw`mx-5 flex-1 items-center gap-3`}>
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
                  value={value}
                  onChangeText={(test) => onChange(test)}
                  onBlur={onBlur}
                  touched
                  errorText={errors?.name?.message}
                  placeholder="Benjamin Wilkison"
                  placeholderStyle={tw`text-gray-900`}
                  inputStyle={tw`font-PoppinsRegular `}
                  textXOutRangeFirst={10}
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
                  value={value}
                  onChangeText={(test) => onChange(test)}
                  onBlur={onBlur}
                  touched
                  errorText={errors?.phone?.message}
                  placeholder="+95632587456"
                  inputStyle={tw`font-PoppinsRegular`}
                  textXOutRangeFirst={10}
                  containerStyle={tw`rounded-full`}
                  placeholderStyle={tw`text-gray-900`}
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
                  value={value}
                  onChangeText={(test) => onChange(test)}
                  onBlur={onBlur}
                  touched
                  errorText={errors?.location?.message}
                  placeholder="Kodiak Island"
                  inputStyle={tw`font-PoppinsRegular`}
                  containerStyle={tw`rounded-full`}
                  placeholderStyle={tw`text-gray-900`}
                  textXOutRangeFirst={10}
                />
              )}
              name="location"
            />
          </View>
        </View>
      </ScrollView>
      <View style={tw`w-full pb-6`}>
        <TButton
          // onPress={handleSubmit(onSubmit)}
          onPress={() =>
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Success",
              textBody: "Congrats! Your Profile Update success!",
            })
          }
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
