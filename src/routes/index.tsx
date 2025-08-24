import App from "@/App";
import AuthLayout from "@/components/layout/AuthLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { UserRole } from "@/constants/role";
import About from "@/pages/about/About";
import Contact from "@/pages/contact/Contact";
import Faq from "@/pages/faq/Faq";
import Features from "@/pages/features/Features";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import Unauthorized from "@/pages/UnAuthorized";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoues";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSideBarItems";
import { agentSidebarItems } from "./agentSideBarItems";
import { userSidebarItems } from "./userSideBarItems";

const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
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
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, UserRole.USER as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/my-wallet" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, UserRole.AGENT as TRole),
    path: "/agent",
    children: [
      { index: true, element: <Navigate to="/agent/analytics" /> },
      ...generateRoutes(agentSidebarItems),
    ],
  },

  {
    Component: AuthLayout,
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
