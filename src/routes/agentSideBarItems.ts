import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const UserAgentTransactions = lazy(() => import("@/components/modules/Transaction/UserAgentTransactions"));
const AddMoney = lazy(() => import("@/components/modules/Wallet/AddMoney"));
const SendMoney = lazy(() => import("@/components/modules/Wallet/SendMoney"));
const WithdrawMoney = lazy(() => import("@/components/modules/Wallet/WithdrawMoney"));
const AgentWallet = lazy(() => import("@/pages/Agent/AgentWallet"));
const Analytics = lazy(() => import("@/pages/Agent/Analytics"));
const CashIn = lazy(() => import("@/pages/Agent/CashIn"));
const CashOut = lazy(() => import("@/pages/Agent/CashOut"));

// agent sidebar items
export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Home",
    items: [
      {
        title: "Analytics",
        url: "/agent/analytics",
        Component: Analytics,
      },
      {
        title: "My Wallet",
        url: "/agent/wallet",
        Component: AgentWallet,
      },
    ],
  },

  {
    title: "Agent Corner",
    items: [
      {
        title: "Cash In",
        url: "/agent/cash-in",
        Component: CashIn,
      },
      {
        title: "Cash Out",
        url: "/agent/cash-out",
        Component: CashOut,
      },
    ],
  },
  {
    title: "Wallet Management",
    items: [
      {
        title: "Add Money",
        url: "/agent/wallet/add-money",
        Component: AddMoney,
      },
      {
        title: "Send Money",
        url: "/agent/wallet/send-money",
        Component: SendMoney,
      },
      {
        title: "Withdraw Money",
        url: "/agent/wallet/withdraw-money",
        Component: WithdrawMoney,
      },
      {
        title: "Transaction History",
        url: "/agent/wallet/transaction-history",
        Component: UserAgentTransactions,
      },
    ],
  },
];
