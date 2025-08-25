import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import BackWithComponent from "@/src/lib/backHeader/BackWithCoponent";
import tw from "@/src/lib/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import { useCreateCryptoPaymentIntentMutation } from "@/src/redux/apiSlices/payment";
import { WebView } from "react-native-webview";

const CryptoPayment = () => {
  const { shopperId, currency } = useLocalSearchParams();
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  //  =================== api call ===================
  const [createCryptoPayment, { isLoading }] =
    useCreateCryptoPaymentIntentMutation();

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await createCryptoPayment({
          shopper_id: Number(shopperId),
          crypto_currency: currency,
        }).unwrap();
        if (response?.data?.payment_url) {
          setPaymentUrl(response.data.payment_url);
        }
      } catch (error) {
        console.error(error);
      }
    };
    createPaymentIntent();
  }, []);

  return (
    <View style={tw`flex-1`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={"Payment By Crypto"}
      />

      {isLoading && !paymentUrl ? (
        <View style={tw`flex-1 items-center justify-center`}>
          <ActivityIndicator size="large" />
          <Text style={tw`mt-2`}>Preparing your payment...</Text>
        </View>
      ) : paymentUrl ? (
        // Render WebView once URL is ready
        <WebView
          source={{ uri: paymentUrl }}
          style={tw`flex-1`}
          startInLoadingState
          renderLoading={() => (
            <View style={tw`flex-1 items-center justify-center`}>
              <ActivityIndicator size="large" />
            </View>
          )}
        />
      ) : (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text>Failed to load payment page</Text>
        </View>
      )}
    </View>
  );
};

export default CryptoPayment;
