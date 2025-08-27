import { View, Text } from "react-native";
import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "@/src/lib/tailwind";
import {
  IconLocationDoubleShopper,
  IconLocationWhite,
  IconTimeShopper,
} from "@/assets/icon";

interface Props {
  type: string;
  title: string;
  location: any;
  distance: any;
  time: any;
  iconXml: any;
}

const PendingOrderStepCard = ({
  type,
  title,
  location,
  distance,
  time,
  iconXml,
}: Props) => {
  return (
    <View
      style={tw`bg-[#e3e7eb] p-4 rounded-xl flex-row justify-between items-center `}
    >
      <View style={tw`flex-row justify-center items-start gap-3`}>
        <View style={tw`bg-blue-100 p-2 rounded-full`}>
          <SvgXml xml={iconXml} width={24} height={24} />
        </View>
        <View>
          <Text style={tw`text-sm font-bold text-black`}>{type}</Text>
          <Text style={tw`text-xs text-black`}>{title}</Text>
          <View style={tw`flex-row justify-start items-center gap-1`}>
            <SvgXml xml={IconLocationWhite} />
            <Text style={tw`text-xs text-gray-500`}>{location}</Text>
          </View>
        </View>
      </View>
      <View style={tw`items-end gap-2`}>
        <View style={tw`flex-row items-center gap-1`}>
          <SvgXml xml={IconLocationDoubleShopper} width={16} height={16} />
          <Text style={tw`text-xs text-gray-600`}>{distance}</Text>
        </View>
        <View style={tw`flex-row items-center gap-1`}>
          <SvgXml xml={IconTimeShopper} width={16} height={16} />
          <Text style={tw`text-xs text-gray-600`}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default PendingOrderStepCard;
