import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { api } from "../api/baseApi";

const notificationSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    createNotification: builder.mutation({
      query: (notificationData) => ({
        url: `/app/createNotification`,
        method: "POST",
        body: notificationData,
      }),
      invalidatesTags: ["notification"],
    }),
    getNotifications: builder.query({
      query: () => ({
        url: `/app/getNotifications`,
        method: "GET",
      }),
      providesTags: ["notification"],
    }),

    getNotification: builder.query({
      query: () => ({
        url: `/app/getNotification/1`,
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
    readNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/app/readNotification/${notificationId}`,
        method: "POST",
        body: { notificationId },
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetNotificationsQuery,
  useGetNotificationQuery,
  useReadNotificationMutation,
} = notificationSlices;
