import changePassword from "@/src/app/auth/changePassword";
import { api } from "../api/baseApi";
import profile from "@/src/app/user/drawer/home/profile";

const authSlices = api.injectEndpoints({
  endpoints: (build) => {
    return {
      profile: build.query({
        query: () => ({
          url: "/auth/profile",
          method: "GET",
        }),
        providesTags: ["user"],
      }),
      login: build.mutation({
        query: (credentials) => ({
          url: "/auth/login",
          method: "POST",
          body: credentials,
        }),
        invalidatesTags: ["user"],
      }),
      logout: build.mutation({
        query: () => ({
          url: "/auth/logout",
          method: "POST",
        }),
        invalidatesTags: ["user"],
      }),
      register: build.mutation({
        query: (userData) => ({
          url: "/auth/register",
          method: "POST",
          body: userData,
        }),
        invalidatesTags: ["user"],
      }),
      changePassword: build.mutation({
        query: (passwordData) => ({
          url: "/auth/change_password",
          method: "POST",
          body: passwordData,
        }),
        invalidatesTags: ["user"],
      }),
      forgotPassword: build.mutation({
        query: (email) => ({
          url: "/auth/forgot_password",
          method: "POST",
          body: { email },
        }),
        invalidatesTags: ["user"],
      }),
      verifyingOTP: build.mutation({
        query: (otpData) => ({
          url: "/auth/verify_otp",
          method: "POST",
          body: otpData,
        }),
        invalidatesTags: ["user"],
      }),
      resendOTP: build.mutation({
        query: (otpData) => ({
          url: "/auth/resend_otp",
          method: "POST",
          body: otpData,
        }),
        invalidatesTags: ["user"],
      }),
    };
  },
});

export const { useLoginMutation } = authSlices;
