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
    getCartById: build.query({
      query: (cartId) => ({
        url: `/app/getCartById/${cartId}`,
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    deleteCartItem: build.mutation({
      query: (cartItemId) => ({
        url: `/app/removeCart/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    updateCartItem: build.mutation({
      query: (cartDataId) => ({
        url: `/app/updateCart/${cartDataId}`,
        method: "POST",
        body: cartDataId,
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useLazyGetCartByIdQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} = cartSlices;
