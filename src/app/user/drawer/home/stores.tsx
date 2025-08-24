import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { IconArrowCorner } from "@/assets/icon";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { useKogerAllStoreQuery } from "@/src/redux/apiSlices/homePageApiSlices";
import { PrimaryColor } from "@/utils/utils";

const Stores = () => {
  const { data, isLoading } = useKogerAllStoreQuery({});
  return (
    <View style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw` px-4 mb-10`}>
        <BackWithComponent
          onPress={() => router.back()}
          title="Stores"
          containerStyle={tw`px-0`}
        />

        <View style={tw`gap-3 mt-2`}>
          {isLoading ? (
            <ActivityIndicator size={"large"} color={PrimaryColor} />
          ) : data?.stores.length === 0 ? (
            <Text
              style={tw`font-PoppinsRegular text-base text-regularText text-center`}
            >
              No Store
            </Text>
          ) : (
            data?.stores.map((store, index) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/user/storeByProduct",
                    params: { storeName: JSON.stringify(store) },
                  })
                }
                key={index}
                activeOpacity={0.8}
                style={tw`bg-white px-4 py-2 rounded-xl flex-row justify-between items-center shadow-sm`}
              >
                <Text
                  numberOfLines={1}
                  style={tw`font-PoppinsSemiBold  text-sm flex-1 text-black`}
                >
                  {store}
                </Text>
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/user/storeByProduct",
                      params: { storeName: JSON.stringify(store) },
                    })
                  }
                  style={tw`p-1.5 bg-[#e4e4e4] rounded-full`}
                >
                  <SvgXml
                    xml={IconArrowCorner}
                    width={20}
                    height={20}
                    style={tw`p-1.5 bg-[#e4e4e4] rounded-full`}
                  />
                </Pressable>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Stores;
