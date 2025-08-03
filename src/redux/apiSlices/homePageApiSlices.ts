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
      query: (searchParams) => ({
        url: `/app/SearchProductWithFilter?search=Shampoo&per_page=100`,
        method: "GET",
        body: searchParams,
      }),
      providesTags: ["searchProductsWithFilter"],
    }),
    productDetails: build.query({
      query: (productDetails) => ({
        url: `/app/kroger/products/${productDetails.id}`,
        method: "GET",
        body: productDetails,
      }),
      providesTags: ["productDetails"],
    }),

    kogerAllCategories: build.query({
      query: () => ({
        url: `/app/kroger/products/categories`,
        method: "GET",
      }),
      providesTags: ["kogerAllCategories"],
    }),
    searchKogerProducts: build.query({
      query: () => ({
        url: `app/kroger/products/search?search=wine&per_page=100`,
        method: "GET",
      }),
      providesTags: ["searchKogerProduct"],
    }),
    productByCategory: build.query({
      query: () => ({
        url: `/app/kroger/products/categories/Beauty?per_page=100&page=1`,
        method: "GET",
      }),
      providesTags: ["productByCategory"],
    }),
    kogerAllStore: build.query({
      query: () => ({
        url: `/app/kroger/stores`,
        method: "GET",
      }),
      providesTags: ["kogerAllStore"],
    }),
    productByStore: build.query({
      query: () => ({
        url: `/app/kroger/products/stores/Kroger - Irmo Station - St Andrews Rd?per_page=100&page=6`,
        method: "GET",
      }),
      providesTags: ["productByStore"],
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
  useProductDetailsQuery,
  useKogerAllCategoriesQuery,
  useSearchKogerProductsQuery,
  useProductByCategoryQuery,
  useKogerAllStoreQuery,
  useProductByStoreQuery,
} = homePageApiSlices;
