import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { IconDownArrow, IconUpArrow } from "@/assets/icon";
import tw from "../lib/tailwind";

// ANDROID এ smooth animation এর জন্য এটা দরকার
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  question: string;
  answer: string;
  index: number;
}

export const OnCollapsable = ({
  answer,
  question,
  index,
}: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };
  return (
    <View style={tw`my-5`}>
      <View
        style={tw`flex-row justify-between items-center bg-[#d6d9dd] px-3 py-4 rounded-xl`}
      >
        <Text style={tw`font-PoppinsSemiBold text-sm text-black`}>
          {index + 1}. {question}
        </Text>
        <TouchableOpacity
          onPress={toggleExpand}
          style={tw`w-8 h-8 justify-center items-center bg-white rounded-full shadow-lg`}
        >
          {expanded ? (
            <SvgXml xml={IconUpArrow} />
          ) : (
            <SvgXml xml={IconDownArrow} />
          )}
        </TouchableOpacity>
      </View>

      {expanded && (
        <View style={tw`px-5 py-4 bg-white rounded-lg`}>
          <Text style={tw`font-PoppinsRegular text-black text-sm`}>
            {answer}
          </Text>
        </View>
      )}
    </View>
  );
};
