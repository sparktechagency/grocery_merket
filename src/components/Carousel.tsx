import React from "react";
import { Image, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import tw from "twrnc";
import { ImgBanner } from "@/assets/images";
import { _HIGHT, _WIDTH } from "@/utils/utils";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { parallaxLayout } from "react-native-reanimated-carousel/lib/module/layouts/parallax";
import { useHomeBannerQuery } from "../redux/apiSlices/homePageApiSlices";

const DiscountCarousel = () => {
  const { data } = useHomeBannerQuery({});
  console.log(data?.banners, "caroucel bannder ---------->");
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
        <Image source={ImgBanner} resizeMode="contain" />
      </Animated.View>
    </View>
  );
};
