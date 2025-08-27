import UserTransactions from "@/components/modules/Transaction/UserAgentTransactions";
import AddMoney from "@/components/modules/Wallet/AddMoney";
import SendMoney from "@/components/modules/Wallet/SendMoney";
import WithdrawMoney from "@/components/modules/Wallet/WithdrawMoney";
import UserAnalytics from "@/pages/User/Analytics";
import UserWallet from "@/pages/User/UserWallet";
import type { ISidebarItem } from "@/types";

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
