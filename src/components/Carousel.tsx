import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SvgXml } from "react-native-svg";
import tw from "twrnc";
import { CarouselImgOne, ImgBanner } from "@/assets/images";
import { _HIGHT, _WIDTH } from "@/utils/utils";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { parallaxLayout } from "react-native-reanimated-carousel/lib/module/layouts/parallax";

const bannerData = [
  {
    id: 1,
    img: ImgBanner,
  },
  {
    id: 2,
    img: ImgBanner,
  },
  {
    id: 3,
    img: ImgBanner,
  },
  {
    id: 4,
    img: ImgBanner,
  },
];

const DiscountCarousel = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={tw``}>
      <Carousel
        loop={true}
        autoPlay
        style={{
          width: _WIDTH,
          height: _HIGHT * 0.18,
          justifyContent: "center",
          alignItems: "center",
        }}
        width={_WIDTH / 2 + _WIDTH * 0.33}
        data={[1, 2, 3]}
        renderItem={({ item, index, animationValue }) => {
          return (
            <CustomItem
              item={item}
              index={index}
              animationValue={animationValue}
            />
          );
        }}
        customAnimation={parallaxLayout(
          {
            size: _WIDTH / 2,
            vertical: false,
          },
          {
            parallaxScrollingScale: 1,
            parallaxAdjacentItemScale: 0.9,
            parallaxScrollingOffset: -130,
          }
        )}
        scrollAnimationDuration={2000}
      />
    </View>
  );
};

export default DiscountCarousel;

interface ItemProps {
  index: number;
  animationValue: Animated.SharedValue<number>;
  item: any;
}
const CustomItem: React.FC<ItemProps> = ({ index, animationValue, item }) => {
  const maskStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-20, 1, 30],
      [0, 1, 0.1]
    );

    return {
      opacity,
    };
  }, [animationValue]);

  return (
    <View
      style={{
        flex: 1,
        overflow: "hidden",
        width: _WIDTH * 0.84,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      }}
    >
      <Animated.View
        style={[
          tw`flex-row bg-black bg-opacity-80 items-center justify-between p-5 rounded-xl`,

          maskStyle,
        ]}
      >
        {/* <View style={tw`flex-1 pr-4`}>
          <Text
            numberOfLines={2}
            style={tw`text-yellow-400 text-xl font-PoppinsBold mb-2`}
          >
            Get 60% Discount Now
          </Text>
          <Text numberOfLines={2} style={tw`text-white text-sm mb-3`}>
            *Applicable on selective products
          </Text>
          <TouchableOpacity
            style={tw`bg-white self-start px-4 py-2 rounded-full flex-row items-center`}
          >
            <SvgXml xml={IconOrderButton} width={20} height={20} />
            <Text style={tw`ml-2 font-bold`}>Order now</Text>
          </TouchableOpacity>
        </View> */}

        <Image source={ImgBanner} resizeMode="contain" />
      </Animated.View>
    </View>
  );
};
