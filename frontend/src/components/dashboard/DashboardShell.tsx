"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] flex">
      <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          collapsed ? "lg:ml-20" : "lg:ml-72"
        } overflow-x-hidden`}
      >
        <DashboardHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
