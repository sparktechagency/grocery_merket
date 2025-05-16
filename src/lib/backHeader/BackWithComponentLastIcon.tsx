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
  endComponentContentStyle?: string;
  fastComponentContentStyle?: string;
}

const BackWithComponentLastIcon = ({
  onPress,
  containerStyle,
  titleStyle,
  ComponentBtn,
  title,
  offBack,
  togather,
  endComponentContentStyle,
  fastComponentContentStyle,
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
                style={[
                  tw`bg-white w-10 h-10 justify-center items-center rounded-lg`,
                  fastComponentContentStyle,
                ]}
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
                style={[
                  tw`bg-white w-10 h-10 justify-center items-center rounded-lg`,
                  fastComponentContentStyle,
                ]}
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

      {ComponentBtn ? (
        ComponentBtn
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={[
            tw`bg-white w-10 h-10 justify-center items-center rounded-lg`,
            endComponentContentStyle,
          ]}
        >
          <SvgXml
            style={tw`bg-transparent`}
            xml={`<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 16L12.8809 12.3809M12.8809 12.3809C13.4999 11.7618 13.991 11.0269 14.326 10.218C14.6611 9.40917 14.8335 8.54225 14.8335 7.66676C14.8335 6.79127 14.6611 5.92435 14.326 5.1155C13.991 4.30665 13.4999 3.57172 12.8809 2.95265C12.2618 2.33358 11.5269 1.84251 10.718 1.50748C9.90917 1.17244 9.04225 1 8.16676 1C7.29127 1 6.42435 1.17244 5.6155 1.50748C4.80665 1.84251 4.07172 2.33358 3.45265 2.95265C2.20239 4.20291 1.5 5.89863 1.5 7.66676C1.5 9.4349 2.20239 11.1306 3.45265 12.3809C4.70291 13.6311 6.39863 14.3335 8.16676 14.3335C9.9349 14.3335 11.6306 13.6311 12.8809 12.3809Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BackWithComponentLastIcon;
