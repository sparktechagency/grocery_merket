import { View, Text, TextInput } from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import TButton from "@/src/lib/buttons/TButton";
import InputText from "@/src/lib/inputs/InputText";
import { IconSearch } from "@/assets/icon";

const priceComparison = () => {
  const [number, onChangeNumber] = React.useState("");
  return (
    <View style={tw`flex-1 mx-5`}>
      <BackWithComponent
        onPress={() => router.back()}
        title="Price Comparison"
      />

      <View style={tw`flex-1 flex-wrap justify-between `}>
        <InputText
          //   value={value}
          //   onChangeText={(test) => onChange(test)}
          //   onBlur={onBlur}
          touched
          svgFirstIcon={IconSearch}
          textInputProps={{
            placeholder: "Search for Product",
          }}
          containerStyle={tw`rounded-full mt-4`}
        />

        <View style={tw`w-full  rounded-full my-3`}>
          <TButton
            onPress={() =>
              router.push("/user/priceComparison/priceComparisonProduct")
            }
            title="Search"
            containerStyle={tw`rounded-full `}
          />
        </View>
      </View>
    </View>
  );
};

export default priceComparison;
