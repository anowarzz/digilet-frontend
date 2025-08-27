import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: [
    "USER",
    "WALLET",
    "USERS",
    "AGENTS",
    "TRANSACTIONS",
    "ANALYTICS",
    "WALLETS",
    "ADMIN_ANALYTICS",
    "USER_ANALYTICS",
    "AGENT_ANALYTICS",
    "AUTH",
    "ADMINS"
  ],
});
