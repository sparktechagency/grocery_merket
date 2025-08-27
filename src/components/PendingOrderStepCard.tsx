import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import tw from "@/src/lib/tailwind";
import { IconDropOffShopper, IconPickUpShopper } from "@/assets/icon";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router, useLocalSearchParams } from "expo-router";
import TButton from "@/src/lib/buttons/TButton";
import { useGetPendingOrderDetailsQuery } from "@/src/redux/apiSlices/shopperHomeApiSlices";
import PendingOrderStepCard from "@/src/components/PendingOrderStepCard";
import { PrimaryColor } from "@/utils/utils";
import polyline from "@mapbox/polyline";
import { MapView, Marker, Polyline } from "expo-maps";

const DeliveryOrderMonitoring = () => {
  const { orderId } = useLocalSearchParams();
  const [pickUpTime, setPickUpTime] = useState();
  const [dropUpTime, setDropUpTime] = useState();
  const [routeCoords, setRouteCoords] = useState([]);
  const mapRef = useRef(null);

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

  console.log(
    "pickUpLocation",
    pickUpLocation,
    "dropUpLocation",
    dropUpLocation
  );

  // ----------------------------- Fetch Route -----------------------------
  const getRoute = async () => {
    if (!pickUpLocation || !dropUpLocation) return;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${pickUpLocation.latitude},${pickUpLocation.longitude}&destination=${dropUpLocation.latitude},${dropUpLocation.longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const data = await response.json();

      if (data.routes?.length) {
        const points = polyline.decode(data.routes[0].overview_polyline.points);
        const routeCoordinates = points.map(([latitude, longitude]) => ({
          latitude,
          longitude,
        }));
        setRouteCoords(routeCoordinates);
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

  return (
    <View style={tw`flex-1`}>
      <ScrollView style={tw`flex-grow`}>
        <BackWithComponent
          onPress={() => router.back()}
          title={"Order #" + pendingOrderDetails?.data?.order_id}
        />

        <View style={tw`mx-5`}>
          <Text style={tw`text-base font-bold mb-4`}>Details</Text>

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
            distance={pendingOrderDetails?.data?.drop_off_location?.distance_km}
            time={dropUpTime}
            iconXml={IconDropOffShopper}
          />

          {/* Map */}
          <View style={tw`h-[60%] my-4 bg-[#e3e7eb] rounded-lg`}>
            <MapView
              ref={mapRef}
              style={tw`flex-1 rounded-sm border`}
              initialCamera={{
                center: pickUpLocation,
                zoom: 12,
              }}
            >
              <Marker coordinate={pickUpLocation} title="Pickup Location" />
              <Marker coordinate={dropUpLocation} title="Drop-off Location" />
              {routeCoords.length > 0 && (
                <Polyline
                  coordinates={routeCoords}
                  strokeColor="red"
                  strokeWidth={4}
                />
              )}
            </MapView>
          </View>

          {/* Buttons */}
          <View style={tw`flex-row items-center gap-3 my-3`}>
            <TButton
              onPress={() => router.push("/shopper/home/home")}
              title="Decline"
              containerStyle={tw`rounded-md flex-1 bg-[#E5F4FF]`}
              titleStyle={tw`text-black`}
            />
            <TButton
              onPress={() =>
                router.push({
                  pathname: "/shopper/deliveryOrder/pickUp",
                  params: {
                    orderId: pendingOrderDetails?.data?.order_id,
                  },
                })
              }
              title="Accept"
              containerStyle={tw`rounded-md flex-1 bg-primaryShopper`}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DeliveryOrderMonitoring;
