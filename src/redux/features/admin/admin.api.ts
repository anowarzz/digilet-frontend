import { baseApi } from "@/redux/baseApi";
import type { IUpdateUserData } from "@/types/user.types";
import { type TUserStatus } from "./../../../types/index";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users and agents
    allUsersandAgents: builder.query({
      query: () => ({
        url: "/admin/all/users-and-agents",
        method: "GET",
      }),
      providesTags: ["USERS", "AGENTS"],
    }),

    // Get all users
    allUsers: builder.query({
      query: (params) => ({
        url: "/admin/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),
    // get single user details
    getUser: builder.query({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["USERS"],
    }),
    // update user details
    updateUser: builder.mutation({
      query: ({
        userId,
        updatePayload,
      }: {
        userId: string;
        updatePayload: IUpdateUserData;
      }) => ({
        url: `/admin/users/update/${userId}`,
        method: "PATCH",
        data: updatePayload,
      }),
      invalidatesTags: ["USER", "USERS"],
    }),

    // blocking user
    blockUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/block/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS", "USER"],
    }),
    // unblocking user
    unblockUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/unblock/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS", "USER"],
    }),
    // Deleting a user
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USERS"],
    }),

    // Get type of agents
    allAgents: builder.query({
      query: (params) => ({
        url: "/admin/all-agents",
        method: "GET",
        params,
      }),
      providesTags: ["AGENTS"],
    }),
    // Get all active agents
    activeAgents: builder.query({
      query: (params = {}) => ({
        url: "/admin/all-agents",
        method: "GET",
        params: {
          status: "ACTIVE" as TUserStatus,
          ...params,
        },
      }),
      providesTags: ["AGENTS"],
    }),
    // Get all pending agents
    pendingAgents: builder.query({
      query: (params = {}) => ({
        url: "/admin/all-agents",
        method: "GET",
        params: {
          status: "PENDING" as TUserStatus,
          ...params,
        },
      }),
      providesTags: ["AGENTS"],
    }),
    // Get all suspended agents
    suspendedAgents: builder.query({
      query: (params = {}) => ({
        url: "/admin/all-agents",
        method: "GET",
        params: {
          role: "AGENT",
          status: "SUSPENDED",
          ...params,
        },
      }),
      providesTags: ["AGENTS"],
    }),
    // Approve  pending agent
    approveAgent: builder.mutation({
      query: (agentId: string) => ({
        url: `/admin/agents/approve/${agentId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["AGENTS"],
    }),
    // reject  pending agent
    rejectAgent: builder.mutation({
      query: (agentId: string) => ({
        url: `/admin/agents/reject/${agentId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["AGENTS"],
    }),

    // Suspend agent
    suspendAgent: builder.mutation({
      query: (agentId: string) => ({
        url: `/admin/agents/suspend/${agentId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["AGENTS"],
    }),

    // Get all transactions
    allTransactions: builder.query({
      query: (params) => ({
        url: "/admin/all-transactions",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTIONS"],
    }),

    // Get all wallets
    allWallets: builder.query({
      query: (params) => ({
        url: "/admin/wallets/all",
        method: "GET",
        params,
      }),
      providesTags: ["WALLETS", "WALLET", "AUTH"],
    }),

    // Block user wallet
    blockUserWallet: builder.mutation({
      query: (userId: string) => ({
        url: `/admin/wallet/block/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["WALLETS"],
    }),

    // Unblock user wallet
    unblockUserWallet: builder.mutation({
      query: (userId: string) => ({
        url: `/admin/wallet/unblock/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["WALLETS"],
    }),

    // get analytics overview
    analyticsOverview: builder.query({
      query: () => ({
        url: "/admin/analytics/overview",
        method: "GET",
      }),
      providesTags: ["ADMIN_ANALYTICS"],
    }),
    // get all admins
    allAdmins: builder.query({
      query: () => ({
        url: "/admin/all-admins",
        method: "GET",
      }),
      providesTags: ["ADMINS"],
    }),

    // create admin
    createAdmin: builder.mutation({
      query: (adminData) => ({
        url: "/admin/create-admin",
        method: "POST",
        data: adminData,
      }),
      invalidatesTags: ["ADMINS"],
    }),
  }),
});

export const {
  useAllUsersandAgentsQuery,
  useAllAdminsQuery,
  useCreateAdminMutation,
  usePendingAgentsQuery,
  useAllWalletsQuery,
  useUpdateUserMutation,
  useRejectAgentMutation,
  useAnalyticsOverviewQuery,
  useAllAgentsQuery,
  useAllTransactionsQuery,
  useGetUserQuery,
  useActiveAgentsQuery,
  useDeleteUserMutation,
  useSuspendedAgentsQuery,
  useApproveAgentMutation,
  useSuspendAgentMutation,
  useAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useBlockUserWalletMutation,
  useUnblockUserWalletMutation,
} = adminApi;
