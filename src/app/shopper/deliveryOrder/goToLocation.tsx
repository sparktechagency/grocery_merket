import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconLocationWhite, IconRightArrowShopper } from "@/assets/icon";
import { CartData } from "@/src/components/CardData";
import Collapsible from "react-native-collapsible";
import TButton from "@/src/lib/buttons/TButton";
import { router } from "expo-router";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";

const goToLocation = () => {
  const [viewOrderDetails, setViewOrderDetails] = React.useState(true);
  return (
    <ScrollView>
      <View style={tw`px-5 flex-1 mb-4`}>
        <BackWithComponent
          onPress={() => router.back()}
          title="Go to location"
        />
        <View style={tw`p-4 rounded-md bg-[#e3e7eb]`}>
          <Text style={tw`font-PoppinsRegular text-base text-black mb-1`}>
            Store name: <Text style={tw`font-PoppinsMedium`}>Swapno</Text>
          </Text>
          <View style={tw`flex-row gap-1`}>
            <SvgXml xml={IconLocationWhite} />
            <Text style={tw`font-PoppinsMedium text-base text-regularText`}>
              Fairbanks North Star
            </Text>
          </View>
        </View>

        <View>
          <Text style={tw`border-b border-[#C8C8C8] w-full`}></Text>
          <TouchableOpacity
            onPress={() => setViewOrderDetails(!viewOrderDetails)}
            style={tw`flex-row justify-start items-center gap-2 my-2`}
          >
            <Text style={tw`font-PoppinsMedium text-primaryShopper text-base `}>
              View order items ({CartData?.length})
            </Text>
            <SvgXml xml={IconRightArrowShopper} />
          </TouchableOpacity>

          <Collapsible collapsed={viewOrderDetails}>
            {CartData.map((data) => (
              <TouchableOpacity
                key={data.id}
                style={tw`flex-row items-center p-3 rounded-2xl bg-white mb-3 shadow-md`}
              >
                <Image
                  source={data.image}
                  style={tw`w-14 h-14 rounded-md`}
                  resizeMode="contain"
                />
                <View style={tw`ml-4`}>
                  <Text style={tw`font-PoppinsSemiBold text-base text-black`}>
                    {data.title}
                  </Text>
                  <Text
                    style={tw`font-PoppinsRegular text-sm text-regularText`}
                  >
                    {data.weight}
                  </Text>
                  <Text
                    style={tw`font-PoppinsSemiBold text-base text-primary mt-1`}
                  >
                    ${data.price}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </Collapsible>

          <Text style={tw`border-b border-[#C8C8C8] w-full`}></Text>

          <View style={tw`flex-row justify-start items-center gap-2`}>
            <Text
              style={tw`font-PoppinsRegular text-base text-regularText my-3.5`}
            >
              Order status:
            </Text>
            <Text
              style={tw`font-PoppinsMedium px-1 py-0.5 rounded-md text-[#FF00EE] bg-[#FFE8FD] `}
            >
              Pending
            </Text>
          </View>
          <View style={tw`flex-row justify-start items-center gap-2`}>
            <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
              {" "}
              Payment:
            </Text>
            <Text
              style={tw`font-PoppinsMedium px-1 py-0.5 rounded-md text-primary bg-[#E8FFEE] `}
            >
              {" "}
              Online paid
            </Text>
          </View>
          <Text style={tw`border-b border-[#C8C8C8] w-full`}></Text>
          <View style={tw`rounded-full mt-3 h-12`}>
            <TButton
              // onPress={handleSubmit(onSubmit)}
              onPress={() => router.push("/shopper/deliveryOrder/deliver")}
              title="Pick up"
              containerStyle={tw`rounded-md bg-primaryShopper`}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default goToLocation;
