import { View, Text, Image } from "react-native";
import React from "react";
import { ImgFoods, ImgRoleHead, ImgRoleRide } from "@/assets/images";
import IwtButton from "@/src/lib/buttons/IwtButton";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

const role = () => {
  const storeRoleData = async (value: string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("role", jsonValue);
      // router.push("/auth");

      router.replace("/auth");
    } catch (e) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Oops!",
        textBody: "Your Role didn't match",
      });
    }
  };

  return (
    <AlertNotificationRoot>
      <View style={tw`flex-1 `}>
        <Image style={tw`w-full h-44`} source={ImgRoleHead} />
        <View style={tw`w-full justify-center items-start px-8`}>
          <Image style={tw`mx-auto w-36 h-36`} source={ImgRoleRide} />
          <Text style={tw`font-PoppinsSemiBold text-2xl text-primary mx-auto`}>
            Book, Ride, Earn
          </Text>
          <Text
            style={tw`font-PoppinsRegular text-lg text-regularText text-center mx-auto`}
          >
            Order your essential grocery items from home or ride the orders to
            the customer for earn daily
          </Text>
          <Image style={tw` mx-auto`} source={ImgFoods} />
        </View>
        <View style={tw`px-8`}>
          <IwtButton
            containerStyle={tw`rounded-md mt-5`}
            onPress={() => storeRoleData("user")}
            svg='<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.66138 0C10.8549 0 11.9994 0.474106 12.8434 1.31802C13.6873 2.16193 14.1614 3.30653 14.1614 4.5C14.1614 5.69347 13.6873 6.83807 12.8434 7.68198C11.9994 8.52589 10.8549 9 9.66138 9C8.4679 9 7.32331 8.52589 6.4794 7.68198C5.63548 6.83807 5.16138 5.69347 5.16138 4.5C5.16138 3.30653 5.63548 2.16193 6.4794 1.31802C7.32331 0.474106 8.4679 0 9.66138 0ZM9.66138 11.25C14.6339 11.25 18.6614 13.2638 18.6614 15.75V18H0.661377V15.75C0.661377 13.2638 4.68888 11.25 9.66138 11.25Z" fill="white"/>
</svg>
'
            title="Become an user"
          />
          <IwtButton
            containerStyle={tw`rounded-md bg-transparent my-4 border border-[#4e4e4e33]`}
            titleStyle={tw`font-PoppinsBold text-base text-black`}
            onPress={() => storeRoleData("shopper")}
            svg='<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.66138 11.5C5.4525 11.5 6.22586 11.7346 6.88366 12.1741C7.54145 12.6136 8.05414 13.2384 8.3569 13.9693C8.65965 14.7002 8.73886 15.5044 8.58452 16.2804C8.43018 17.0563 8.04921 17.769 7.4898 18.3284C6.93039 18.8878 6.21766 19.2688 5.44174 19.4231C4.66581 19.5775 3.86155 19.4983 3.13064 19.1955C2.39974 18.8928 1.77502 18.3801 1.3355 17.7223C0.895973 17.0645 0.661377 16.2911 0.661377 15.5L0.666377 15.3C0.717689 14.275 1.16098 13.309 1.90457 12.6017C2.64815 11.8944 3.63513 11.5 4.66138 11.5ZM18.6614 11.5C19.4525 11.5 20.2259 11.7346 20.8837 12.1741C21.5415 12.6136 22.0541 13.2384 22.3569 13.9693C22.6596 14.7002 22.7389 15.5044 22.5845 16.2804C22.4302 17.0563 22.0492 17.769 21.4898 18.3284C20.9304 18.8878 20.2177 19.2688 19.4417 19.4231C18.6658 19.5775 17.8615 19.4983 17.1306 19.1955C16.3997 18.8928 15.775 18.3801 15.3355 17.7223C14.896 17.0645 14.6614 16.2911 14.6614 15.5L14.6664 15.3C14.7177 14.275 15.161 13.309 15.9046 12.6017C16.6481 11.8944 17.6351 11.5 18.6614 11.5Z" fill="black"/>
<path d="M14.4935 4.945L16.1965 7.5H18.6615C18.9064 7.50003 19.1428 7.58996 19.3258 7.75272C19.5089 7.91547 19.6258 8.13975 19.6545 8.383L19.6615 8.5C19.6615 8.76522 19.5561 9.01957 19.3686 9.20711C19.181 9.39464 18.9267 9.5 18.6615 9.5H15.6615C15.4969 9.50002 15.3348 9.45942 15.1897 9.38179C15.0446 9.30417 14.9208 9.19192 14.8295 9.055L13.4335 6.962L10.1585 9.582L12.3685 11.792C12.5241 11.9478 12.6239 12.1506 12.6525 12.369L12.6615 12.5V16.5C12.6615 16.7652 12.5561 17.0196 12.3686 17.2071C12.181 17.3946 11.9267 17.5 11.6615 17.5C11.3963 17.5 11.1419 17.3946 10.9544 17.2071C10.7668 17.0196 10.6615 16.7652 10.6615 16.5V12.915L7.95448 10.207C7.76901 10.0213 7.66401 9.77003 7.66213 9.50755C7.66026 9.24507 7.76167 8.99237 7.94448 8.804L8.03648 8.719L13.0365 4.719C13.1447 4.63235 13.2698 4.56916 13.4038 4.53344C13.5377 4.49771 13.6777 4.49024 13.8147 4.51149C13.9517 4.53275 14.0828 4.58226 14.1997 4.65689C14.3165 4.73152 14.4166 4.82963 14.4935 4.945ZM16.6615 0.5C17.057 0.5 17.4437 0.617298 17.7726 0.837061C18.1015 1.05682 18.3579 1.36918 18.5092 1.73463C18.6606 2.10009 18.7002 2.50222 18.623 2.89018C18.5459 3.27814 18.3554 3.63451 18.0757 3.91421C17.796 4.19392 17.4396 4.3844 17.0517 4.46157C16.6637 4.53874 16.2616 4.49913 15.8961 4.34776C15.5307 4.19638 15.2183 3.94004 14.9985 3.61114C14.7788 3.28224 14.6615 2.89556 14.6615 2.5L14.6665 2.35C14.7043 1.84684 14.9309 1.37659 15.3009 1.0335C15.6709 0.690406 16.1569 0.49984 16.6615 0.5Z" fill="black"/>
</svg>

'
            title="Become a shopper"
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default role;
