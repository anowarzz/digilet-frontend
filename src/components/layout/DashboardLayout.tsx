import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  authApi,
  useCurrentUserInfoQuery,
  useLogOutMutation,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { LogOut } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
import UserAvatar from "../Avatar";
import { Button } from "../ui/button";
import { DashboardSidebar } from "../ui/DashboardSideBar";
import { ModeToggle } from "./ModeToogler";

const DashboardLayout = () => {
  const { data: userData } = useCurrentUserInfoQuery(undefined);
  const role = userData?.data?.role;

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
          <div className="flex items-center gap-4">
            <UserAvatar role={role} />
            <ModeToggle />
            <Link to="/" aria-label="Home Page" title="Back To Home Page">
              <Button variant="outline" size="sm">
                Home Page
              </Button>
            </Link>
            <Button
              onClick={handleLogOut}
              variant="destructive"
              size="sm"
              aria-label="Log Out"
              title="Log Out"
              className="mr-4"
            >
              Logout
              <LogOut />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 ">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
