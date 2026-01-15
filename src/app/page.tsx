"use client";

import { useRouter } from "next/navigation";

export default function RoleSelectPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0b1220] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-5xl space-y-10">

        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0f1d34] flex items-center justify-center text-2xl">
            🎓
          </div>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <p className="text-xs tracking-widest text-slate-400 uppercase">
            School Management System
          </p>
          <h1 className="text-4xl font-semibold">Select Your Role</h1>
          <p className="text-slate-400 text-sm">
            Please choose your access level to continue.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Admin */}
          <button
            onClick={() => router.push("/login/admin")}
            className="bg-[#111a2e] border border-white/5 rounded-2xl p-6 flex gap-6 hover:bg-[#16223d] transition text-left"
          >
            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-semibold">Administrator</h2>
              <p className="text-sm text-slate-400">
                Full access to system configuration and user management.
              </p>
            </div>

            <img
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=500"
              alt="Admin"
              className="w-28 h-28 rounded-xl object-cover shrink-0"
            />
          </button>

          {/* Teacher */}
          <button
            onClick={() => router.push("/login/teacher")}
            className="bg-[#111a2e] border border-white/5 rounded-2xl p-6 flex gap-6 hover:bg-[#16223d] transition text-left"
          >
            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-semibold">Teacher</h2>
              <p className="text-sm text-slate-400">
                Manage classes, grade assignments, and track attendance.
              </p>
            </div>

            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=500"
              alt="Teacher"
              className="w-28 h-28 rounded-xl object-cover shrink-0"
            />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500 pt-4">
          Privacy Policy · Need Help?
        </div>
      </div>
    </main>
  );
}
