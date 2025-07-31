import { api } from "../api/baseApi";

const cartSlices = api.injectEndpoints({
  endpoints: (build) => ({
    addToCart: build.mutation({
      query: (cartData) => ({
        url: "/app/addToCart",
        method: "POST",
        body: cartData,
      }),
      invalidatesTags: ["cart"],
    }),
    getCart: build.query({
      query: () => ({
        url: "/app/getCart",
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    deleteCartItem: build.mutation({
      query: (cartItemId) => ({
        url: `/app/deleteCartItem/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useDeleteCartItemMutation,
} = cartSlices;
