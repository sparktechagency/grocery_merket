import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const bothHome = () => {
  // ----------- get user  role -----------------
  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem("role");
      const role = value ? JSON.parse(value) : null;
      if (role === "user") {
        router.replace("/user/drawer/home");
      } else if (role === "shopper") {
        router.replace("/shopper/home/home");
      } else {
        router.replace("/auth");
      }
    } catch (e) {
      console.error("Error reading role from AsyncStorage", e);
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);
  return null;
};

export default bothHome;
