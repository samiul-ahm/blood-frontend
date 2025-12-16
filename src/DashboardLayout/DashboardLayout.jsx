import React from "react";
import { Outlet } from "react-router";
import Aside from "../components/Aside/Aside";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Aside />

      {/* Main content */}
      <main className="flex-1 bg-slate-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
