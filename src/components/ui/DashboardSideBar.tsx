import * as React from "react";

import Logo from "@/assets/Logos/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useCurrentUserInfoQuery } from "@/redux/features/auth/auth.api";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Link } from "react-router";

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useCurrentUserInfoQuery(undefined);
  const { setOpenMobile, isMobile } = useSidebar();

  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link className="pl-2" to="/">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} onClick={handleLinkClick}>
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarRail />
    </Sidebar>
  );
}
