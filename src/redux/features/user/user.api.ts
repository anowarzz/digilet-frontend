import { baseApi } from "@/redux/baseApi";
import type { IUpdateUserData } from "@/types/user.types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // user analytics overview
    userAnalytics: builder.query({
      query: () => ({
        url: "/user/me/analytics",
        method: "GET",
      }),
      providesTags: ["USER_ANALYTICS"],
    }),
    // update user
    updateOwnProfile: builder.mutation({
      query: ({
        userId,
        updatePayload,
      }: {
        userId: string;
        updatePayload: IUpdateUserData;
      }) => ({
        url: `/user/update/${userId}`,
        method: "PATCH",
        data: updatePayload,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const { useUserAnalyticsQuery, useUpdateOwnProfileMutation } = userApi;
