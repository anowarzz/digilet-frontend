import App from "@/App";
import AuthLayout from "@/components/layout/AuthLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Profile from "@/components/modules/Profile/Profile";
import { UserRole } from "@/constants/role";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import Faq from "@/pages/Faq/Faq";
import Features from "@/pages/Features/Features";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register/Register";
import Unauthorized from "@/pages/UnAuthorized";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoues";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    errorElement: <NotFound />,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "features", Component: Features },
      { path: "contact", Component: Contact },
      { path: "faq", Component: Faq },
    ],
  },
  {
    Component: withAuth(DashboardLayout, UserRole.ADMIN as TRole),
    path: "/admin",
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
      { path: "profile/:id", Component: Profile },
    ],
  },
  {
    Component: withAuth(DashboardLayout, UserRole.USER as TRole),
    path: "/user",
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to="/user/my-wallet" /> },
      ...generateRoutes(userSidebarItems),
      { path: "profile/:id", Component: Profile },
    ],
  },
  {
    Component: withAuth(DashboardLayout, UserRole.AGENT as TRole),
    path: "/agent",
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to="/agent/analytics" /> },
      ...generateRoutes(agentSidebarItems),
      { path: "profile/:id", Component: Profile },
    ],
  },

  {
    Component: AuthLayout,
    errorElement: <NotFound />,
    children: [
      { path: "/login", Component: Login, index: true },
      { path: "/register", Component: Register },
    ],
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);

export default router;
