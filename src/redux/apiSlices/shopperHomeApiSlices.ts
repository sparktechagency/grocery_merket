import { api } from "../api/baseApi";

const shopperHomeApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecentOrder: builder.query({
      query: () => ({
        url: `/shopper/recentOrders?per_page=30&page=1`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getRecentOrderDetails: builder.query({
      query: (orderId) => ({
        url: `/shopper/recentOrderDetails/${orderId}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getNewOrder: builder.query({
      query: () => ({
        url: `/shopper/newOrders?per_page=30&page=1`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    updateOrderStatus: builder.mutation({
      query: (data) => ({
        url: `/shopper/orders/${data.id}/status`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
    getPendingOrder: builder.query({
      query: () => ({
        url: `/shopper/pendingOrders?per_page=50&page=1`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getPendingOrderDetails: builder.query({
      query: (orderId) => ({
        url: `/shopper/pendingOrderDetails/${orderId}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    getShopperAllOrder: builder.query({
      query: () => ({
        url: `/shopper/allShopperOrders`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    orderPickedUp: builder.mutation({
      query: (data) => ({
        url: `/shopper/orderPickedUp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
    sendDeliveryRequest: builder.mutation({
      query: (orderId) => ({
        url: `/shopper/sendDeliveryRequest`,
        method: "POST",
        body: { orderId },
      }),
      invalidatesTags: ["order"],
    }),
    activeInactiveStatus: builder.mutation({
      query: (status) => ({
        url: `/shopper/activeInactiveShopper`,
        method: "POST",
        body: { status },
      }),
      invalidatesTags: ["order"],
    }),
    getShopperStatus: builder.query({
      query: () => ({
        url: `/shopper/getShopperStatus`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});

export const {
  useGetRecentOrderQuery,
  useGetRecentOrderDetailsQuery,
  useGetNewOrderQuery,
  useUpdateOrderStatusMutation,
  useGetPendingOrderQuery,
  useGetPendingOrderDetailsQuery,
  useGetShopperAllOrderQuery,
  useOrderPickedUpMutation,
  useSendDeliveryRequestMutation,
  useActiveInactiveStatusMutation,
  useGetShopperStatusQuery,
} = shopperHomeApiSlices;
