"use client";

import { useState } from "react";
import TeacherSidebar from "@/components/teacher/TeacherSidebar";
import { Menu } from "lucide-react";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#050B14] text-white overflow-hidden">

      {/* Soft background glow */}
      <div className="pointer-events-none absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-600/10 blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-emerald-600/10 blur-[160px] rounded-full" />

      {/* Sidebar */}
      <TeacherSidebar open={open} onClose={() => setOpen(false)} />

      {/* Main */}
      <div className="md:ml-64 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="h-16 flex items-center gap-4 px-6">
          <button
            onClick={() => setOpen(true)}
            className="glass p-2 rounded-xl md:hidden"
          >
            <Menu size={20} />
          </button>

          <h1 className="font-medium opacity-70">Teacher Panel</h1>
        </header>

        {/* Content */}
        <main className="flex-1 px-6 pb-10">
          {children}
        </main>
      </div>
    </div>
  );
}
