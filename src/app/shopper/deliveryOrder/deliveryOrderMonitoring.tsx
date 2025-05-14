import { View, Text, Alert, ScrollView } from "react-native";
import React, { useRef } from "react";
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
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// ------ map related data ----------------------------------------------------

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 2,
  longitudeDelta: 2,
};

const markers = [
  // San Francisco
  {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "San Francisco City Center",
  },
  {
    latitude: 37.8077,
    longitude: -122.475,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Golden Gate Bridge",
  },
  {
    latitude: 37.8077,
    longitude: -122.475,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Golden Gate Bridge",
  },
];

// ------ map related data end hare ----------------------------------------------------

const deliveryOrderMonitoring = () => {
  const mapRef = useRef<any>(null);
  const focusMap = () => {
    const GreenBayStadium = {
      latitude: 44.5013,
      longitude: -88.0622,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };

    mapRef.current?.animateToRegion(GreenBayStadium);
  };

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
      <ScrollView style={tw`flex-grow`}>
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
          {/*  =============== map start hare =-========================== */}
          <View style={tw`h-[50%] my-4  bg-[#e3e7eb] rounded-lg`}>
            <MapView
              style={tw`flex-1 rounded-sm border`}
              provider={PROVIDER_GOOGLE}
              initialRegion={INITIAL_REGION}
              showsUserLocation
              showsMyLocationButton
              ref={focusMap}
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  title="You are here"
                  coordinate={marker}
                  // onPress={() => onMarkerSelected(marker)}
                />
              ))}
            </MapView>
          </View>

          {/*  ===================== map end hare ================================= */}

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
      </ScrollView>
    </View>
  );
};

export default deliveryOrderMonitoring;

// google_map_api_key: "AIzaSyDbo65LMZXBN1QOo5hXwCRcnH4uowEI3jk"
