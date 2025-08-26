import { baseApi } from "@/redux/baseApi";
import { type TUserStatus } from "./../../../types/index";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users and agents
    allUsersandAgents: builder.query({
      query: () => ({
        url: "/admin/all/users-and-agents",
        method: "GET",
      }),
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

    // blocking user
    blockUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/block/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS"],
    }),
    // Deleting a user
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USERS"],
    }),

    // unblocking user
    unblockUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/unblock/${userId}`,
        method: "PATCH",
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
    // get analytics overview
    analyticsOverview: builder.query({
      query: () => ({
        url: "/admin/analytics/overview",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAllUsersandAgentsQuery,
  usePendingAgentsQuery,
  useRejectAgentMutation,
  useAnalyticsOverviewQuery,
  useAllAgentsQuery,
  useAllTransactionsQuery,
  useActiveAgentsQuery,
  useDeleteUserMutation,
  useSuspendedAgentsQuery,
  useApproveAgentMutation,
  useSuspendAgentMutation,
  useAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = adminApi;
