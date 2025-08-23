import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWallet: builder.query({
      query: () => ({
        url: "/wallet/me",
        method: "GET",
      }),
    }),
    addMoney: builder.mutation({
      query: (addMoneyPayload) => ({
        url: "/wallet/add-money",
        method: "POST",
        data: addMoneyPayload,
      }),
    }),
  }),
});

export const { useGetWalletQuery, useAddMoneyMutation } = walletApi;
