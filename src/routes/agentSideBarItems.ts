import Analytics from "@/pages/Agent/Analytics";
import Transactions from "@/pages/Agent/Transactions";
import Wallet from "@/pages/Agent/Wallet";
import type { ISidebarItem } from "@/types";

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
    ],
  },
  {
    title: "Wallet Management",
    items: [
      {
        title: "Wallet",
        url: "/agent/wallet",
        Component: Wallet,
      },
    ],
  },
  {
    title: "Transaction Management",
    items: [
      {
        title: "Transaction History",
        url: "/agent/transaction-history",
        Component: Transactions,
      },
    ],
  },
];
