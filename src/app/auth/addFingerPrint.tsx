import { View, Text, Image, TouchableOpacity, BackHandler } from "react-native";
import React, { useEffect } from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { Dialog, PanningProvider } from "react-native-ui-lib";
import tw from "@/src/lib/tailwind";
import { ImgFingerPrint } from "@/assets/images";

const addFingerPrint = () => {
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleModal(true);
    }, 500);
  }, []);

  return (
    <View>
      <BackWithComponent
        onPress={() => router.back()}
        title={"Add Fingerprint"}
      />
      <Dialog
        width={"100%"}
        height={"45%"}
        visible={isVisibleModal}
        containerStyle={tw`flex-1 bg-[#00000033] justify-center items-center mb-3`}
        onDismiss={() => {
          router.back();
          setIsVisibleModal(false);
        }}
        panDirection={PanningProvider.Directions.DOWN}
        bottom={true}
      >
        <View
          style={tw`w-[70%] min-h-44 rounded-3xl justify-center items-center mx-auto bg-white py-4 gap-2`}
        >
          <Image style={tw`w-11 h-11`} source={ImgFingerPrint} />
          <Text style={tw`font-PoppinsSemiBold text-lg text-black`}>
            Touch ID
          </Text>
          <Text style={tw`font-PoppinsRegular text-base text-black`}>
            madhab15820@gmail.com
          </Text>
          <View style={tw`w-full border-b border-regularText`}></View>
          <TouchableOpacity>
            <Text style={tw`font-PoppinsSemiBold text-lg text-blue-700`}>
              Action
            </Text>
          </TouchableOpacity>
        </View>
      </Dialog>
    </View>
  );
};

export default addFingerPrint;
