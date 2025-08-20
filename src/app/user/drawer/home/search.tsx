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

const Search = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");

  const searchHistory = [
    {
      id: 1,
      title: "Fresh apple",
    },
    {
      id: 2,
      title: "Vegetables",
    },
    {
      id: 3,
      title: "Bakery",
    },
    {
      id: 4,
      title: "Beverage",
    },
    {
      id: 5,
      title: "Fresh lettuce",
    },
  ];

  const handleSearch = () => {
    if (query.trim()) {
      // Navigate and pass search query as param
      router.push({
        pathname: `/user/searchValueItem`,
        params: { searchQuery: query },
      });
    }
  };

  // useEffect(() => {
  //   setQuery(" ");
  // }, [query]);

  return (
    <View style={tw`flex-1 h-full px-5 mt-4`}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard?.dismiss();
        }}
      >
        <View style={tw`flex-1`}>
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

          <View style={tw`flex-row justify-between items-center mt-5 `}>
            <Text style={tw`font-PoppinsSemiBold text-xl text-black`}>
              Search history
            </Text>
            <TouchableOpacity>
              <Text
                style={tw`font-PoppinsRegular text-sm text-regularText underline `}
              >
                Clear
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tw`flex-row flex-wrap gap-2 mt-6`}>
            {searchHistory.map((history) => (
              <TouchableOpacity
                key={history.id}
                style={tw`bg-[#F3F5F7] rounded-xl px-4 py-2 shadow-sm`}
              >
                <Text style={tw`text-regularText font-PoppinsMedium text-sm`}>
                  {history.title}
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
