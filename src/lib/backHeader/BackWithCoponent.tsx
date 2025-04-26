import { Text, TouchableOpacity, View } from "react-native";

import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

interface BackButtonProps {
  onPress?: () => void;
  titleStyle?: any;
  title?: any;
  containerStyle?: any;
  ComponentBtn?: React.ReactNode;
  offBack?: boolean;
  togather?: boolean;
}

const BackWithComponent = ({
  onPress,
  containerStyle,
  titleStyle,
  ComponentBtn,
  title,
  offBack,
  togather,
}: BackButtonProps) => {
  return (
    <View
      style={[
        tw`flex-row items-center justify-between gap-2 p-[4%] `,
        containerStyle,
      ]}
    >
      {!togather ? (
        <>
          {!offBack ? (
            <TouchableOpacity
              onPress={onPress}
              style={tw`flex-row items-center gap-2 pr-4`}
            >
              <View
                style={tw`bg-white w-10 h-10 justify-center items-center rounded-lg`}
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
          ) : (
            <View style={tw`w-10 h-10`} />
          )}
          <Text
            numberOfLines={1}
            style={[tw`text-black font-bold text-base`, titleStyle]}
          >
            {title ? title : "Back"}
          </Text>
        </>
      ) : (
        <>
          {!offBack ? (
            <TouchableOpacity
              onPress={onPress}
              style={tw`flex-row items-center gap-2 pr-4`}
            >
              <View
                style={tw`bg-white w-10 h-10 justify-center items-center rounded-lg`}
              >
                <SvgXml
                  style={tw`bg-transparent`}
                  xml={`<svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.00591 8.3332L7.67271 15L9.33911 13.3336L3.50552 7.5L9.33911 1.6664L7.67271 0L1.00591 6.6668C0.784974 6.8878 0.660859 7.1875 0.660859 7.5C0.660859 7.8125 0.784974 8.1122 1.00591 8.3332Z" fill="black"/>
</svg>
`}
                />
              </View>
              <Text
                numberOfLines={1}
                style={[tw`text-black font- text-base`, titleStyle]}
              >
                {title ? title : "Back"}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={tw`w-10 h-10`} />
          )}
        </>
      )}

      {ComponentBtn ? ComponentBtn : <View style={tw`w-10 h-10`} />}
    </View>
  );
};

export default BackWithComponent;
