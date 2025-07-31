import { api } from "../api/baseApi";

const messagingApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: "/app/sendMessage",
        method: "POST",
        body: messageData,
      }),
      invalidatesTags: ["messages"],
    }),
  }),
});

export const { useSendMessageMutation } = messagingApiSlices;
