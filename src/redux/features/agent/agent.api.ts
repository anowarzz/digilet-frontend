import { baseApi } from "@/redux/baseApi";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    cashIn: builder.mutation({
      query: (cashInPayload) => ({
        url: "/agent/cash-in",
        method: "POST",
        data: cashInPayload,
      }),
      invalidatesTags: ["WALLET"],
    }),
    cashOut: builder.mutation({
      query: (cashOutPayload) => ({
        url: "/agent/cash-out",
        method: "POST",
        data: cashOutPayload,
      }),
      invalidatesTags: ["WALLET"],
    }),
  }),
});

export const { useCashInMutation, useCashOutMutation } = agentApi;
