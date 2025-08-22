import App from "@/App";
import AuthLayout from "@/components/layout/AuthLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import Faq from "@/pages/Faq/Faq";
import Features from "@/pages/Features/Features";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import { createBrowserRouter } from "react-router";

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
    Component: DashboardLayout,
    path: "/user",
    children: [
      
    ]
  },
  {
    Component: AuthLayout,
    children: [
      { path: "/login", Component: Login, index: true },
      { path: "/register", Component: Register },
    ],
  },
]);

export default router;
