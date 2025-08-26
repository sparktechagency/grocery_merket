import { api } from "../api/baseApi";

const shopperNotificationApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getShopperNotifications: builder.query({
      query: () => ({
        url: `/app/getNotifications`,
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
  }),
});

export const { useGetShopperNotificationsQuery } = shopperNotificationApiSlice;
