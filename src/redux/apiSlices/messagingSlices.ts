import { api } from "../api/baseApi";
import { IFetchingInterface, IMessageInterface } from "../interface/interface";

const messagingApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: "/app/messages",
        method: "POST",
        body: messageData,
      }),
      invalidatesTags: ["messages"],
    }),

    getMessages: builder.query<IFetchingInterface, any>({
      query: (id) => ({
        url: `/app/messages/message/${id}`,
        method: "GET",
      }),
      providesTags: ["messages"],
    }),

    unreadCount: builder.query({
      query: () => ({
        url: "/app/messages/unreadCount",
        method: "GET",
      }),
      providesTags: ["messages"],
    }),
    receivedMessages: builder.query({
      query: () => ({
        url: "/app/messages/receivedMessages",
        method: "GET",
      }),
      providesTags: ["messages"],
    }),
    connect: builder.mutation({
      query: (id) => ({
        url: `/app/messages/connect/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["messages"],
    }),
  }),
});

export const {
  useSendMessageMutation,
  useUnreadCountQuery,
  useReceivedMessagesQuery,
  useConnectMutation,
  useGetMessagesQuery,
} = messagingApiSlices;
