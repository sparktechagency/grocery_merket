import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import {
  IconDeliver,
  IconDownArrow,
  IconPending,
  IconTickMark,
  IconUpArrow,
} from "@/assets/icon";
import { SvgXml } from "react-native-svg";
import tw from "@/src/lib/tailwind";
import Collapsible from "react-native-collapsible";
import { useGetAllOrdersQuery } from "@/src/redux/apiSlices/orderSlices";

const userOrder = () => {
  const [expanded, setExpanded] = React.useState({});

  const toggle = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // +++++++++++++++++++ All api ++++++++++++++++++++++++++++
  const { data: getAllOrders, isLoading: isOrderDataLoading } =
    useGetAllOrdersQuery({});

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={"Track your order"}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {isOrderDataLoading ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size={"large"} color="#23AA49" />
          </View>
        ) : getAllOrders?.data?.length === 0 ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-center text-lg text-gray-500 font-semibold`}>
              No order found
            </Text>
          </View>
        ) : (
          getAllOrders?.data.map((item, index) => {
            const key = item?.id ?? index;
            const isOpen = !!expanded[key];

            // -------------- time and date --------------
            const timestamp = item?.created_at;
            const dateObject = new Date(timestamp);
            const options = {
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            const formattedDate = dateObject.toLocaleDateString(
              "en-US",
              options
            );

            return (
              <View key={key} style={tw`mx-5 gap-2`}>
                <View style={tw`bg-[#e8eaec] rounded-lg px-5 py-4`}>
                  <View style={tw`flex-row justify-between items-center`}>
                    <View style={tw`flex-row justify-start items-center gap-3`}>
                      <View
                        style={tw`p-3 border-2 border-white bg-[#e8fdee] rounded-full shadow-lg`}
                      >
                        <SvgXml xml={IconDeliver} />
                      </View>

                      <View>
                        <Text
                          style={tw`flex-1 font-semibold text-sm text-primary`}
                        >
                          Order id: {item?.order_number}
                        </Text>

                        <View style={tw`flex-row gap-1`}>
                          <Text
                            style={tw`font-PoppinsRegular text-sm text-black`}
                          >
                            Placed on:
                          </Text>
                          <Text style={tw`flex-1 font-semibold text-sm`}>
                            {formattedDate}
                          </Text>
                        </View>

                        <View>
                          <View style={tw`flex-row gap-5`}>
                            <View style={tw`flex-row gap-1`}>
                              <Text
                                style={tw`font-PoppinsRegular text-sm text-black`}
                              >
                                Items:
                              </Text>
                              <Text style={tw`font-semibold text-sm`}>
                                {item?.items}
                              </Text>
                            </View>
                            <View style={tw`flex-row gap-1`}>
                              <Text
                                style={tw`font-PoppinsRegular text-sm text-black`}
                              >
                                price:
                              </Text>
                              <Text style={tw`font-semibold text-sm`}>
                                $ {item?.price}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>

                    <Pressable
                      onPress={() => toggle(key)}
                      style={tw`p-2 bg-white rounded-full shadow-lg`}
                    >
                      {isOpen ? (
                        <SvgXml xml={IconUpArrow} />
                      ) : (
                        <SvgXml xml={IconDownArrow} />
                      )}
                    </Pressable>
                  </View>

                  <View
                    style={tw`flex-row justify-between mt-6 bg-white rounded-lg w-full p-4`}
                  >
                    <View style={tw`flex-row justify-start items-center gap-1`}>
                      <Text
                        style={[
                          tw`w-4 h-4 rounded-full `,
                          item?.status_timeline?.order_delivered?.completed
                            ? tw`bg-primary`
                            : tw`bg-darkGreen`,
                        ]}
                      />

                      <Text
                        style={[
                          tw`font-PoppinsRegular text-sm  mr-3`,
                          item?.status_timeline?.order_delivered?.completed
                            ? tw`text-primary`
                            : tw`text-darkGreen`,
                        ]}
                      >
                        {item?.status_timeline?.order_delivered?.completed
                          ? "Delivered"
                          : "Pending"}
                      </Text>
                    </View>

                    {/* <TouchableOpacity
                      onPress={() => router.push("/user/addToCart/cart")}
                    >
                      <Text
                        style={tw`px-3 py-1 bg-[#FF8000] text-white rounded-lg`}
                      >
                        Re-order
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </View>

                {/* ------------------- when open this item show only toggling ------------------- */}
                <Collapsible collapsed={!isOpen}>
                  <Pressable>
                    <View style={tw`px-7 py-2 bg-white rounded-lg gap-2`}>
                      <View style={tw`flex-row justify-between`}>
                        <Text
                          style={[
                            tw`font-PoppinsMedium text-sm`,
                            item?.status_timeline?.order_placed?.completed
                              ? tw`text-primary`
                              : tw`text-regularText`,
                          ]}
                        >
                          {item?.status_timeline?.order_placed?.label}
                        </Text>

                        <SvgXml
                          xml={
                            item?.status_timeline?.order_placed?.timestamp
                              ? IconTickMark
                              : IconPending
                          }
                        />
                      </View>

                      <View style={tw`flex-row justify-between`}>
                        <Text
                          style={[
                            tw`font-PoppinsMedium text-sm `,
                            item?.status_timeline?.order_confirmed?.completed
                              ? tw`text-primary`
                              : tw`text-regularText`,
                          ]}
                        >
                          {item?.status_timeline?.order_confirmed?.label}
                        </Text>
                        <SvgXml
                          xml={
                            item?.status_timeline?.order_confirmed?.timestamp
                              ? IconTickMark
                              : IconPending
                          }
                        />
                      </View>

                      <View style={tw`flex-row justify-between`}>
                        <Text
                          style={[
                            tw`font-PoppinsMedium text-sm text-primary`,
                            item?.status_timeline?.order_pickedup?.completed
                              ? tw`text-primary`
                              : tw`text-regularText`,
                          ]}
                        >
                          {item?.status_timeline?.order_pickedup?.label}
                        </Text>
                        <SvgXml
                          xml={
                            item?.status_timeline?.order_pickedup?.timestamp
                              ? IconTickMark
                              : IconPending
                          }
                        />
                      </View>

                      <View style={tw`flex-row justify-between`}>
                        <Text
                          style={[
                            tw`font-PoppinsMedium text-sm text-regularText`,
                            item?.status_timeline?.order_delivered?.completed
                              ? tw`text-primary`
                              : tw`text-regularText`,
                          ]}
                        >
                          {item?.status_timeline?.order_pickedup?.label}
                        </Text>
                        <SvgXml
                          xml={
                            item?.status_timeline?.order_delivered?.timestamp
                              ? IconTickMark
                              : IconPending
                          }
                        />
                      </View>
                      <View style={tw`flex-row justify-end items-center`}>
                        <Text
                          style={[
                            tw`font-PoppinsRegular text-sm  mr-3`,
                            item?.status_timeline?.order_delivered?.completed
                              ? tw`text-primary`
                              : tw`text-darkGreen`,
                          ]}
                        >
                          {item?.status_timeline?.order_delivered?.completed
                            ? "Delivered"
                            : "Pending"}
                        </Text>
                        <Text
                          style={[
                            tw`w-4 h-4 rounded-full `,
                            item?.status_timeline?.order_delivered?.completed
                              ? tw`bg-primary`
                              : tw`bg-darkGreen`,
                          ]}
                        />
                      </View>
                    </View>
                  </Pressable>
                </Collapsible>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default userOrder;
