import AddMoney from "@/components/modules/Wallet/AddMoney";
import SendMoney from "@/components/modules/Wallet/SendMoney";
import UserAgentTransactions from "@/components/modules/Wallet/UserAgentTransactions";
import WithdrawMoney from "@/components/modules/Wallet/WithdrawMoney";
import { UserRole } from "@/constants/role";
import AgentWallet from "@/pages/Agent/AgentWallet";
import Analytics from "@/pages/Agent/Analytics";
import CashIn from "@/pages/Agent/CashIn";
import CashOut from "@/pages/Agent/CashOut";
import type { ISidebarItem, TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";

// agent sidebar items
export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Home",
    items: [
      {
        title: "Analytics",
        url: "/agent/analytics",
        Component: withAuth(Analytics, UserRole.AGENT as TRole),
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
