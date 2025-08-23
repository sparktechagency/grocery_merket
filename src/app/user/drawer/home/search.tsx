import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconSearchFilter } from "@/assets/icon";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { useFilters } from "../../useContext/filterContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Search = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<any[]>([]);
  const { filters } = useFilters();

  // Load history on mount
  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const history = await AsyncStorage.getItem("searchHistory");
        if (history) {
          const parsed = JSON.parse(history);
          setSearchHistory(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.log(error, "this is error");
      }
    };
    getSearchHistory();
  }, []);

  // Handle search submit
  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const search = query.trim();
        const searchParams = {
          ...filters,
          search,
        };

        // Get old history safely
        const history = await AsyncStorage.getItem("searchHistory");
        let historyArray: any[] = [];
        if (history) {
          try {
            const parsed = JSON.parse(history);
            historyArray = Array.isArray(parsed) ? parsed : [];
          } catch {
            historyArray = [];
          }
        }

        // Remove duplicates (optional)
        historyArray = historyArray.filter((item) => item.search !== search);

        // Push new search
        historyArray.push(searchParams);

        // Save back to storage
        await AsyncStorage.setItem(
          "searchHistory",
          JSON.stringify(historyArray)
        );

        setSearchHistory(historyArray);

        // Navigate
        router.push({
          pathname: `/user/searchValueItem`,
          params: { searchQuery: JSON.stringify(searchParams) },
        });
      } catch (error) {
        console.log(error, "this is error");
      }
    }
  };

  // Clear history
  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem("searchHistory");
      setSearchHistory([]);
    } catch (error) {
      console.log(error, "clear error");
    }
  };

  return (
    <View style={tw`flex-1 h-full px-5 mt-4`}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard?.dismiss();
        }}
      >
        <View style={tw`flex-1`}>
          {/* Search Bar */}
          <View style={tw`flex-row justify-between items-center gap-2 w-full`}>
            <View style={tw`flex-1`}>
              <TextInput
                returnKeyType="search"
                onSubmitEditing={handleSearch}
                value={query}
                onChangeText={setQuery}
                style={tw` bg-gray-300 py-3 px-4 rounded-full`}
                placeholder="Search for product or stores..."
              />
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  (navigation as any)?.openDrawer();
                }}
              >
                <SvgXml xml={IconSearchFilter} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Header */}
          <View style={tw`flex-row justify-between items-center mt-5`}>
            <Text style={tw`font-PoppinsSemiBold text-xl text-black`}>
              Search history
            </Text>
            <TouchableOpacity onPress={clearHistory}>
              <Text
                style={tw`font-PoppinsRegular text-sm text-regularText underline`}
              >
                Clear
              </Text>
            </TouchableOpacity>
          </View>

          {/* History list */}
          <View style={tw`flex-row flex-wrap gap-2 mt-6`}>
            {searchHistory.map((history, index) => (
              <TouchableOpacity
                key={index}
                style={tw`bg-[#F3F5F7] rounded-xl px-4 py-2 shadow-sm`}
                onPress={() => {
                  handleSearch();
                  setQuery(history.search);
                }} // optional: click to re-search
              >
                <Text style={tw`text-regularText font-PoppinsMedium text-sm`}>
                  {history?.search}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Search;
