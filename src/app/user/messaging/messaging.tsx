import { Alert, FlatList, Image, Text, TextInput, View } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback } from "react";
import tw from "@/src/lib/tailwind";
import TButton from "@/src/lib/buttons/TButton";
import BackButton from "@/src/lib/backHeader/BackButton";
import {
  useGetProfileQuery,
  useGetShopperDetailsQuery,
} from "@/src/redux/apiSlices/profileSlieces";
import { io } from "socket.io-client";

import { useProfileQuery } from "@/src/redux/apiSlices/authSlices";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/src/redux/apiSlices/messagingSlices";
import { IMessageInterface } from "@/src/redux/interface/interface";

const Message = () => {
  const { shopperId } = useLocalSearchParams();

  const router = useRouter();
  const [message, setMessage] = React.useState("");
  const [allMessages, setAllMessages] = React.useState<
    IMessageInterface[] | []
  >([]);

  // =========================== apis ===============================
  const { data: shopperInfo, isLoading } = useGetShopperDetailsQuery(shopperId);
  const {
    data: getMessages,
    isFetching,
    refetch: messageRefetch,
  } = useGetMessagesQuery(shopperId);

  const { data: getProfileData } = useGetProfileQuery({});
  const socket = io(
    `http://10.10.10.63:3100?userId=${getProfileData?.user?.id}`
  );

  // console.log(getProfileData);

  const [sendMessage, sendMessageResults] = useSendMessageMutation();
  const handleSendMessage = useCallback(async () => {
    // console.log(message);
    if (message?.length) {
      const data = await sendMessage({
        sender_id: getProfileData?.data?.id,
        receiver_id: shopperId,
        message: message,
      }).unwrap();

      socket.emit("private_message", {
        user_id: getProfileData?.data?.id,
        recevier_id: 6,
        message: message,
      });
      messageRefetch();
      setMessage("");
      console.log(data);
    } else {
      console.log("Message is empty");
      router.push("/Toaster?res=Message is empty");
    }
  }, [message]);

  React.useEffect(() => {
    setAllMessages(
      (getMessages?.messages && [...getMessages?.messages])?.reverse() || []
    );
    socket.on("private_message", (data) => {
      console.log("Connected to Socket.IO server");
      console.log(data);
    });
  }, [getMessages?.success, isFetching]);

  return (
    <View style={tw`bg-white flex-1`}>
      <View style={tw`px-4 py-3 bg-white shadow-lg flex-row items-center `}>
        <View style={tw`flex-row items-center gap-1 `}>
          <BackButton
            onPress={() => {
              router.back();
            }}
          />
          <Image
            style={tw`w-10 h-10 rounded-full`}
            source={{
              uri: shopperInfo?.data?.photo,
            }}
          />
        </View>
        <Text style={tw`text-xl text-deepBlue400 font-PoppinsBold`}>
          {shopperInfo?.data?.name}
        </Text>
      </View>

      <FlatList
        keyboardShouldPersistTaps="always"
        invertStickyHeaders
        inverted
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={tw`gap-3  py-10`}
        data={allMessages}
        renderItem={({ item }) => {
          const myUserId = getProfileData?.user?.id === item?.sender_id;
          // console.log(myUserId);
          return (
            <>
              {myUserId && (
                <View style={tw` flex-row items-start gap-2 px-4`}>
                  <View style={tw`flex-1 flex-row items-end gap-2`}>
                    <Text
                      style={tw`text-xs text-deepBlue75 font-PoppinsRegular`}
                    >
                      {item.created_at &&
                        new Date(item.created_at).toLocaleDateString("en-US")}
                    </Text>
                    <View
                      style={tw`flex-1 bg-primary p-3 rounded-l-md rounded-b-md`}
                    >
                      <Text style={tw`text-base text-white font-PoppinsMedium`}>
                        {item.message}
                      </Text>
                    </View>
                  </View>
                  <Image
                    style={tw`w-10 h-10 rounded-full`}
                    source={{
                      uri: item?.image,
                    }}
                  />
                </View>
              )}
              {myUserId || (
                <View style={tw` flex-row items-start gap-2 px-4`}>
                  <Image
                    style={tw`w-10 h-10 rounded-full`}
                    source={{
                      uri: item?.image,
                    }}
                  />
                  <View style={tw`flex-1 flex-row items-end gap-2`}>
                    <View
                      style={tw`flex-1 bg-white p-3 rounded-r-md rounded-b-md`}
                    >
                      <Text
                        style={tw`text-base text-deepBlue400 font-PoppinsMedium`}
                      >
                        {item.message}
                      </Text>
                    </View>
                    <Text
                      style={tw`text-xs text-deepBlue75 font-PoppinsRegular`}
                    >
                      {item.created_at &&
                        new Date(item.created_at).toLocaleDateString("en-US")}
                    </Text>
                  </View>
                </View>
              )}
            </>
          );
        }}
      />
      <View
        style={tw`flex-row items-center border border-gray-200 mx-3 m-3 rounded-full  gap-2`}
      >
        <TextInput
          style={tw`flex-1 bg-white px-4 rounded-md`}
          placeholder="Type a message"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TButton
          title="Send"
          onPress={() => {
            // Send message
            handleSendMessage();
          }}
          containerStyle={tw` bg-transparent px-4`}
          titleStyle={tw`text-deepBlue400 text-base font-PoppinsBold`}
        />
      </View>
    </View>
  );
};

export default Message;
