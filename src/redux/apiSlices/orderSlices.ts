import { api } from "../api/baseApi";

const orderSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: `/app/orders/`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `/app/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, status }) => ({
        url: `/app/orders/${id}/status`,
        method: "POST",
        body: { status },
      }),
      invalidatesTags: ["order"],
    }),

    getTruckOrders: builder.query({
      query: (id) => ({
        url: `/app/orders/${id}/track`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
  useGetTruckOrdersQuery,
} = orderSlices;
