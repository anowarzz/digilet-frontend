import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSideBarItems";
import { agentSidebarItems } from "@/routes/agentSideBarItems";
import { userSidebarItems } from "@/routes/userSideBarItems";

import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.ADMIN:
      return [...adminSidebarItems];

    case role.USER:
      return [...userSidebarItems];

    case role.AGENT:
      return [...agentSidebarItems];
    default:
      return [];
  }
};
