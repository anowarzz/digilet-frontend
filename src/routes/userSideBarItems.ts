import Transactions from "@/pages/Agent/Transactions";
import Wallet from "@/pages/Agent/Wallet";
import type { ISidebarItem } from "@/types";

// user sidebar items
export const userSidebarItems: ISidebarItem[] = [
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
