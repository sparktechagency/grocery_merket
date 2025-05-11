import { View, Text } from "react-native";
import React from "react";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import {
  IconDropOffShopper,
  IconLocationDoubleShopper,
  IconLocationWhite,
  IconPickUpShopper,
  IconTimeShopper,
} from "@/assets/icon";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import TButton from "@/src/lib/buttons/TButton";

// Example SVGs – Replace with your actual icons
const locationIcon = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0c-3.866 0-7 3.582-7 8a1 1 0 001 1h12a1 1 0 001-1c0-4.418-3.134-8-7-8z" /></svg>`;
const clockIcon = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" /></svg>`;
const pickupIcon = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.735 6.879 1.996M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`;
const dropoffIcon = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0c-3.866 0-7 3.582-7 8a1 1 0 001 1h12a1 1 0 001-1c0-4.418-3.134-8-7-8z" /></svg>`;

const deliveryOrderMonitoring = () => {
  const DeliveryDetailCard = ({
    type,
    title,
    location,
    distance,
    time,
    iconXml,
  }: any) => (
    <View
      style={tw`bg-[#e3e7eb] p-4 rounded-xl flex-row justify-between items-center `}
    >
      <View style={tw`flex-row justify-center items-start gap-3`}>
        <View style={tw`bg-blue-100 p-2 rounded-full`}>
          <SvgXml xml={iconXml} width={24} height={24} />
        </View>
        <View>
          <Text style={tw`text-sm font-bold text-black`}>{type}</Text>
          <Text style={tw`text-sm text-black`}>{title}</Text>
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

  return (
    <View style={tw`flex-1 `}>
      <BackWithComponent onPress={() => router.back()} title={"#500"} />
      <View style={tw`mx-5`}>
        <Text style={tw`text-base font-bold mb-4`}>Delivery details</Text>
        <DeliveryDetailCard
          type="Pickup"
          title="Swapno"
          location="Fairbanks North Star"
          distance="5.3 km"
          time="20 min"
          iconXml={IconPickUpShopper}
        />

        <View style={tw`h-6 w-1 bg-regularText mx-6`} />

        <DeliveryDetailCard
          type="Drop–off"
          title="Rampura"
          location="Kodiak Island"
          distance="7 km"
          time="30 min"
          iconXml={IconDropOffShopper}
        />

        <View style={tw`my-4`}>
          <Text style={tw`mx-auto text text-red-700`}>
            -----------This is map section-----------
          </Text>
        </View>

        <View style={tw`flex-row  items-center gap-3 my-3`}>
          <TButton
            // onPress={handleSubmit(onSubmit)}
            onPress={() => router.push("/shopper/home/home")}
            title="Decline"
            containerStyle={tw`rounded-md flex-1 bg-[#E5F4FF] `}
            titleStyle={tw`text-black`}
          />
          <TButton
            // onPress={handleSubmit(onSubmit)}
            onPress={() => router.push("/shopper/deliveryOrder/pickUp")}
            title="Accept"
            containerStyle={tw`rounded-md flex-1 bg-primaryShopper `}
          />
        </View>
      </View>
    </View>
  );
};

export default deliveryOrderMonitoring;
