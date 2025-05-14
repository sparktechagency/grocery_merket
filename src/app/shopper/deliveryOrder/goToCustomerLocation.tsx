import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import {
  IconClockShopper,
  IconLocationWhite,
  IconMessage,
} from "@/assets/icon";
import TButton from "@/src/lib/buttons/TButton";
import { router } from "expo-router";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
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
    name: "Golden house",
  },
];

// ------ map related data end hare ----------------------------------------------------

const goToCustomerLocation = () => {
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
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

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleModal(true);
    }, 500);
  });
  return (
    <View style={tw`relative flex-1`}>
      <BackWithComponent
        containerStyle={tw`absolute top-0 left-0 z-20`}
        onPress={() => router.back()}
        title={"Customer Location"}
      />

      {/*  =============== map start hare =-========================== */}
      <View style={tw`flex-1  `}>
        <MapView
          style={tw`flex-1 rounded-sm border`}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          showsUserLocation
          showsMyLocationButton
          ref={focusMap}
        >
          {markers.map((marker, index) => (
            <Marker key={index} title="You are here" coordinate={marker} />
          ))}
        </MapView>
      </View>

      {/*  ===================== map end hare ================================= */}

      <View
        style={tw`absolute bottom-0 w-full bg-white rounded-t-3xl px-10 py-4`}
      >
        <View style={tw` py-4 px-10 `}>
          <View style={tw`items-center`}>
            <View
              style={tw`w-full  flex-row justify-between items-center gap-3`}
            >
              <View>
                <Text style={tw`font-PoppinsSemiBold text-xl text-black mb-1`}>
                  Benjamin Wilkison
                </Text>
                <View style={tw`flex-row items-center gap-1`}>
                  <SvgXml xml={IconLocationWhite} />
                  <Text style={tw`font-PoppinsMedium text-sm text-regularText`}>
                    Kodiak Island
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => router.push("/user/messaging/messaging")}
                style={tw`relative w-10 h-10 bg-white shadow-xl rounded-xl justify-center items-center`}
              >
                <SvgXml xml={IconMessage} />
                <Text
                  style={tw`absolute top-0 right-0 text-white w-5 h-5 text-center bg-yellow-500 rounded-full`}
                >
                  2
                </Text>
              </TouchableOpacity>
            </View>

            <View style={tw`flex-row items-start px-4 py-6`}>
              {/* Left timeline section */}
              <View style={tw`items-center`}>
                <View
                  style={tw`w-8 h-8 rounded-full bg-[#FEB97A] items-center justify-center`}
                >
                  <SvgXml xml={IconClockShopper} width={16} height={16} />
                </View>
                <View
                  style={tw`w-px h-12 border-l border-dashed border-[#FEB97A]`}
                />
                <View style={tw`w-2 h-2 bg-[#0A0A28] rounded-full mt-1`} />
              </View>

              {/* Text info */}
              <View style={tw`ml-4`}>
                <Text style={tw`text-sm font-semibold text-gray-900`}>
                  Estimated Time
                </Text>
                <Text style={tw`text-xl font-bold text-gray-900`}>20 min</Text>
                <Text style={tw`text-sm text-regularText mt-1`}>Swapno</Text>
                <Text style={tw`text-sm text-regularText`}>Rider location</Text>
              </View>
            </View>
          </View>

          <View style={tw`rounded-full mt-3 h-12 `}>
            <TButton
              // onPress={handleSubmit(onSubmit)}
              onPress={() =>
                router.push("/shopper/deliveryOrder/pendingOrSuccessDeliver")
              }
              title="Deliver"
              containerStyle={tw`rounded-md bg-primaryShopper`}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default goToCustomerLocation;
