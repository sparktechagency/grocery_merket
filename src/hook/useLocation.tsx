import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>("");

  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});

      if (coords) {
        setLongitude(coords.longitude);
        setLatitude(coords.latitude);

        await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return {
    longitude,
    latitude,
    errorMsg,
  };
};

export default useLocation;
