import { api } from "../api/baseApi";

const profileSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/app/getProfile",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/app/updateProfile",
        method: "POST",
        body: profileData,
      }),
      invalidatesTags: ["profile"],
    }),

    getAllShopper: builder.query({
      query: () => ({
        url: "/app/getAllShopper?page=1&per_page=30",
        method: "GET",
      }),
      providesTags: ["shopper"],
    }),
    getPersonalShopper: builder.query({
      query: () => ({
        url: "/app/personalShopper",
        method: "GET",
      }),
      providesTags: ["shopper"],
    }),
    makeShopper: builder.mutation({
      query: (userId) => ({
        url: "/app/makeShopper",
        method: "POST",
        body: { user_id: userId },
      }),
      invalidatesTags: ["shopper"],
    }),

    removeShopper: builder.mutation({
      query: () => ({
        url: `/app/removeShopper`,
        method: "DELETE",
      }),
      invalidatesTags: ["shopper"],
    }),

    getMyOffer: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    getShopperDetails: builder.query({
      query: (id) => ({
        url: `/app/shopperDetails/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllShopperQuery,
  useGetPersonalShopperQuery,
  useMakeShopperMutation,
  useRemoveShopperMutation,
  useGetMyOfferQuery,
  useGetShopperDetailsQuery,
} = profileSlices;
