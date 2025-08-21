import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSearchProductsWithFilterQuery } from "@/src/redux/apiSlices/homePageApiSlices";

const SearchValueItem = () => {
  const [searchData, setSearchData] = React.useState(null);
  const { searchQuery } = useLocalSearchParams();
  const parsedQuery = searchQuery ? JSON.parse(searchQuery as string) : {};

  console.log(parsedQuery, "this is real search params");

  //   =================== all apis ========================f
  const {
    data,
    isLoading: isSearching,
    isError: error,
    isFetching,
  } = useSearchProductsWithFilterQuery(parsedQuery);

  console.log(data, "this is data ============================");

  return (
    <View>
      <Text>this is search query</Text>
    </View>
  );
};

export default SearchValueItem;
