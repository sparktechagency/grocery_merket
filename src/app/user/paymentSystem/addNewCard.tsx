import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "react-native-ui-lib";
import { PrimaryColor } from "@/utils/utils";
import { router } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "@/src/lib/tailwind";
import TButton from "@/src/lib/buttons/TButton";
import { IconMasterCard, IconVisaCard } from "@/assets/icon";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

const paymentSystem = () => {
  const [checkBox, setCheckBox] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[
            styles.label,
            isFocus && { color: "#788498" },
            tw`bg-[#ecf0f1] rounded-lg`,
          ]}
        >
          Card number
        </Text>
      );
    }
    return null;
  };

  return (
    <AlertNotificationRoot>
      <View style={tw`flex-1`}>
        <BackWithComponent
          onPress={() => router.back()}
          title={"Add new card"}
        />
        <View style={tw`px-6 pt-3 `}>
          <View style={tw`mt-6`}>
            <View style={tw`flex-row justify-between `}>
              <Text style={tw`font-bold text-sm font-PoppinsRegular`}>
                Card Information
              </Text>
              <TouchableOpacity style={tw`flex-row items-center gap-1`}>
                {/* <SvgXml xml={IconCamera} /> */}
                <Text
                  style={tw`text-primary  font-bold text-sm font-PoppinsRegular`}
                >
                  Scan card
                </Text>
              </TouchableOpacity>
            </View>

            <View style={tw`my-1`}>
              <View style={tw`border border-gray-300 rounded-lg p-3 mb-3`}>
                <View style={tw`flex-row justify-between items-center`}>
                  <TextInput
                    placeholder="Card Holder name"
                    keyboardType="numeric"
                    style={tw`text-lg flex-1`}
                  />
                </View>
              </View>
              <View style={tw`border border-gray-300 rounded-lg p-3`}>
                <View style={tw`flex-row justify-between items-center`}>
                  <TextInput
                    placeholder="card number"
                    keyboardType="numeric"
                    style={tw`text-lg flex-1`}
                  />
                  <SvgXml style={tw`w-6 h-4 mr-1`} xml={IconVisaCard} />
                  <SvgXml style={tw`w-6 h-4 mr-1`} xml={IconMasterCard} />
                </View>
              </View>
              <View style={tw`flex-row mt-3`}>
                <View
                  style={tw`flex-1 border border-gray-300 rounded-lg p-3 mr-2`}
                >
                  <TextInput
                    placeholder="MM / YY"
                    keyboardType="numeric"
                    style={tw`text-lg`}
                  />
                </View>
                <View style={tw`flex-1 border border-gray-300 rounded-lg p-3`}>
                  <TextInput
                    placeholder="CVC"
                    keyboardType="numeric"
                    secureTextEntry
                    style={tw`text-lg`}
                  />
                </View>
              </View>

              <View style={tw`flex-row items-center my-6`}>
                <Checkbox
                  style={tw`w-5 h-5 border border-gray-400 rounded mr-2`}
                  value={checkBox}
                  onValueChange={setCheckBox}
                  color={PrimaryColor}
                />
                <Text style={tw`text-sm font-medium text-gray-700`}>
                  Save card details
                </Text>
              </View>

              <TButton
                onPress={() =>
                  Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: "Success",
                    textBody: "Congrats! Your Card Update success!",
                  })
                }
                title="Add card"
              />
            </View>
          </View>
          {/*  ========== modal open ============ */}
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default paymentSystem;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
  },
  label: {
    position: "absolute",
    left: 22,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
