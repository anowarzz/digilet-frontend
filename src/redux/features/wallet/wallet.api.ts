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
      invalidatesTags: ["WALLET"],
    }),
    sendMoney: builder.mutation({
      query: (sendMoneyPayload) => ({
        url: "/wallet/send-money",
        method: "POST",
        data: sendMoneyPayload,
      }),
      invalidatesTags: ["WALLET"],
    }),
    withdrawMoney: builder.mutation({
      query: (withdrawMoneyPayload) => ({
        url: "/wallet/withdraw-money",
        method: "POST",
        data: withdrawMoneyPayload,
      }),
      invalidatesTags: ["WALLET"],
    }),
    transactionsHistory: builder.query({
      query: () => ({
        url: "/transaction/me/history",
        method: "GET",
      }),
      providesTags: ["WALLET"],
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
