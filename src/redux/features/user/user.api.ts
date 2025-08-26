import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // user analytics overview
    userAnalytics: builder.query({
      query: () => ({
        url: "/user/me/analytics",
        method: "GET",
      }),
    }),
  }),
});

export const { useUserAnalyticsQuery } = userApi;
