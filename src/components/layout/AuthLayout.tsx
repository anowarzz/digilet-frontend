// src/components/layout/AuthLayout.tsx

import React from "react";
import { Outlet } from "react-router-dom";
import AuthNavbar from "../modules/Authentication/AuthNavbar";

const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto flex-col">
      <AuthNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
