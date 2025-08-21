import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import router from "./routes/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </ReduxProvider>
  </StrictMode>
);
