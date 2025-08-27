import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const UserTransactions = lazy(
  () => import("@/components/modules/Transaction/UserAgentTransactions")
);
const AddMoney = lazy(() => import("@/components/modules/Wallet/AddMoney"));
const SendMoney = lazy(() => import("@/components/modules/Wallet/SendMoney"));
const WithdrawMoney = lazy(
  () => import("@/components/modules/Wallet/WithdrawMoney")
);
const UserAnalytics = lazy(() => import("@/pages/User/Analytics"));
const UserWallet = lazy(() => import("@/pages/User/UserWallet"));

// user sidebar items
export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Wallet Management",
    items: [
      {
        title: "Overiew",
        url: "/user/analytics",
        Component: UserAnalytics,
      },
      {
        title: "My Wallet",
        url: "/user/wallet",
        Component: UserWallet,
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "Add Money",
        url: "/user/wallet/add-money",
        Component: AddMoney,
      },
      {
        title: "Send Money",
        url: "/user/wallet/send-money",
        Component: SendMoney,
      },
      {
        title: "Withdraw Money",
        url: "/user/wallet/withdraw-money",
        Component: WithdrawMoney,
      },
      {
        title: "Transaction History",
        url: "/user/wallet/transaction-history",
        Component: UserTransactions,
      },
    ],
  },
];
