import { api } from "../api/baseApi";

const paymentSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    paymentIntent: builder.mutation<any, any>({
      query: (data) => ({
        url: `/app/payment/create-intent`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payment"],
    }),
    paymentStatus: builder.query({
      query: (id) => ({
        url: `/app/payment/status/${id}`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),
    confirmPayment: builder.mutation<any, any>({
      query: (data) => ({
        url: `/app/payment/confirm`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payment"],
    }),
    paymentReocder: builder.mutation<any, any>({
      query: (id) => ({
        url: `/app/payment/reorder/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["payment"],
    }),
    getAllTransactions: builder.query({
      query: () => ({
        url: `/app/payment/getAllTransactions`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),
  }),
});

export const {
  usePaymentIntentMutation,
  usePaymentStatusQuery,
  useConfirmPaymentMutation,
  usePaymentReocderMutation,
  useGetAllTransactionsQuery,
} = paymentSlices;
