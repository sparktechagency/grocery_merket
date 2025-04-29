import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useRouter } from "expo-router";
import { Logo } from "@/assets/images";
import tw from "@/src/lib/tailwind";
import InputText from "@/src/lib/inputs/InputText";
import { IconEyes, IconGoogle, IconNext, IconNextCorner } from "@/assets/icon";
import TButton from "@/src/lib/buttons/TButton";
import { SvgXml } from "react-native-svg";

const singUp = () => {
  const route = useRouter();
  const [isSelected, setSelection] = React.useState(false);
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
  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <View style={tw`px-6 flex-1 justify-center bg-white items-center`}>
        <View>
          <Image source={Logo} />
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
                  placeholder: "Benjamin Wilkison",
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
                label="Email & Phone"
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
                label="Password"
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.password?.message}
                textInputProps={{
                  placeholder: "******",
                }}
                svgSecondIcon={IconEyes}
                containerLayoutStyle={tw`mb-3`}
              />
            )}
            name="password"
          />

          <View style={tw`rounded-full h-12`}>
            <TButton
              // onPress={handleSubmit(onSubmit)}
              onPress={() => route.push("/drawer/home")}
              title="Register"
              containerStyle={tw`rounded-md`}
            />
          </View>
          <View style={tw`flex-row items-center my-6`}>
            <View style={tw`flex-1 h-px bg-gray-300`} />
            <Text style={tw`mx-3 text-gray-500 font-medium`}>or</Text>
            <View style={tw`flex-1 h-px bg-gray-300`} />
          </View>

          <View style={tw`w-72 mx-auto`}>
            <Pressable
              style={tw`flex-row justify-between items-center-center py-3 px-5 border border-[#1E1E1E] rounded-md`}
            >
              <View style={tw` flex-row gap-3`}>
                <SvgXml xml={IconGoogle} />
                <Text>Continue with Google </Text>
              </View>
              <SvgXml xml={IconNextCorner} />
            </Pressable>
          </View>
        </View>
      </View>
      <View
        style={tw`flex-row justify-between items-center bg-white px-6 pb-6`}
      >
        <Text style={tw` text-sm font-PoppinsRegular text-black`}>
          Already have an account?
        </Text>
        <Link style={tw`text-black font-PoppinsMedium flex-row`} href={"/auth"}>
          Login
          <SvgXml style={tw`ml-2`} xml={IconNext} />
        </Link>
      </View>
    </>
  );
};

export default singUp;
