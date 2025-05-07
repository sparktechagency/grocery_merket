import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

interface IButton {
  containerStyle?: {};
  titleStyle?: {};
  icon?: React.ReactNode;
  svg?: string;
  title?: string;
  onPress?: () => void;
  isLoading?: boolean;
  loadingColor?: string;
  disabled?: boolean;
}

const IwtButton = ({
  containerStyle,
  icon,
  svg,
  title,
  titleStyle,
  onPress,
  disabled,
  isLoading,
  loadingColor,
}: IButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading || disabled}
      activeOpacity={0.5}
      style={[
        tw`bg-primary h-12  flex-row justify-center items-center gap-3 rounded-full   ${
          disabled ? "opacity-60" : "opacity-100"
        }`,
        containerStyle,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={loadingColor ? loadingColor : "white"} />
      ) : (
        <>
          {icon ? (
            icon
          ) : (
            <SvgXml
              xml={
                svg
                  ? svg
                  : `<svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.3 11.2V5H2.5C1.4 5 0.5 5.9 0.5 7V13C0.5 14.1 1.4 15 2.5 15H3.5V18L6.5 15H11.5C12.6 15 13.5 14.1 13.5 13V11.18C13.4342 11.1937 13.3672 11.2007 13.3 11.201H6.3V11.2ZM18.5 0H9.5C8.4 0 7.5 0.9 7.5 2V10H14.5L17.5 13V10H18.5C19.6 10 20.5 9.101 20.5 8V2C20.5 0.9 19.6 0 18.5 0Z" fill="white"/>
</svg>

     `
              }
            />
          )}
        </>
      )}

      {title && (
        <Text
          style={[tw`text-white font-PoppinsSemiBold text-base `, titleStyle]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default IwtButton;

const styles = StyleSheet.create({});
