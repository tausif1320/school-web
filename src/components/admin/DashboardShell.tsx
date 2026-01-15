"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#050B14] text-white overflow-hidden">

      {/* Glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-600/20 blur-[160px] rounded-full" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-purple-600/20 blur-[160px] rounded-full" />

      {/* Sidebar */}
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* Main */}
      <div className="relative flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="h-16 flex items-center gap-4 px-6">
          <button
            onClick={() => setOpen(true)}
            className="glass p-2 rounded-xl"
          >
            <Menu size={20} />
          </button>

          <h1 className="font-semibold opacity-80">Admin Panel</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 px-6 pb-10">
          {children}
        </main>
      </div>
    </div>
  );
}
