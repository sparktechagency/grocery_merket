import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Platform,
  Linking,
} from "react-native";
import { useEffect, useState } from "react";

import { IconDropOffShopper, IconPickUpShopper } from "@/assets/icon";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router, useLocalSearchParams } from "expo-router";
import TButton from "@/src/lib/buttons/TButton";
import { useGetPendingOrderDetailsQuery } from "@/src/redux/apiSlices/shopperHomeApiSlices";
import { PrimaryColor } from "@/utils/utils";
import { GoogleMaps } from "expo-maps";
import PendingOrderStepCard from "@/src/components/PendingOrderStepCard";
import tw from "@/src/lib/tailwind";
import { decode } from "@/utils/decode";

const DeliveryOrderMonitoring = () => {
  const { orderId } = useLocalSearchParams();
  const [pickUpTime, setPickUpTime] = useState<any>();
  const [dropUpTime, setDropUpTime] = useState<any>();

  const [routeCoordinates, setRouteCoordinates] = useState([]);

  // ----------------------------- API Call -----------------------------
  const { data: pendingOrderDetails, isLoading } =
    useGetPendingOrderDetailsQuery(Number(orderId));

  const pickUpLocation = pendingOrderDetails?.data?.pick_up_location
    ? {
        latitude: Number(pendingOrderDetails?.data?.pick_up_location?.latitude),
        longitude: Number(
          pendingOrderDetails?.data?.pick_up_location?.longitude
        ),
      }
    : null;

  const dropUpLocation = pendingOrderDetails?.data?.drop_off_location
    ? {
        latitude: Number(
          pendingOrderDetails?.data?.drop_off_location?.latitude
        ),
        longitude: Number(
          pendingOrderDetails?.data?.drop_off_location?.longitude
        ),
      }
    : null;

  // ----------------------------- Fetch Route -----------------------------
  const getRoute = async () => {
    if (!pickUpLocation || !dropUpLocation) return;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${pickUpLocation.latitude},${pickUpLocation.longitude}&destination=${dropUpLocation.latitude},${dropUpLocation.longitude}&alternatives=true&key=AIzaSyD7W--YFEbz4g57zww14j2DNm9mwqGYLjM`
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

  // ----------------------------- When Data Arrives -----------------------------
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

      if (pendingOrderDetails?.data?.drop_off_location?.eta_minutes >= 60) {
        setDropUpTime(
          Math.floor(
            pendingOrderDetails?.data?.drop_off_location?.eta_minutes / 60
          ) +
            " hr " +
            (pendingOrderDetails?.data?.drop_off_location?.eta_minutes % 60) +
            " min"
        );
      }

      getRoute();
    }
  }, [pendingOrderDetails]);

  if (isLoading || !pickUpLocation || !dropUpLocation) {
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

  const openMaps = () => {
    const { latitude: slat, longitude: slng } = pickUpLocation;
    const { latitude: dlat, longitude: dlng } = dropUpLocation;

    let url = "";

    if (Platform.OS === "ios") {
      // Apple Maps
      url = `http://maps.apple.com/?saddr=${slat},${slng}&daddr=${dlat},${dlng}`;
    } else {
      // Google Maps
      url = `https://www.google.com/maps/dir/?api=1&origin=${slat},${slng}&destination=${dlat},${dlng}&travelmode=driving`;
    }

    Linking.openURL(url);
  };

  return (
    <View style={tw`flex-1`}>
      <ScrollView style={tw``}>
        <BackWithComponent
          onPress={() => router.back()}
          title={"Order #" + pendingOrderDetails?.data?.order_id}
        />

        <View style={tw`mx-5 gap-2`}>
          <Text style={tw`text-base font-bold mb-4`}>Details</Text>

          <View>
            {/* Pickup Card */}
            <PendingOrderStepCard
              type="Pickup"
              title={pendingOrderDetails?.data?.pick_up_location?.name}
              location="Fairbanks North Star"
              distance={
                pendingOrderDetails?.data?.pick_up_location?.distance_km + " km"
              }
              time={pickUpTime}
              iconXml={IconPickUpShopper}
            />

            <View style={tw`h-6 w-1 bg-regularText mx-6`} />

            {/* Drop-off Card */}
            <PendingOrderStepCard
              type="Drop–off"
              title=""
              location={pendingOrderDetails?.data?.drop_off_location?.address}
              distance={
                pendingOrderDetails?.data?.drop_off_location?.distance_km
              }
              time={dropUpTime}
              iconXml={IconDropOffShopper}
            />
          </View>

          {/* Map */}

          <View>
            <TButton
              title="Go to direction"
              onPress={openMaps}
              containerStyle={tw`rounded-2xl bg-primary`}
              titleStyle={tw`text-white font-PoppinsBold`}
            />
          </View>

          <GoogleMaps.View
            cameraPosition={{
              zoom: 11,
              coordinates: calculateMidpoint(pickUpLocation, dropUpLocation),
            }}
            uiSettings={{
              compassEnabled: false,
              zoomGesturesEnabled: false,
              zoomControlsEnabled: false,
              scrollGesturesEnabled: false,
            }}
            markers={[
              { coordinates: pickUpLocation },
              { coordinates: dropUpLocation },
            ]}
            polylines={[
              {
                coordinates: routeCoordinates,
                geodesic: true,
                color: "blue",
                width: 4,
              },
            ]}
            style={tw` h-96 border-white border  rounded-lg`}
          />

          {/* Buttons */}
          <View style={tw`flex-row items-center gap-3 my-3`}>
            <TButton
              onPress={() =>
                router.push({
                  pathname: "/shopper/deliveryOrder/pickUp",
                  params: {
                    orderId: pendingOrderDetails?.data?.order_id,
                  },
                })
              }
              title="Next"
              containerStyle={tw`rounded-md flex-1 bg-primaryShopper`}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DeliveryOrderMonitoring;
