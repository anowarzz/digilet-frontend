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
  }),
});

export const {
  useAllUsersandAgentsQuery,
  usePendingAgentsQuery,
  useActiveAgentsQuery,
  useAllUsersQuery,
} = adminApi;
