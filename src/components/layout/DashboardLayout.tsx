import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useCurrentUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Outlet } from "react-router";
import UserAvatar from "../Avatar";
import { DashboardSidebar } from "../ui/DashboardSideBar";

const DashboardLayout = () => {
  const { data: userData } = useCurrentUserInfoQuery(undefined);
  const role = userData?.data?.role;

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center border-b px-4 justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <UserAvatar role={role} />
        </header>

        <div className="flex flex-1 flex-col gap-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
