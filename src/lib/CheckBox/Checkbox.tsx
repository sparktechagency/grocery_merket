import { TouchableOpacity, View } from "react-native";
import tw from "../tailwind";

type SelectBoxProps = {
  contentStyle?: string;
  selectedStyle?: string;
  selected?: boolean;
  onPress?: () => void;
};

export const Checkbox = ({
  selectedStyle = "",
  contentStyle = "",
  selected = false,
  onPress = () => {},
}: SelectBoxProps): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`w-6 h-6 rounded-full border-2 border-green-800 items-center justify-center`,
        tw`${contentStyle}`,
      ]}
    >
      {selected && (
        <View
          style={[tw`w-3 h-3 rounded-full bg-green-800`, tw`${selectedStyle}`]}
        />
      )}
    </TouchableOpacity>
  );
};
