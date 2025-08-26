import { View, Text, TouchableOpacity } from "react-native";

import tw from "../lib/tailwind";

interface IOrderedCardProps {
  onPress: () => void;
  orderId: number;
  customerName: string;
  orderStatus: string;
  totalPrice: number;
}

const OrderedCard = ({
  onPress,
  orderId,
  customerName,
  orderStatus,
  totalPrice,
}: IOrderedCardProps) => {
  return (
    <View
      style={[
        tw` bg-gray-100 p-4 rounded-xl flex-row justify-between items-center mx-5 shadow-md mb-4`,
      ]}
    >
      <View style={tw`flex-1`}>
        <Text style={tw`text-black font-PoppinsSemiBold`}>
          Order id: <Text style={tw`font-PoppinsBold`}>#{orderId}</Text>
        </Text>
        <Text style={tw`text-regularText`}>
          Customer: <Text style={tw`text-black`}> {customerName}</Text>
        </Text>

        <Text
          style={[
            tw`bg-[#E0F2FF] text-primaryShopper w-20 h-7 text-center px-3 py-1 mt-3 rounded-md text-xs font-PoppinsSemiBold`,
            orderStatus === "New" && tw`bg-[#E0F2FF] text-primaryShopper`,
            orderStatus === "Delivered" && tw`bg-green-100 text-primary`,
            orderStatus === "Pending" && tw`bg-[#FFE8FD] text-[#FF00EE]`,
          ]}
        >
          {orderStatus}
        </Text>
      </View>

      <View style={tw`items-end`}>
        <Text style={tw`text-primary font-PoppinsBold text-lg`}>
          ${totalPrice}
        </Text>
        <TouchableOpacity
          onPress={onPress}
          style={tw`mt-2 bg-primaryShopper px-4 py-1.5 rounded-lg`}
        >
          <Text style={tw`text-white font-PoppinsMedium text-sm`}>
            View details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderedCard;
