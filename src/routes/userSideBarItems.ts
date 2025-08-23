import { role } from "@/constants/role";
import AddMoney from "@/pages/User/AddMoney";
import SendMoney from "@/pages/User/SendMoney";
import UserTransactions from "@/pages/User/UserTransactions";
import UserWallet from "@/pages/User/UserWallet";
import WithdrawMoney from "@/pages/User/WithdrawMoney";
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
        Component: UserWallet,
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "Add Money",
        url: "/user/add-money",
        Component: AddMoney,
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        Component: SendMoney,
      },
      {
        title: "Withdraw Money",
        url: "/user/withdraw-money",
        Component: WithdrawMoney,
      },
      {
        title: "Transaction History",
        url: "/user/transaction-history",
        Component: UserTransactions,
      },
    ],
  },
];
