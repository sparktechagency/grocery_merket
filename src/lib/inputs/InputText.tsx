import {
  Animated,
  Easing,
  NativeSyntheticEvent,
  StyleProp,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

interface InputTextProps {
  onPress?: () => void;
  svgFirstIcon?: string;
  fieldStyle?: any;
  focusSTyle?: any;
  label?: string;
  required?: boolean;
  labelStyle?: any;
  svgSecondIcon?: string;
  placeholder?: string;
  placeholderStyle?: any;
  textInputProps?: TextInputProps;
  svgSecondOnPress?: () => void;
  textXValue?: number;
  textXOutRangeFirst?: number;
  textXOutRangeSecond?: number;
  svgSecondStyle?: any;
  errorText?: string;
  errorSvgIcon?: any;
  onFocus?: () => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (text: string) => void;
  value?: string;
  touched?: boolean;
  containerLayoutStyle?: any;
  containerStyle?: any;
  editable?: boolean;
  inputStyle?: any;
}

const InputText = ({
  onPress,
  svgFirstIcon,
  fieldStyle,
  focusSTyle,
  label,
  required,
  labelStyle,
  svgSecondIcon,
  placeholder,
  textXValue = -20,
  textXOutRangeFirst = 10,
  textXOutRangeSecond = 16,
  errorSvgIcon,
  textInputProps,
  errorText,
  onBlur,
  onChangeText,
  onFocus,
  svgSecondStyle,
  svgSecondOnPress,
  value,
  touched,
  containerLayoutStyle,
  containerStyle,
  editable = true,
  placeholderStyle,
  inputStyle,
}: InputTextProps) => {
  const [focus, setFocus] = React.useState(false);
  const [text, setText] = React.useState("");
  const textInputRef = React.useRef<TextInput>(null); // Ref to focus the TextInput

  const textY = React.useRef(new Animated.Value(0));

  const handleFocus = () => {
    setFocus(true);
    Animated.timing(textY.current, {
      toValue: -20,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
    // textInputRef.current?.focus(); // Focus the TextInput
  };

  const handleBlur = () => {
    setFocus(false);
    Animated.timing(textY.current, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  React.useEffect(() => {
    if (focus || value?.trim().length) {
      handleFocus();
    } else if (!value?.trim().length || !focus) {
      handleBlur();
    }
  }, [value, focus]);

  const textX = textY.current.interpolate({
    inputRange: [textXValue, 0],
    outputRange: [textXOutRangeFirst, textXOutRangeSecond],
    extrapolate: "clamp",
  });
  const textScale = textY.current.interpolate({
    inputRange: [-20, 0],
    outputRange: [0.8, 1],
    extrapolate: "clamp",
  });

  return (
    <TouchableOpacity
      activeOpacity={1} // Ensure the opacity doesn't change on press
      onPress={() => {
        if (editable) {
          handleFocus;
        }
      }}
      // Focus the input when the container is pressed
      style={[tw``, containerLayoutStyle]}
    >
      {label && (
        <Text
          style={[
            tw`   text-sm font-PoppinsRegular  py-2 text-black`,
            labelStyle,
          ]}
        >
          {label}{" "}
          {required && (
            <Text style={tw`text-red-500 font-PoppinsMedium`}> *</Text>
          )}
        </Text>
      )}

      <View
        style={[
          tw`flex-row w-full border items-center px-4 ${
            errorText && touched ? "border-red-500" : "border-gray-300"
          } ${
            focus || value?.trim().length ? "bg-white" : "bg-gray-200"
          } rounded-lg h-12`,

          containerStyle,
        ]}
      >
        {svgFirstIcon && <SvgXml xml={svgFirstIcon} />}
        {placeholder && (
          <Animated.Text
            numberOfLines={1}
            style={[
              tw`absolute bg-base rounded-full text-base font-PoppinsRegular py-2 px-2 ${
                errorText && touched ? "text-red-500" : "text-gray-400"
              }  ${focus || value?.trim().length ? "bg-white" : "bg-gray-200"}`,
              placeholderStyle,
              {
                transform: [
                  { translateY: textY.current },
                  { translateX: textX },
                  { scale: textScale },
                ],
              },
            ]}
          >
            {placeholder}
          </Animated.Text>
        )}

        <TextInput
          editable={editable}
          ref={textInputRef} // Assign the ref to the TextInput
          onFocus={() => {
            onFocus && onFocus();
            setFocus(true);
          }}
          onBlur={(e) => {
            onBlur && onBlur(e);
            setFocus(false);
          }}
          style={[tw`flex-1 px-2 text-base font-PoppinsSemiBold`, inputStyle]}
          {...textInputProps}
          value={value || text}
          onChangeText={(text) => {
            setText(text);
            onChangeText && onChangeText(text);
          }}
        />
        {svgSecondIcon && (
          <TouchableOpacity
            onPress={svgSecondOnPress}
            disabled={!svgSecondOnPress}
          >
            <SvgXml xml={svgSecondIcon} />
          </TouchableOpacity>
        )}
      </View>
      {errorText && touched && (
        <View style={tw`px-2 py-1 flex-row gap-1 items-center`}>
          {errorSvgIcon && <SvgXml xml={errorSvgIcon} />}

          <Text style={tw`text-red-500 text-xs`}>{errorText}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default InputText;
