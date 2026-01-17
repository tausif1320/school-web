"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Page from "@/components/ui/Page";

export default function RoleSelectPage() {
  const router = useRouter();

  return (
    <Page>
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
          {/* Admin */}
<Button
  ripple
  variant="secondary"
  onClick={() => router.push("/login/admin")}
  className="p-6 w-full transition-all duration-200 hover:-translate-y-[2px] hover:shadow-xl hover:shadow-blue-500/10"
>
  <div className="flex items-center justify-between gap-6 w-full">
    <div className="flex-1 space-y-3">
      <h2 className="text-xl font-semibold">Administrator</h2>
      <p className="text-sm text-slate-400">
        Full access to system configuration and user management.
      </p>
    </div>

    <img
      src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=500"
      className="w-28 h-28 rounded-xl object-cover flex-shrink-0"
    />
    
  </div>
  
</Button>


          {/* Teacher */}
<Button
  ripple
  variant="secondary"
  onClick={() => router.push("/login/teacher")}
  className="p-6 w-full transition-all duration-200 hover:-translate-y-[2px] hover:shadow-xl hover:shadow-blue-500/10"
>
  <div className="flex items-center justify-between gap-6 w-full">
    <div className="flex-1 space-y-3">
      <h2 className="text-xl font-semibold">Teacher</h2>
      <p className="text-sm text-slate-400">
        Manage and track teacher attendance.
      </p>
    </div>

    <img
      src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=500"
      className="w-28 h-28 rounded-xl object-cover flex-shrink-0"
    />
  </div>
</Button>

        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500 pt-4">
          Privacy Policy · Need Help?
        </div>
      </div>
    </main>
    </Page>
  );
}
