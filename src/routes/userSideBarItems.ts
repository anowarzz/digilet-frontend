import { role } from "@/constants/role";
import UserTransactions from "@/pages/User/Transactions";
import UserWallet from "@/pages/User/Wallet";
import type { ISidebarItem, TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";

// user sidebar items
export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Wallet Management",
    items: [
      {
        title: "My Wallet",
        url: "/user/my-wallet",
        Component: UserWallet
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "Transaction History",
        url: "/user/transaction-history",
        Component: withAuth(UserTransactions, role.USER as TRole),
      },
    ],
  },
];
