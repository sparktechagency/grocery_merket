import { View, Text } from "react-native";
import React, { useEffect } from "react";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
  usePathname,
} from "expo-router";
import tw from "../lib/tailwind";

const Toaster = () => {
  const { res } = useLocalSearchParams();
  const params = useGlobalSearchParams();
  const pathname = usePathname();

  React.useEffect(() => {
    const currentPath = pathname; // save the path when modal loads

    const timer = setTimeout(() => {
      // check if user still on this modal page
      if (router.canGoBack() && pathname === currentPath) {
        router.back();
      }
    }, Number(params?.time) || 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={tw` `}>
      <View style={tw`bg-slate-700 justify-center items-center p-4 rounded-xl`}>
        <Text style={tw`text-sm font-PoppinsMedium text-white`}>{res}</Text>
      </View>
    </View>
  );
};

export default Toaster;
