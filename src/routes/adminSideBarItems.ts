import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AllAdmins = lazy(() => import("@/pages/Admin/AllAdmins"));
const AllAgents = lazy(() => import("@/pages/Admin/AllAgents"));
const AllTransactions = lazy(() => import("@/pages/Admin/AllTransactions"));
const AllUsers = lazy(() => import("@/pages/Admin/AllUsers"));
const AllWallets = lazy(() => import("@/pages/Admin/AllWallets"));
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const CreateAdmin = lazy(() => import("@/pages/Admin/CreateAdmin"));
const PendingAgents = lazy(() => import("@/pages/Admin/PendingAgents"));

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
        title: "Pending Agent Request",
        url: "/admin/pending-agents",
        Component: PendingAgents,
      },
    ],
  },
  {
    title: "Transactions Management",
    items: [
      {
        title: "All Transactions",
        url: "/admin/all-transactions",
        Component: AllTransactions,
      },
      {
        title: "All Wallets",
        url: "/admin/all-wallets",
        Component: AllWallets,
      },
    ],
  },
  {
    title: "Admin",
    items: [
      {
        title: "Create Admin",
        url: "/admin/create-admin",
        Component: CreateAdmin,
      },
      {
        title: "All Admins",
        url: "/admin/all-admins",
        Component: AllAdmins,
      },
    ],
  },
];
