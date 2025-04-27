import { View, Text } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import TButton from "@/src/lib/buttons/TButton";

const userAddress = () => {
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"Address"} />

      <View style={tw`bg-[#e8eaec] p-3.5 rounded-xl mx-5 shadow-md`}>
        <Text style={tw`font-PoppinsSemiBold text-base text-black mb-2`}>
          Home
        </Text>
        <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
          Kodiak Island
        </Text>
        <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
          Alaska
        </Text>
        <Text style={tw`font-PoppinsSemiBold text-base text-black mb-2`}>
          Mobile:{" "}
          <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
            {" "}
            01254698756
          </Text>
        </Text>
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

export default userAddress;
