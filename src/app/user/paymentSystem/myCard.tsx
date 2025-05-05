import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconMasterCard, IconVisaCard } from "@/assets/icon";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { Checkbox } from "@/src/lib/CheckBox/Checkbox";

const myCard = () => {
  const [selected, setSelected] = React.useState("one");
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent onPress={() => router.back()} title={"My Cards"} />
      <View style={tw`mt-4 px-5`}>
        <View style={tw`flex-row items-center w-[88%] gap-5`}>
          <Checkbox
            selected={selected === "one"}
            onPress={() => setSelected("one")}
          />
          <Pressable
            onPress={() => setSelected("one")}
            style={tw`flex-row items-center px-5 py-4 rounded-xl w-full bg-[#eceff1] mb-3 shadow-md mt-5`}
          >
            <View
              style={tw`w-14 h-14 flex justify-center items-center bg-white rounded-full shadow-sm`}
            >
              <SvgXml xml={IconMasterCard} style={tw`w-16 h-16 rounded-md`} />
            </View>
            <View style={tw`ml-4`}>
              <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
                Mastercard
              </Text>
              <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                **** **** **** 4568
              </Text>
              <View style={tw`flex-row gap-7 items-center mt-1`}>
                <Text style={tw`font-PoppinsMedium text-sm text-black`}>
                  Exp: 06/26
                </Text>
                <Text style={tw`font-PoppinsMedium text-sm text-black`}>
                  CVV: 123
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
        <View style={tw`flex-row items-center w-[88%] gap-5`}>
          <Checkbox
            selected={selected === "two"}
            onPress={() => setSelected("two")}
          />
          <Pressable
            onPress={() => setSelected("two")}
            style={tw`flex-row items-center px-5 py-4 w-full rounded-xl bg-[#eceff1] mb-3 shadow-md mt-3`}
          >
            <View
              style={tw`w-14 h-14 flex justify-center items-center bg-white rounded-full shadow-sm`}
            >
              <SvgXml xml={IconVisaCard} style={tw`w-16 h-16 rounded-md`} />
            </View>
            <View style={tw`ml-4`}>
              <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
                Visa
              </Text>
              <Text style={tw`font-PoppinsRegular text-sm text-black`}>
                **** **** **** 4568
              </Text>
              <View style={tw`flex-row gap-7 items-center mt-1`}>
                <Text style={tw`font-PoppinsMedium text-sm text-black`}>
                  Exp: 06/26
                </Text>
                <Text style={tw`font-PoppinsMedium text-sm text-black`}>
                  CVV: 123
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/user/paymentSystem/addNewCard")}
        style={tw`border border-primary border-dashed rounded-lg bg-green-100 py-3 px-4 mt-10 mx-5`}
      >
        <Text style={tw`text-green-700 text-center font-medium`}>
          + Add new card
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default myCard;
