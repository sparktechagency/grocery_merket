import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { ImgFaceId } from "@/assets/images";
import tw from "@/src/lib/tailwind";
import { useRole } from "@/src/hook/useRole";

const addFace = () => {
  const role = useRole();
  useEffect(() => {
    if (!role) return;

    const timer = setTimeout(() => {
      if (role === "user") {
        router.replace("/user/drawer/home");
      } else if (role === "shopper") {
        router.replace("/shopper/home/home");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [role]);
  return (
    <View>
      <BackWithComponent
        onPress={() => router.back()}
        title={"Add Add Face id"}
      />
      <View
        style={tw`w-36 h-36 rounded-3xl bg-black mx-auto justify-center items-center mt-2 shadow-2xl shadow-green-400`}
      >
        <Image style={tw`w-20 h-20`} source={ImgFaceId} />
      </View>
    </View>
  );
};

export default addFace;
