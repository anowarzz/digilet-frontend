import Transactions from "@/pages/Agent/Transactions";
import Wallet from "@/pages/Agent/Wallet";
import type { ISidebarItem } from "@/types";

// add the agent sidebar items
export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Wallet Management",
    items: [
      {
        title: "My Wallet",
        url: "/user/my-wallet",
        Component: Wallet,
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "Transaction History",
        url: "/user/transaction-history",
        Component: Transactions,
      },
    ],
  },
];
