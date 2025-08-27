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
  }),
});

export const {
  useGetRecentOrderQuery,
  useGetRecentOrderDetailsQuery,
  useGetNewOrderQuery,
  useUpdateOrderStatusMutation,
  useGetPendingOrderQuery,
  useGetPendingOrderDetailsQuery,
} = shopperHomeApiSlices;
