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
import {
  authApi,
  useCurrentUserInfoQuery,
  useLogOutMutation,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "./button";

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useCurrentUserInfoQuery(undefined);
  const { setOpenMobile, isMobile } = useSidebar();
  const navigate = useNavigate();

  const [logOut] = useLogOutMutation();
  const dispatch = useAppDispatch();

  //handle logout
  const handleLogOut = async () => {
    const toastId = "log-out";
    await logOut(undefined);
    navigate("/");
    toast.info("Logged out successfully", { id: toastId });

    dispatch(authApi.util.resetApiState());
  };

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

        {/* Bottom section for logout button*/}
        <div className="absolute  bottom-0 left-0 w-full p-4 flex justify-center">
          <Button
            variant="destructive"
            className="w-full cursor-pointer"
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </div>
      </SidebarContent>
      <SidebarRail />
      <SidebarRail />
    </Sidebar>
  );
}
