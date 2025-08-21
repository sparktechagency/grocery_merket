import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { api } from "../api/baseApi";

const homePageApiSlices = api.injectEndpoints({
  endpoints: (build) => ({
    homeBanner: build.query({
      query: () => ({
        url: "/app/getAllHomeBanners",
        method: "GET",
      }),
      providesTags: ["homeBanner"],
    }),
    searchForPriceComparison: build.query({
      query: () => ({
        url: "/app/searchForPriceComparison?search=meat&per_page=30",
        method: "GET",
      }),
      providesTags: ["searchForPriceComparison"],
    }),

    addFaceId: build.mutation({
      query: (faceIdData) => ({
        url: "/app/addFaceId",
        method: "POST",
        body: faceIdData,
      }),
      invalidatesTags: ["user"],
    }),
    getFaceId: build.query({
      query: () => ({
        url: "/app/getFaceId",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    addFingerId: build.mutation({
      query: (fingerIdData) => ({
        url: "/app/addFingerId",
        method: "POST",
        body: fingerIdData,
      }),
      invalidatesTags: ["user"],
    }),
    getFingerId: build.query({
      query: () => ({
        url: "/app/getFingerId",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    searchProductsWithFilter: build.query({
      query: (params) => {
        const queryString = new URLSearchParams();

        // ✅ Required field
        if (params?.search) queryString.append("search", params.search);

        // ✅ Optional fields
        if (params?.storeName?.length) {
          queryString.append("storeName", params.storeName.join(", "));
        }
        if (params?.categories?.length) {
          queryString.append("categories", params.categories.join(", "));
        }
        if (params?.price) queryString.append("price", params.price.toString());
        if (params?.per_page) {
          queryString.append("per_page", params.per_page.toString());
        }

        return {
          url: `/app/SearchProductWithFilter?${queryString.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["searchProductsWithFilter"],
    }),

    productDetails: build.mutation({
      query: (productId) => ({
        url: `/app/kroger/products/${productId}`,
        method: "POST",
      }),
      invalidatesTags: ["productDetails"],
    }),

    kogerAllCategories: build.query({
      query: () => ({
        url: `/app/kroger/products/categories`,
        method: "GET",
      }),
      providesTags: ["kogerAllCategories"],
    }),
    searchKogerProducts: build.query({
      query: ({ query }) => ({
        url: `app/kroger/products/search?search=${query}&per_page=100`,
        method: "GET",
      }),
      providesTags: ["searchKogerProduct"],
    }),
    productByCategory: build.mutation({
      query: (category) => ({
        url: `/app/kroger/products/categories/${category}?per_page=10&page=1`,
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["productByCategory"],
    }),
    kogerAllStore: build.query({
      query: () => ({
        url: `/app/kroger/stores`,
        method: "GET",
      }),
      providesTags: ["kogerAllStore"],
    }),
    productByStore: build.mutation({
      query: (storeName) => ({
        url: `/app/kroger/products/stores/${storeName}?per_page=100&page=1`,
        method: "POST",
      }),
      invalidatesTags: ["productByStore"],
    }),
    setUserLocation: build.mutation({
      query: (location) => ({
        url: `/app/setUserLocation`,
        method: "POST",
        body: location,
      }),
      invalidatesTags: ["userLocation"],
    }),
    getUserLocation: build.query({
      query: () => ({
        url: `/app/kroger/getUserLocation`,
        method: "GET",
      }),
      providesTags: ["userLocation "],
    }),
  }),
});

export const {
  useHomeBannerQuery,
  useSearchForPriceComparisonQuery,
  useAddFaceIdMutation,
  useGetFaceIdQuery,
  useAddFingerIdMutation,
  useGetFingerIdQuery,
  useSearchProductsWithFilterQuery,
  useProductDetailsMutation,
  useKogerAllCategoriesQuery,
  useSearchKogerProductsQuery,
  useProductByCategoryMutation,
  useKogerAllStoreQuery,
  useProductByStoreMutation,
  useSetUserLocationMutation,
  useGetUserLocationQuery,
} = homePageApiSlices;
