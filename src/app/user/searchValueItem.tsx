import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSearchKogerProductsQuery } from "@/src/redux/apiSlices/homePageApiSlices";

const SearchValueItem = () => {
  const { searchQuery } = useLocalSearchParams();
  const [searchData, setSearchData] = React.useState(null);
  console.log(searchData?.data, "this is search data");

  //   =================== all apis ========================
  const {
    data,
    isLoading: isSearching,
    error,
    isFetching,
  } = useSearchKogerProductsQuery({
    query: searchQuery,
  });

  useEffect(() => {
    const readSearchQuery = async () => {
      try {
        if (isSearching) {
          return;
        } else {
          setSearchData(data);
        }
      } catch (error) {
        console.log(error, "this is error");
      }
    };
    readSearchQuery();
  }, [searchQuery, isSearching, error, data, isFetching]);

  return (
    <View>
      {isSearching ? (
        <ActivityIndicator size={"small"} color="red" />
      ) : (
        <Text>{searchQuery} this is search query</Text>
      )}
    </View>
  );
};

export default SearchValueItem;
