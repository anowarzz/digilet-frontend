import { role } from "@/constants/role";
import Analytics from "@/pages/Agent/Analytics";
import Transactions from "@/pages/Agent/AgentTransactions";
import Wallet from "@/pages/Agent/AgentWallet";
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
        Component: withAuth(Analytics, role.AGENT as TRole),
      },
    ],
  },
  {
    title: "Wallet Management",
    items: [
      {
        title: "My Wallet",
        url: "/agent/wallet",
        Component: withAuth(Wallet, role.AGENT as TRole),
      },

    ],
  },
  {
    title: "Transaction Management",
    items: [
      {
        title: "Transaction History",
        url: "/agent/transaction-history",
        Component: withAuth(Transactions, role.AGENT as TRole),
      },
    ],
  },
];
