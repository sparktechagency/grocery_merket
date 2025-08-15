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
        url: "/app/getAllShopper?page=1&per_page=20",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    getPersonalShopper: builder.query({
      query: () => ({
        url: "/app/personalShopper",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    makeShopper: builder.mutation({
      query: (shopperData) => ({
        url: "/app/makeShopper",
        method: "POST",
        body: shopperData,
      }),
      invalidatesTags: ["profile"],
    }),

    removeShopper: builder.mutation({
      query: () => ({
        url: `/app/removeShopper`,
        method: "DELETE",
      }),
      invalidatesTags: ["profile"],
    }),

    getMyOffer: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["profile"],
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
} = profileSlices;
