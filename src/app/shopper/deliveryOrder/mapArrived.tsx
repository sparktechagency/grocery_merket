import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconClockShopper, IconLocationWhite } from "@/assets/icon";
import TButton from "@/src/lib/buttons/TButton";
import { router, useLocalSearchParams } from "expo-router";
import BackButton from "@/src/lib/backHeader/BackButton";
import { useGetPendingOrderDetailsQuery } from "@/src/redux/apiSlices/shopperHomeApiSlices";
import { GoogleMaps } from "expo-maps";
import { PrimaryColor } from "@/utils/utils";
import { decode } from "@/utils/decode";
import { useGetUserLocationQuery } from "@/src/redux/apiSlices/homePageApiSlices";

const mapArrived = () => {
  const { orderId } = useLocalSearchParams();
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [pickUpTime, setPickUpTime] = useState<any>();

  // ====================== api ======================
  const { data: pendingOrderDetails, isLoading } =
    useGetPendingOrderDetailsQuery(Number(orderId));
  const { data: currentLocation } = useGetUserLocationQuery({});

  const shopperCurrentLocation = currentLocation?.data
    ? {
        // latitude: 64.944729,
        // longitude: -147.69017,
        latitude: Number(currentLocation?.data?.latitude),
        longitude: Number(currentLocation?.data?.longitude),
      }
    : null;

  console.log(
    shopperCurrentLocation,
    "shopperCurrentLocation ===================>"
  );

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
    console.log(currentLocation?.data, "currentLocation ============");
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
      <BackButton
        containerStyle={tw`absolute -top-0 left-0 z-20 `}
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
        <View style={tw`items-center`}>
          <Text style={tw`font-PoppinsSemiBold text-xl text-black mb-1`}>
            Arrived
          </Text>
          <View style={tw`flex-row items-center gap-1`}>
            <SvgXml xml={IconLocationWhite} />
            <Text style={tw`font-PoppinsMedium text-sm text-regularText`}>
              {pendingOrderDetails?.data?.nearest_store?.name}
            </Text>
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

            {/*  =================== Text info */}
            <View style={tw`ml-4`}>
              <Text style={tw`text-sm font-semibold text-gray-900`}>
                Estimated Time
              </Text>
              <Text style={tw`text-base font-PoppinsSemiBold text-gray-900`}>
                {pickUpTime}
              </Text>
              <Text style={tw`text-sm text-regularText mt-1`}>
                {pendingOrderDetails?.data?.nearest_store?.name}
              </Text>
              <Text style={tw`text-sm text-regularText`}>Rider location</Text>
            </View>
          </View>
        </View>

        <View style={tw`rounded-full mt-3 h-12`}>
          <TButton
            onPress={() =>
              router.push({
                pathname: "/shopper/deliveryOrder/pickUpItems",
                params: { orderId: pendingOrderDetails?.data?.order_id },
              })
            }
            title="Pick-up items"
            containerStyle={tw`rounded-md bg-primaryShopper`}
          />
        </View>
      </View>
    </View>
  );
};

export default mapArrived;
