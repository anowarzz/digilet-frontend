import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWallet: builder.query({
      query: () => ({
        url: "/wallet/me",
        method: "GET",
      }),
      providesTags: ["WALLET"],
      transformResponse: (response) => response.data,
    }),
    addMoney: builder.mutation({
      query: (addMoneyPayload) => ({
        url: "/wallet/add-money",
        method: "POST",
        data: addMoneyPayload,
      }),
      invalidatesTags: ["WALLET", "TRANSACTIONS", "USER_ANALYTICS", "WALLETS"],
    }),
    sendMoney: builder.mutation({
      query: (sendMoneyPayload) => ({
        url: "/wallet/send-money",
        method: "POST",
        data: sendMoneyPayload,
      }),
      invalidatesTags: ["WALLET", "TRANSACTIONS", "USER_ANALYTICS", "WALLETS"],
    }),
    withdrawMoney: builder.mutation({
      query: (withdrawMoneyPayload) => ({
        url: "/wallet/withdraw-money",
        method: "POST",
        data: withdrawMoneyPayload,
      }),
      invalidatesTags: ["WALLET", "TRANSACTIONS", "USER_ANALYTICS", "WALLETS"],
    }),
    transactionsHistory: builder.query({
      query: (params) => ({
        url: "/transaction/me/history",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTIONS"],
    }),
  }),
});

export const {
  useGetWalletQuery,
  useAddMoneyMutation,
  useSendMoneyMutation,
  useWithdrawMoneyMutation,
  useTransactionsHistoryQuery,
} = walletApi;
