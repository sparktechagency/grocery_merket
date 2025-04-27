import { View, Text, Image } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import tw from "@/src/lib/tailwind";
import InputText from "@/src/lib/inputs/InputText";
import { IconEyes, IconNext } from "@/assets/icon";
import { Checkbox } from "react-native-ui-lib";
import TButton from "@/src/lib/buttons/TButton";
import { Logo } from "@/assets/images";
import { SvgXml } from "react-native-svg";
const login = () => {
  const route = useRouter();
  const [isSelected, setSelection] = React.useState(false);
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

          <View style={tw`flex-row justify-between mb-10`}>
            <View style={tw`flex-row gap-2 items-center rounded-none`}>
              <Checkbox
                value={isSelected}
                onValueChange={setSelection}
                style={tw`w-4 h-4 border-black rounded-none`}
              />
              <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                Remember me
              </Text>
            </View>
            <Text
              style={tw`text-black border-b text-[12px] font-PoppinsRegular`}
            >
              <Link href={"/auth/forgetPassword"}>Forget password?</Link>
            </Text>
          </View>

          <View style={tw`rounded-full h-12`}>
            <TButton
              // onPress={handleSubmit(onSubmit)}
              onPress={() => route.push("/")}
              title="Sign in"
              containerStyle={tw`rounded-md`}
            />
          </View>
        </View>
      </View>
      <View
        style={tw`flex-row justify-between items-center bg-white px-6 pb-6`}
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
