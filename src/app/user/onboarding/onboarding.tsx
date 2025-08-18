import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import tw from "@/src/lib/tailwind";
import {
  StepOne,
  StepOneLogo,
  StepThree,
  StepThreeLogo,
  StepTwo,
  StepTwoLogo,
} from "@/assets/images";
import { router } from "expo-router";
import { SvgXml } from "react-native-svg";
import { IconRightArrow } from "@/assets/icon";

const OnboardingScreen = () => {
  const [index, setIndex] = React.useState(0);
  console.log(index);

  const handleDone = () => {
    // router.replace("/user/drawer/home");
    router.push("/role/role");
  };

  const doneButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          // router.replace("/user/drawer/home");
          router.push("/role/role");
        }}
        style={tw`mr-6`}
      >
        <SvgXml
          xml={IconRightArrow}
          style={tw`p-5 rounded-full bg-darkGreen `}
        />
      </TouchableOpacity>
    );
  };
  const dotComponent = ({ selected }: { selected: boolean }) => {
    const colors = ["#4CAF50", "#FDB827", "#FF6F61"];
    const dotColor = selected ? colors[index] : "#ccc";
    return (
      <View
        style={[
          tw`mx-1`,
          {
            width: selected ? 16 : 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: dotColor,
          },
        ]}
      />
    );
  };

  return (
    <Onboarding
      // style={tw`bg-white`}
      bottomBarColor="#fff"
      onDone={handleDone}
      onSkip={handleDone}
      DoneButtonComponent={doneButton}
      // NextButtonComponent={doneButton}
      onPageChange={(index: number) => setIndex(index)}
      DotComponent={dotComponent}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <View style={tw`px-6`}>
              <View style={tw`relative items-center my-16`}>
                <Image source={StepOne} />
                <Image
                  style={tw`absolute w-24 h-24 m-auto bottom-25`}
                  source={StepOneLogo}
                />
              </View>
              <View>
                <Text
                  style={tw`font-PoppinsSemiBold text-2xl text-soundery mb-6`}
                >
                  Offers fresh and quality groceries for you
                </Text>
                <Text style={tw`font-PoppinsRegular text-lg text-regularText`}>
                  All items have real freshness and we are intended of your
                  needs.
                </Text>
              </View>
            </View>
          ),
          title: "",
          subtitle: ".",
        },
        {
          backgroundColor: "#fff",
          image: (
            <View style={tw` px-7 `}>
              <View style={tw`relative items-center my-16`}>
                <Image source={StepTwo} />
                <Image
                  style={tw`absolute w-24 h-24 m-auto bottom-22`}
                  source={StepTwoLogo}
                />
              </View>
              <View>
                <Text
                  style={tw`font-PoppinsSemiBold text-2xl text-orange mb-6`}
                >
                  Gives you the best price for every items
                </Text>
                <Text style={tw`font-PoppinsRegular text-lg text-regularText`}>
                  We are giving you the best price and alternatives for your
                  daily needs.
                </Text>
              </View>
            </View>
          ),
          title: "",
          subtitle: ".",
        },
        {
          backgroundColor: "#fff",
          image: (
            <View style={tw` px-7 `}>
              <View style={tw`relative items-center my-16`}>
                <Image source={StepThree} />
                <Image
                  style={tw`absolute w-24 h-24 m-auto bottom-22`}
                  source={StepThreeLogo}
                />
              </View>
              <View>
                <Text
                  style={tw`font-PoppinsSemiBold text-2xl text-darkGreen mb-6`}
                >
                  Quick delivery at your doorstep
                </Text>
                <Text style={tw`font-PoppinsRegular text-lg text-regularText`}>
                  Choose to be delivery or pickup according to when you need.
                </Text>
              </View>
            </View>
          ),
          title: "",
          subtitle: ".",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
