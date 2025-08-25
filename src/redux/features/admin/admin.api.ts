import { baseApi } from "@/redux/baseApi";
import { type TUserStatus } from "./../../../types/index";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsersandAgents: builder.query({
      query: () => ({
        url: "/admin/all/users-and-agents",
        method: "GET",
      }),
    }),
    allUsers: builder.query({
      query: () => ({
        url: "/admin/all-users",
        method: "GET",
      }),
      providesTags: ["USERS"],
    }),
    blockUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/block/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS"],
    }),
    unblockUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/unblock/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS"],
    }),
    activeAgents: builder.query({
      query: () => ({
        url: "/admin/all-agents",
        method: "GET",
        params: {
          status: "ACTIVE" as TUserStatus,
        },
      }),
    }),
    pendingAgents: builder.query({
      query: () => ({
        url: "/admin/all-agents",
        method: "GET",
        params: {
          status: "PENDING" as TUserStatus,
        },
      }),
    }),
    allTransactions: builder.query({
      query: () => ({
        url: "/admin/all-transactions",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAllUsersandAgentsQuery,
  usePendingAgentsQuery,
  useAllTransactionsQuery,
  useActiveAgentsQuery,
  useAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = adminApi;
