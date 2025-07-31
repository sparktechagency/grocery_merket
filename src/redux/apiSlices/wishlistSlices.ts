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
    deleteWishlistItem: build.mutation({
      query: (wishlistItemId) => ({
        url: `/app/removeWishlist/1/${wishlistItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useDeleteWishlistItemMutation,
} = wishListSlices;
