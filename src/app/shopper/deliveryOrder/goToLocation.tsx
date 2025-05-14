import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useRef } from "react";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconLocationWhite, IconRightArrowShopper } from "@/assets/icon";
import { CartData } from "@/src/components/CardData";
import Collapsible from "react-native-collapsible";
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
    name: "Golden Gate Bridge",
  },
];

// ------ map related data end hare ----------------------------------------------------

const goToLocation = () => {
  const [viewOrderDetails, setViewOrderDetails] = React.useState(true);
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
  return (
    <View style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`flex-grow `}>
        <View style={tw`px-5  mb-4`}>
          <BackWithComponent
            onPress={() => router.back()}
            title="Go to location"
          />
          <View style={tw`p-4 rounded-md bg-[#e3e7eb]`}>
            <Text style={tw`font-PoppinsRegular text-base text-black mb-1`}>
              Store name: <Text style={tw`font-PoppinsMedium`}>Swapno</Text>
            </Text>
            <View style={tw`flex-row gap-1`}>
              <SvgXml xml={IconLocationWhite} />
              <Text style={tw`font-PoppinsMedium text-base text-regularText`}>
                Fairbanks North Star
              </Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => setViewOrderDetails(!viewOrderDetails)}
              style={tw`flex-row justify-start items-center gap-2 my-2`}
            >
              <Text
                style={tw`font-PoppinsMedium text-primaryShopper text-base `}
              >
                View order items ({CartData?.length})
              </Text>
              <SvgXml xml={IconRightArrowShopper} />
            </TouchableOpacity>

            <Collapsible collapsed={viewOrderDetails}>
              {CartData?.map((data) => (
                <TouchableOpacity
                  key={data?.id}
                  style={tw`flex-row items-center px-2 py-1 rounded-xl bg-white mb-3 shadow-sm`}
                >
                  <Image
                    source={data.image}
                    style={tw`w-14 h-14 rounded-md`}
                    resizeMode="contain"
                  />
                  <View style={tw`ml-4`}>
                    <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
                      {data.title}
                    </Text>
                    <Text
                      style={tw`font-PoppinsRegular text-sm text-regularText`}
                    >
                      {data.weight}
                    </Text>
                    <Text
                      style={tw`font-PoppinsSemiBold text-base text-primary mt-1`}
                    >
                      ${data.price}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </Collapsible>

            {/*  =============== map start hare =-========================== */}
            <View style={tw`h-56 my-4  bg-[#e3e7eb] rounded-lg`}>
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

            <View style={tw`rounded-full mt-3 h-12`}>
              <TButton
                // onPress={handleSubmit(onSubmit)}
                onPress={() =>
                  router.push("/shopper/deliveryOrder/goToCustomerLocation")
                }
                title="Go to Location"
                containerStyle={tw`rounded-md bg-primaryShopper`}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default goToLocation;
