"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { Menu } from "lucide-react";
import { SchoolProvider } from "@/context/SchoolContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <SchoolProvider>
      <div className="relative min-h-screen bg-[#050B14] text-white overflow-hidden">

        {/* Decorative glows (DO NOT BLOCK CLICKS) */}
        <div className="pointer-events-none absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-600/20 blur-[160px] rounded-full" />
        <div className="pointer-events-none absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-purple-600/20 blur-[160px] rounded-full" />

        {/* Sidebar */}
        <Sidebar open={open} onClose={() => setOpen(false)} />

        {/* Main Layout */}
        <div className="relative flex flex-col min-h-screen">

          {/* Top bar */}
          <header className="h-16 flex items-center gap-4 px-6 border-b border-white/5">
            <button
              onClick={() => setOpen(true)}
              className="glass p-2 rounded-xl hover:bg-white/10 transition"
            >
              <Menu size={20} />
            </button>

            <h1 className="font-semibold opacity-80">Admin Panel</h1>
          </header>

          {/* Page content */}
          <main className="flex-1 px-6 py-6">
            {children}
          </main>
        </div>
      </div>
    </SchoolProvider>
  );
}
