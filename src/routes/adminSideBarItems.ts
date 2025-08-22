import { role } from "@/constants/role";
import AgentManagement from "@/pages/Admin/AgentManagement";
import AllUsers from "@/pages/Admin/AllUsers";
import Analytics from "@/pages/Admin/Analytics";
import type { ISidebarItem, TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";

// admin sidebar items
export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        Component: withAuth(Analytics, role.ADMIN as TRole),
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        url: "/admin/all-users",
        Component: withAuth(AllUsers, role.ADMIN as TRole),
      },
    ],
  },
  {
    title: "Agent Management",
    items: [
      {
        title: "All Agents",
        url: "/admin/all-agents",
        Component: withAuth(AgentManagement, role.ADMIN as TRole),
      },
    ],
  },
];
