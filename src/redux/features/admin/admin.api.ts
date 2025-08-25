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
      query: () => ({
        url: "/admin/all-users",
        method: "GET",
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

    // unblocking user
    unblockUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/unblock/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS"],
    }),
    // Get all active agents
    activeAgents: builder.query({
      query: () => ({
        url: "/admin/all-agents",
        method: "GET",
        params: {
          status: "ACTIVE" as TUserStatus,
        },
      }),
    }),
    // Get all pending agents
    pendingAgents: builder.query({
      query: () => ({
        url: "/admin/all-agents",
        method: "GET",
        params: {
          status: "PENDING" as TUserStatus,
        },
        invalidatesTags: ["AGENTS"],
      }),
    }),
    // Get all suspended agents
    suspendedAgents: builder.query({
      query: () => ({
        url: "/admin/all-agents",
        method: "GET",
        params: {
          role: "AGENT",
          status: "SUSPENDED",
        },
        invalidatesTags: ["AGENTS"],
      }),
    }),
    // Approve  pending agent
    approveAgent: builder.mutation({
      query: (agentId: string) => ({
        url: `/admin/agents/approve/${agentId}`,
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
  useSuspendedAgentsQuery,
  useApproveAgentMutation,
  useSuspendAgentMutation,
  useAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = adminApi;
