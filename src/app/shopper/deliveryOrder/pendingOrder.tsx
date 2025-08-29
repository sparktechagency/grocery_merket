import { View, FlatList } from "react-native";
import tw from "@/src/lib/tailwind";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import { useGetPendingOrderQuery } from "@/src/redux/apiSlices/shopperHomeApiSlices";
import OrderedCard from "@/src/components/OrderedCard";

const DeliveryOrder = () => {
  // ====================== API CALL ======================
  const { data: getPendingOrder } = useGetPendingOrderQuery({});

  const headerComponent = () => (
    <BackWithComponent onPress={() => router.back()} title="Pending orders" />
  );

  const renderItem = ({ item }) => (
    <OrderedCard
      onPress={() =>
        router.push({
          pathname: "/shopper/deliveryOrder/deliveryOrderMonitoring",
          params: {
            orderId: item?.order_id,
          },
        })
      }
      customerName={item?.user_name}
      orderStatus={"Pending"}
      orderId={item?.order_number}
      totalPrice={item?.total_price}
    />
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        ListHeaderComponent={headerComponent}
        data={getPendingOrder?.data || []}
        keyExtractor={(item, index) =>
          item?.order_id ? item.order_id.toString() : index.toString()
        }
        renderItem={renderItem}
      />
    </View>
  );
};

export default DeliveryOrder;
