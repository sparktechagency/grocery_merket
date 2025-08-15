import { View, Text } from "react-native";
import React from "react";
import tw from "../lib/tailwind";

interface IOrderBillProps {
  totalItems: number;
  subTotal: number;
  deliveryCharge: number;
  tax: number;
  total: number;
  headerTitle: string;
}

const OrderBill = ({
  totalItems,
  subTotal,
  deliveryCharge,
  tax,
  total,
  headerTitle = "",
}: IOrderBillProps) => {
  return (
    <View style={tw`w-full bg-[#e7e9eb]  rounded-xl mt-4`}>
      {headerTitle ? (
        <View style={tw`flex-row  rounded-t-lg bg-white px-5 py-2`}>
          <Text style={tw`font-PoppinsRegular text-sm text-regularText`}>
            {headerTitle}
          </Text>
        </View>
      ) : null}

      <View style={tw`px-5 py-3`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
            Total items:
          </Text>
          <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
            $ {totalItems}
          </Text>
        </View>
        <View style={tw`flex-row justify-between items-center mt-2`}>
          <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
            Sub total:
          </Text>
          <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
            $ {subTotal}
          </Text>
        </View>
        <View style={tw`flex-row justify-between items-center mt-2`}>
          <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
            Delivery charge:
          </Text>
          <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
            $ {deliveryCharge}
          </Text>
        </View>
        <View style={tw`flex-row justify-between items-center mt-2`}>
          <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
            Tax:
          </Text>
          <Text style={tw`font-PoppinsRegular text-base text-regularText`}>
            $ {tax}
          </Text>
        </View>
        {/*  ====== border bottom ---------- */}
        <View style={tw`w-full mb-2`}>
          <Text style={tw`w-full mx-auto border-b border-regularText  `}></Text>
        </View>

        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-PoppinsSemiBold text-lg text-black`}>
            Total:
          </Text>
          <Text style={tw`font-PoppinsSemiBold text-lg text-black`}>
            $ {total}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderBill;
