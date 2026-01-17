"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import {
  Users,
  GraduationCap,
  BarChart3,
  Wallet,
  ChevronRight,
  UserCog,
  CalendarCheck,
  CreditCard,
  Sun,
  Moon,
} from "lucide-react";

type GlowColor = "blue" | "purple" | "green" | "orange";

type StatCardProps = {
  title: string;
  value: string;
  color: GlowColor;
  Icon: React.ElementType;
};

type ActionItemProps = {
  title: string;
  subtitle: string;
  color: GlowColor;
  Icon: React.ElementType;
  href: string;
};

export default function AdminDashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Page>
    <div className="max-w-7xl mx-auto space-y-12">

      {/* Header */}
      <div className="flex justify-between items-center pt-2">
        <div>
          <h1 className="text-xl font-semibold">Springfield High</h1>
          <p className="text-sm opacity-60">Admin Dashboard</p>
        </div>

        <button
          onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
          className="glass p-2 rounded-xl transition hover:-translate-y-[1px] hover:shadow-lg hover:shadow-blue-500/10"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Welcome */}
      <div>
        <h2 className="text-4xl font-bold">Good Morning, Admin</h2>
        <p className="opacity-60 mt-2 max-w-xl">
          Here’s a quick overview of what’s happening across your school today.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard title="Total Students" value="1,245" color="blue" Icon={Users} />
        <StatCard title="Total Teachers" value="84" color="purple" Icon={GraduationCap} />
        <StatCard title="Attendance" value="92%" color="green" Icon={BarChart3} />
        <StatCard title="Pending Fees" value="₹4.2k" color="orange" Icon={Wallet} />
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass p-8 lg:col-span-2 transition hover:-translate-y-[2px] hover:shadow-xl hover:shadow-blue-500/10">
          <h3 className="text-lg font-semibold mb-6">Attendance Trends</h3>
          <svg viewBox="0 0 300 120" className="w-full h-48">
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>

            <polyline
              fill="none"
              stroke="url(#trendGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              points="0,90 40,70 80,85 120,55 160,65 200,45 240,60 280,40"
            />
          </svg>
        </div>

        <div className="glass p-8 transition hover:-translate-y-[2px] hover:shadow-xl hover:shadow-purple-500/10">
          <h3 className="text-lg font-semibold mb-2">Fees Overview</h3>
          <p className="text-sm opacity-60 mb-6">Collected this month</p>
          <div className="text-4xl font-bold mb-4">₹124,500</div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[75%] bg-gradient-to-r from-blue-500 to-purple-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionItem title="Manage Teachers" subtitle="Add, edit, remove" color="purple" Icon={UserCog} href="/admin/dashboard/teachers" />
          <ActionItem title="View Attendance" subtitle="Daily reports" color="green" Icon={CalendarCheck} href="/admin/dashboard/attendance" />
          <ActionItem title="Manage Fees" subtitle="Invoices & payments" color="orange" Icon={CreditCard} href="/admin/dashboard/fees" />
        </div>
      </div>
    </div>
    </Page>
  );
}

/* ---------- Glow Cards ---------- */

function StatCard({ title, value, color, Icon }: StatCardProps) {
  const glow: Record<GlowColor, string> = {
    blue: "bg-blue-500/20 text-blue-400 shadow-[0_0_20px_#3b82f660]",
    purple: "bg-purple-500/20 text-purple-400 shadow-[0_0_20px_#a855f760]",
    green: "bg-green-500/20 text-green-400 shadow-[0_0_20px_#22c55e60]",
    orange: "bg-orange-500/20 text-orange-400 shadow-[0_0_20px_#f9731660]",
  };

  return (
    <div className="glass p-6 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-xl hover:shadow-blue-500/10">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${glow[color]}`}>
        <Icon size={20} />
      </div>
      <h3 className="text-3xl font-bold">{value}</h3>
      <p className="opacity-60 text-sm mt-1">{title}</p>
    </div>
  );
}

function ActionItem({ title, subtitle, color, Icon, href }: ActionItemProps) {
  const glow: Record<GlowColor, string> = {
    blue: "bg-blue-500/20 text-blue-400 shadow-[0_0_20px_#3b82f660]",
    purple: "bg-purple-500/20 text-purple-400 shadow-[0_0_20px_#a855f760]",
    green: "bg-green-500/20 text-green-400 shadow-[0_0_20px_#22c55e60]",
    orange: "bg-orange-500/20 text-orange-400 shadow-[0_0_20px_#f9731660]",
  };

  return (
    <Link
      href={href}
      className="glass p-6 flex justify-between items-center transition-all duration-200 hover:-translate-y-[2px] hover:shadow-xl hover:shadow-blue-500/10"
    >
      <div className="flex gap-4 items-center">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${glow[color]}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="opacity-60 text-sm">{subtitle}</p>
        </div>
      </div>
      <ChevronRight className="opacity-40" />
    </Link>
  );
}
