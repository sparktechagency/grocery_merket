import { View } from "react-native";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import TButton from "@/src/lib/buttons/TButton";
import InputText from "@/src/lib/inputs/InputText";
import { IconSearch } from "@/assets/icon";
import { useState } from "react";
import { useSearchForPriceComparisonQuery } from "@/src/redux/apiSlices/homePageApiSlices";

const priceComparison = () => {
  const [searchValue, setSearchValue] = useState("");

  // ---------------------- apis -----------------------
  const { data: searchForPriceComparison } = useSearchForPriceComparisonQuery(
    {}
  );

  const handleSearch = async () => {
    try {
      const response = await searchForPriceComparison(searchValue).unwrap();
      if (response) {
        console.log(response, "this is response");

        // router.push({
        //   pathname: "/user/priceComparison/priceComparisonProduct",
        //   params: { searchValue: searchValue },
        // });
      }
    } catch (error) {
      console.log(error, "this is error");
    }
  };

  return (
    <View style={tw`flex-1 `}>
      <BackWithComponent
        onPress={() => router.back()}
        title="Price Comparison"
      />

      <View style={tw`flex-1 flex-wrap justify-between px-5`}>
        <InputText
          onChangeText={(test) => setSearchValue(test)}
          touched
          svgFirstIcon={IconSearch}
          textInputProps={{
            placeholder: "Search for Product",
          }}
          containerStyle={tw`rounded-full mt-4`}
        />

        <View style={tw`w-full  rounded-full my-3`}>
          <TButton
            onPress={() => handleSearch()}
            title="Search"
            containerStyle={tw`rounded-full `}
          />
        </View>
      </View>
    </View>
  );
};

export default priceComparison;
