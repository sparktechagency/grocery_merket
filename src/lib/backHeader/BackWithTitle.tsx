import { Text, TouchableOpacity, View } from "react-native";

import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

interface BackWithTitleProps {
  onPress?: () => void;
  title: string;
  titleStyle?: any;
  containerStyle?: any;
  backOff?: boolean;
}

const BackWithTitle = ({
  onPress,
  title,
  containerStyle,
  titleStyle,
  backOff,
}: BackWithTitleProps) => {
  return (
    <View style={[tw`flex-row items-center gap-3 p-[4%]`, containerStyle]}>
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <View
          style={tw`w-10 h-10 rounded-lg shadow-lg text-center items-center justify-center bg-white`}
        >
          <SvgXml
            style={tw`bg-transparent`}
            xml={`<svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.00591 8.3332L7.67271 15L9.33911 13.3336L3.50552 7.5L9.33911 1.6664L7.67271 0L1.00591 6.6668C0.784974 6.8878 0.660859 7.1875 0.660859 7.5C0.660859 7.8125 0.784974 8.1122 1.00591 8.3332Z" fill="black"/>
</svg>
`}
          />
        </View>
      </TouchableOpacity>
      <Text
        style={[tw` font-medium text-base text-black text-center `, titleStyle]}
      >
        {title}
      </Text>
    </View>
  );
};

export default React.memo(BackWithTitle);
