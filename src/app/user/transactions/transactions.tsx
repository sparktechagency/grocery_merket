import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { useGetAllTransactionsQuery } from "@/src/redux/apiSlices/payment";
import { PrimaryColor } from "@/utils/utils";
import { Image } from "expo-image";

const transactions = () => {
  // ==================== api ==================
  const { data: getTransactionData, isLoading } = useGetAllTransactionsQuery(
    {}
  );

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"Transactions"} />

      <ScrollView style={tw`px-5`}>
        <View style={tw`flex justify-center mb-3 gap-3`}>
          {isLoading ? (
            <ActivityIndicator size={"large"} color={PrimaryColor} />
          ) : getTransactionData?.data.length === 0 ? (
            <Text
              style={tw`font-PoppinsRegular text-base text-regularText text-center`}
            >
              No Transaction
            </Text>
          ) : (
            getTransactionData?.data.map((data) => (
              <Pressable
                key={data.id}
                style={tw`flex-row justify-between items-center p-5  shadow-md rounded-2xl gap-4 bg-[#ebeff3]`}
              >
                <View style={tw`flex-row justify-start items-center gap-3`}>
                  <View
                    style={tw`w-16 h-16 border-2 border-white bg-[#EDF6FF] shadow-md justify-center items-center rounded-full`}
                  >
                    <Image
                      source={data?.user_photo}
                      style={tw`w-12 h-12 rounded-full`}
                      contentFit="contain"
                    />
                  </View>

                  <View>
                    <Text style={tw`font-PoppinsMedium text-base text-black`}>
                      {data?.order_number}
                    </Text>

                    <Text
                      style={tw`font-PoppinsRegular text-sm text-regularText`}
                    >
                      {/* {data.date.toLocaleDateString()} at{" "} */}
                      {data.time}
                    </Text>
                  </View>
                </View>

                <Text style={tw`font-PoppinsSemiBold text-base text-primary`}>
                  ${data?.total_amount}
                </Text>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default transactions;
