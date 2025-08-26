import { View, Text, TouchableOpacity } from "react-native";
import tw from "@/src/lib/tailwind";
import { OtpInput } from "react-native-otp-entry";
import { router, useLocalSearchParams } from "expo-router";
import { PrimaryColor } from "@/utils/utils";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import {
  useResendOTPMutation,
  useVerifyingOTPMutation,
} from "@/src/redux/apiSlices/authSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OTPCode = () => {
  const [otpData] = useVerifyingOTPMutation();
  const { email } = useLocalSearchParams();
  const [resendOtp] = useResendOTPMutation();

  const handleResendOtp = async () => {
    try {
      const response = await resendOtp({ email }).unwrap();
      if (response) {
        router.push({
          pathname: "/Toaster",
          params: { res: "OTP resent again" },
        });
      }
    } catch (error) {
      console.log("Error resending OTP:", error);
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };

  const handleOtpFilled = async (otp: string) => {
    try {
      const response = await otpData({ otp }).unwrap();
      if (response) {
        await AsyncStorage.setItem("token", response?.token);
        router.replace(
          response?.user?.role === "shopper"
            ? "/shopper/home/home"
            : "/user/drawer/home"
        );
      }
    } catch (error) {
      console.log("Error handling OTP filled:", error);
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title="Verify code" />

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
              // onTextChange={(text) => console.log(text)}s
              onFilled={async (text) => {
                handleOtpFilled(text);
              }}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: tw`rounded-md mb-2`,
                pinCodeContainerStyle: tw`h-12 w-[46px] justify-center items-center bg-white rounded-lg `,
                pinCodeTextStyle: tw`text-[#262626] text-2xl font-PoppinsSemiBold `,
                placeholderTextStyle: tw`text-[#6D6D6D] text-2xl font-PoppinsSemiBold`,
              }}
            />
          </View>

          <View style={tw`flex-row justify-between items-center mt-5`}>
            <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
              Didn’t receive a code?{" "}
            </Text>
            <TouchableOpacity onPress={() => handleResendOtp()} style={tw``}>
              <Text style={tw`text-primary font-semibold text-[12px]`}>
                Send Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OTPCode;
