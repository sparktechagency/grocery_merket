import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "@/src/lib/tailwind";
import { OtpInput } from "react-native-otp-entry";
import { Link, router } from "expo-router";
import TButton from "@/src/lib/buttons/TButton";
import { PrimaryColor } from "@/utils/utils";
import BackWithTitle from "@/src/lib/backHeader/BackWithTitle";

const OTPCode = () => {
  return (
    <View style={tw`flex-1`}>
      <BackWithTitle onPress={() => router.back()} title="Verify code" />

      <View style={tw`px-6 flex-1 justify-center items-center`}>
        <Text style={tw`font-PoppinsRegular text-sm text-regularText mb-11`}>
          Enter the code we have sent to your email.
        </Text>

        <View style={tw`w-full`}>
          <Text style={tw`mb-1`}>Password</Text>
          <View style={tw`flex-row gap-5`}>
            <OtpInput
              numberOfDigits={6}
              focusColor={PrimaryColor}
              autoFocus={false}
              hideStick={true}
              placeholder="0"
              blurOnFilled={true}
              disabled={false}
              type="numeric"
              secureTextEntry={false}
              focusStickBlinkingDuration={500}
              // onFocus={() => console.log("Focused")}
              // onBlur={() => console.log("Blurred")}
              // onTextChange={(text) => console.log(text)}
              onFilled={async (text) => {
                console.log(`OTP is ${text}`);
                router.push("/");
              }}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: tw`rounded-md mb-2`,
                pinCodeContainerStyle: tw`h-12 w-[46px] justify-center items-center bg-white rounded-lg `,
                pinCodeTextStyle: tw`text-[#262626] text-2xl font-DegularDisplaySemibold `,
                placeholderTextStyle: tw`text-[#6D6D6D] text-2xl font-DegularDisplaySemibold`,
              }}
            />
          </View>

          <View style={tw`rounded-full h-12 w-full mt-10`}>
            <TButton
              onPress={() => router.navigate("/")}
              title="Verify"
              containerStyle={tw`rounded-md`}
              titleStyle={tw`font-PoppinsSemiBold text-lg`}
            />
          </View>

          <View style={tw`flex-row justify-between items-center mt-5`}>
            <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
              Didn’t receive a code?{" "}
            </Text>
            <TouchableOpacity style={tw``}>
              <Link
                href={"/"}
                style={tw`text-primary font-semibold text-[12px]`}
              >
                Send Again
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OTPCode;
