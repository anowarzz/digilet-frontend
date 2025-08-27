import * as React from "react";

import Logo from "@/assets/Logos/Logo";

import { SkeletonCard } from "@/components/Skeleton";
import { useCurrentUserInfoQuery } from "@/redux/features/auth/auth.api";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Link } from "react-router";
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
} from "./sidebar";
import { useSidebar } from "./useSidebar";

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: userData, isLoading } = useCurrentUserInfoQuery(undefined);
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
        {isLoading || !data.navMain.length ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <SkeletonCard
                key={i}
                width="90%"
                height="32px"
                rounded="md"
                lines={1}
                lineWidth="60%"
                lineHeight="16px"
              />
            ))}
          </div>
        ) : (
          <>
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
          </>
        )}
      </SidebarContent>
      <SidebarRail />
      <SidebarRail />
    </Sidebar>
  );
}
