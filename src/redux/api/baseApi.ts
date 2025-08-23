import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface BaseQueryArgs extends AxiosRequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
}

// Type for the args that will be passed to axios (base query arguments)

const baseQueryWithRath: BaseQueryFn<BaseQueryArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  try {
    const token = await AsyncStorage.getItem("token");
    // console.log(token, "token from base url............");

    // console.log(token, "token from base url............");

    const result: AxiosResponse = await axios({
      // ----------- live base url ------------------
      baseURL: "http://10.10.10.63:8001/api",

      //  local base url ---------- ------------
      // baseURL: "http://10.10.10.63:8001/api",
      ...args,
      url: args.url,
      method: args.method,
      data: args.body,
      headers: {
        ...args.headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (result?.status === 403) {
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
    }

    if (result?.status === 401) {
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
    }
    if (typeof result?.data === "string") {
      // if (!result.data.endsWith('}')) {
      const withCurly = (result.data += "}");
      return { data: JSON.parse(withCurly) };
      // }
    }
    if (typeof result?.data === "object") {
      return { data: result?.data };
    }

    return { data: result?.data };
  } catch (error: any) {
    if (error.response?.data) {
      if (typeof error.response?.data === "string") {
        const withCurly = (error.response.data += "}");

        return { error: JSON.parse(withCurly) };
      } else {
        return { error: error.response?.data };
      }
    }
    return {
      error: {
        status: error.response?.status || 500,
        data: error.message || "Something went wrong",
      },
    };
  }
};

// Define the `createApi` with appropriate types
export const api = createApi({
  keepUnusedDataFor: 0,
  reducerPath: "api",
  baseQuery: baseQueryWithRath,
  endpoints: () => ({}),
  tagTypes: [
    "user",
    "homeBanner",
    "searchForPriceComparison",
    "searchProductsWithFilter",
    "productDetails",
    "kogerAllCategories",
    "messages",
    "cart",
    "card",
    "searchKogerProducts",
    "searchKrogerProductsWithFilter",
    "krogerProductDetails",
    "krogerProductDetailsWithFilter",
    "searchKogerProduct",
    "productByCategory",
    "kogerAllStore",
    "productByStore",
    "krogerProductByStore",
    "krogerProductByCategory",
    "krogerProductByStoreWithFilter",
    "krogerProductByCategoryWithFilter",
    "wishlist",
    "krogerWishlist",
    "krogerCart",
    "krogerCard",
    "notification",
    "profile",
    "payment",
    "userLocation",
    "order",
    "shopper",
    "getRecommendationProducts",
  ],
});

// export const imageUrl = 'http://10.10.10.63:8001/api';
export const imageUrl = "http://10.10.10.63:8001/api";
