"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Wallet,
  UserCircle,
  QrCode,
  CalendarCheck,
  GraduationCap,
  X,
} from "lucide-react";

const nav = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Students", href: "/admin/dashboard/students", icon: GraduationCap },
  { name: "Teachers", href: "/admin/dashboard/teachers", icon: Users },
  { name: "Attendance", href: "/admin/dashboard/attendance", icon: CalendarCheck },
  { name: "Fees", href: "/admin/dashboard/fees", icon: Wallet },
  { name: "QR Generator", href: "/admin/dashboard/qr", icon: QrCode },
  { name: "Profile", href: "/admin/dashboard/profile", icon: UserCircle },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="bg-[#0B1628]/95 border border-white/10 h-full m-3 p-4 rounded-2xl flex flex-col shadow-2xl">

          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold">School Admin</h2>
              <p className="text-xs opacity-60">Management Panel</p>
            </div>

            <button onClick={onClose}>
              <X />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
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
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex-1" />

          <div className="text-xs opacity-50">© 2026 School System</div>
        </div>
      </aside>
    </>
  );
}
