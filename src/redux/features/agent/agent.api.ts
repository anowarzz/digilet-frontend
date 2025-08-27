import { baseApi } from "@/redux/baseApi";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // cash in
    cashIn: builder.mutation({
      query: (cashInPayload) => ({
        url: "/agent/cash-in",
        method: "POST",
        data: cashInPayload,
      }),
      invalidatesTags: ["WALLET", "TRANSACTIONS", "AGENT_ANALYTICS", "WALLETS"],
    }),

    // cashout
    cashOut: builder.mutation({
      query: (cashOutPayload) => ({
        url: "/agent/cash-out",
        method: "POST",
        data: cashOutPayload,
      }),
      invalidatesTags: ["WALLET", "TRANSACTIONS", "AGENT_ANALYTICS", "WALLETS"],
    }),

    // agent analytics overview
    agentAnalytics: builder.query({
      query: () => ({
        url: "/agent/me/analytics",
        method: "GET",
      }),
      providesTags: ["AGENT_ANALYTICS"],
    }),
  }),
});

export const { useCashInMutation, useCashOutMutation, useAgentAnalyticsQuery } =
  agentApi;
