import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import {
  IconClockShopper,
  IconLocationWhite,
  IconMessage,
} from "@/assets/icon";
import TButton from "@/src/lib/buttons/TButton";
import { router, useLocalSearchParams } from "expo-router";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import {
  useGetPendingOrderDetailsQuery,
  useSendDeliveryRequestMutation,
} from "@/src/redux/apiSlices/shopperHomeApiSlices";
import { GoogleMaps } from "expo-maps";
import { useGetUserLocationQuery } from "@/src/redux/apiSlices/homePageApiSlices";
import { decode } from "@/utils/decode";
import { PrimaryColor } from "@/utils/utils";

// ------ map related data end hare ----------------------------------------------------

const GoToCustomerLocation = () => {
  const { orderId } = useLocalSearchParams();
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [pickUpTime, setPickUpTime] = useState<any>();
  const [itemOrderId] = useSendDeliveryRequestMutation();

  // ++++++++++++++++++++++++++++++ api ++++++++++++++++++++++++++++++
  const { data: pendingOrderDetails, isLoading } =
    useGetPendingOrderDetailsQuery(Number(orderId));
  const { data: currentLocation } = useGetUserLocationQuery({});

  const handleDeliveryRequest = async () => {
    try {
      const response = await itemOrderId(Number(orderId)).unwrap();
      if (response) {
        router.push({
          pathname: "/shopper/deliveryOrder/pendingOrSuccessDeliver",
          params: { orderId: orderId },
        });
      }
    } catch (error) {
      console.log(error);
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || error },
      });
    }
  };

  const shopperCurrentLocation = currentLocation?.data
    ? {
        latitude: 64.944729,
        longitude: -147.69017,
        // latitude: Number(currentLocation?.data?.latitude),
        // longitude: Number(currentLocation?.data?.longitude),
      }
    : null;

  const pickUpLocation = pendingOrderDetails?.data?.pick_up_location
    ? {
        latitude: Number(pendingOrderDetails?.data?.pick_up_location?.latitude),
        longitude: Number(
          pendingOrderDetails?.data?.pick_up_location?.longitude
        ),
      }
    : null;
  const getRoute = async () => {
    if (!shopperCurrentLocation || !pickUpLocation) return;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${pickUpLocation.latitude},${pickUpLocation.longitude}&destination=${shopperCurrentLocation.latitude},${shopperCurrentLocation.longitude}&alternatives=true&key=AIzaSyD7W--YFEbz4g57zww14j2DNm9mwqGYLjM`
      );
      const data = await response.json();

      if (data.routes.length) {
        const points = decode(data.routes[0].overview_polyline.points);
        setRouteCoordinates(points);
      }
    } catch (err) {
      console.log("Route Fetch Error:", err);
    }
  };

  useEffect(() => {
    if (pendingOrderDetails?.data) {
      if (pendingOrderDetails?.data?.pick_up_location?.eta_minutes >= 60) {
        setPickUpTime(
          Math.floor(
            pendingOrderDetails?.data?.pick_up_location?.eta_minutes / 60
          ) +
            " hr " +
            (pendingOrderDetails?.data?.pick_up_location?.eta_minutes % 60) +
            " min"
        );
      }
    }
    getRoute();
  }, [pendingOrderDetails]);

  if (isLoading || !currentLocation || !pickUpLocation) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color={PrimaryColor} />
      </View>
    );
  }

  const calculateMidpoint = (loc1: any, loc2: any) => {
    return {
      latitude: (loc1.latitude + loc2.latitude) / 2,
      longitude: (loc1.longitude + loc2.longitude) / 2,
    };
  };
  return (
    <View style={tw`relative flex-1`}>
      <BackWithComponent
        containerStyle={tw`absolute top-0 left-0 z-20`}
        onPress={() => router.back()}
      />
      {/*  =============== map start hare =-========================== */}

      <GoogleMaps.View
        cameraPosition={{
          coordinates: calculateMidpoint(
            shopperCurrentLocation,
            pickUpLocation
          ),
        }}
        uiSettings={{
          compassEnabled: false,
        }}
        markers={[
          { coordinates: shopperCurrentLocation },
          { coordinates: pickUpLocation },
        ]}
        polylines={[
          {
            coordinates: routeCoordinates,
            geodesic: true,
            color: "blue",
            width: 4,
          },
        ]}
        style={tw` h-full w-full`}
      />

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
                  {pendingOrderDetails?.data?.customer?.name}
                </Text>
                <View style={tw`flex-row items-center gap-1`}>
                  <SvgXml xml={IconLocationWhite} />
                  <Text style={tw`font-PoppinsMedium text-sm text-regularText`}>
                    {pendingOrderDetails?.data?.customer?.address}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => router.push("/user/messaging/messaging")}
                style={tw` w-10 h-10 bg-white shadow-xl rounded-xl justify-center items-center`}
              >
                <SvgXml xml={IconMessage} />
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
                <Text style={tw`text-xl font-bold text-gray-900`}>
                  {pickUpTime}
                </Text>
                <Text style={tw`text-sm text-regularText mt-1`}>
                  {pendingOrderDetails?.data?.nearest_store?.name}
                </Text>
                <Text style={tw`text-sm text-regularText`}>Rider location</Text>
              </View>
            </View>
          </View>

          <View style={tw`rounded-full mt-3 h-12 `}>
            <TButton
              onPress={() => handleDeliveryRequest()}
              title="Deliver"
              containerStyle={tw`rounded-md bg-primaryShopper`}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default GoToCustomerLocation;
