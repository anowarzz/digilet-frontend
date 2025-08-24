import { UserRole } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { agentSidebarItems } from "@/routes/agentSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";

import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case UserRole.ADMIN:
      return [...adminSidebarItems];

    case UserRole.USER:
      return [...userSidebarItems];

    case UserRole.AGENT:
      return [...agentSidebarItems];
    default:
      return [];
  }
};
