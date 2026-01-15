"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UserCircle, QrCode, X } from "lucide-react";

const nav = [
  { name: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/teacher/profile", icon: UserCircle },
  { name: "Scan QR", href: "/teacher/scan", icon: QrCode },
];

export default function TeacherSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="h-full m-3 p-4 rounded-2xl bg-[#0B1628]/95 border border-white/10 flex flex-col">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-lg font-bold">Teacher Panel</h2>
              <p className="text-xs opacity-50">School System</p>
            </div>

            <button onClick={onClose} className="md:hidden">
              <X />
            </button>
          </div>

          {/* Nav */}
          <nav className="space-y-2">
            {nav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex-1" />

          <div className="text-xs opacity-40">© 2026 School System</div>
        </div>
      </aside>
    </>
  );
}
