import { api } from "../api/baseApi";

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

    sendMessages: builder.query({
      query: () => ({
        url: "/app/messages/sentMessages",
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
  useSendMessagesQuery,
  useUnreadCountQuery,
  useReceivedMessagesQuery,
  useConnectMutation,
} = messagingApiSlices;
