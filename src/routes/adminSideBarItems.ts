import AllAgents from "@/pages/Admin/AllAgents";
import AllUsers from "@/pages/Admin/AllUsers";
import AllWallets from "@/pages/Admin/AllWallets";
import Analytics from "@/pages/Admin/Analytics";
import PendingAgents from "@/pages/Admin/PendingAgents";
import type { ISidebarItem } from "@/types";

// admin sidebar items
export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        Component: Analytics,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        url: "/admin/all-users",
        Component: AllUsers,
      },
    ],
  },
  {
    title: "Agent Management",
    items: [
      {
        title: "All Agents",
        url: "/admin/all-agents",
        Component: AllAgents,
      },
      {
        title: "Pending Agents",
        url: "/admin/pending-agents",
        Component: PendingAgents,
      },
    ],
  },
  {
    title: "Wallet Management",
    items: [
      {
        title: "All Wallets",
        url: "/admin/all-wallets",
        Component: AllWallets,
      },
    ],
  },
];
