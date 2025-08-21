import App from "@/App";
import About from "@/pages/About/About";
import Contact from "@/pages/contact/Contact";
import Faq from "@/pages/Faq/Faq";
import Features from "@/pages/Features/Features";
import Home from "@/pages/Home/Home";
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
]);

export default router;
