import { View, Text, FlatList, TextInput } from "react-native";
import React, { useCallback } from "react";
import tw from "@/src/lib/tailwind";
import BackButton from "@/src/lib/backHeader/BackButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import TButton from "@/src/lib/buttons/TButton";
import { IMessageInterface } from "@/src/redux/interface/interface";
import { useGetProfileQuery } from "@/src/redux/apiSlices/profileSlieces";
import {
  useLazyGetMessagesQuery,
  useSendMessageMutation,
} from "@/src/redux/apiSlices/messagingSlices";
import { io } from "socket.io-client";

const ShopperChatting = () => {
  const { userId, userName, userImage } = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = React.useState("");
  const [allMessages, setAllMessages] = React.useState<
    IMessageInterface[] | []
  >([]);

  // =========================== apis ===============================
  // const { data: shopperInfo, isLoading } = useGetShopperDetailsQuery(userId);
  console.log();
  const { data: getProfileData } = useGetProfileQuery({});
  const [getMessages, messageResults] = useLazyGetMessagesQuery();
  const [sendMessage, sendMessageResults] = useSendMessageMutation();

  const socket = io(
    `http://10.10.10.63:3100?userId=${getProfileData?.user?.id}`
  );
  const handleSendMessage = useCallback(async () => {
    if (message?.length) {
      const data = await sendMessage({
        sender_id: getProfileData?.data?.id,
        receiver_id: userId,
        message: message,
      }).unwrap();

      socket.emit("private-message", {
        receiverId: userId,
        message: message,
      });
      handleGetMessages();
      setMessage("");
      console.log(data);
    } else {
      console.log("Message is empty");
      router.push("/Toaster?res=Message is empty");
    }
  }, [message]);

  const handleGetMessages = useCallback(async () => {
    // setAllMessages(
    //   // (getMessages?.messages && [...getMessages?.messages])?.reverse() || []
    // );

    const data = await getMessages(userId);
    setAllMessages(
      (data?.data?.messages && [...data?.data?.messages])?.reverse() || []
    );
  }, [messageResults.isFetching]);

  React.useEffect(() => {
    socket.on("private-message", (data) => {
      console.log(data);
      handleGetMessages();
    });
  }, [socket]);

  React.useEffect(() => {
    handleGetMessages();
  }, []);

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
              uri: userImage,
            }}
          />
        </View>
        <Text style={tw`text-xl text-deepBlue400 font-PoppinsBold`}>
          {userName}
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

export default ShopperChatting;
