import { api } from "../api/baseApi";

const wishListSlices = api.injectEndpoints({
  endpoints: (build) => ({
    addToWishlist: build.mutation({
      query: (wishlistData) => ({
        url: "/app/addToWishlist",
        method: "POST",
        body: wishlistData,
      }),
      invalidatesTags: ["wishlist"],
    }),
    getWishlist: build.query({
      query: () => ({
        url: "/app/getWishlist",
        method: "GET",
      }),
      providesTags: ["wishlist"],
    }),
    getWishlistById: build.query({
      query: (productId) => ({
        url: `/app/getWishlistById/${productId}`,
        method: "GET",
      }),
      providesTags: ["wishlist"],
    }),
    deleteWishlistItem: build.mutation({
      query: (wishlistItemId) => ({
        url: `/app/removeWishlist/${wishlistItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
    deleteAllWishlist: build.mutation({
      query: () => ({
        url: "/app/deleteAllWishlist",
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useLazyGetWishlistByIdQuery,
  useDeleteWishlistItemMutation,
  useDeleteAllWishlistMutation,
} = wishListSlices;
