"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function TeacherLogin() {
  const router = useRouter();

  function handleLogin() {
    router.push("/teacher/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#0b1220] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-10">

        <div className="hidden md:flex flex-col justify-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-[#0f1d34] flex items-center justify-center text-3xl">
            📘
          </div>
          <h1 className="text-5xl font-semibold leading-tight">
            Welcome back,<br />Teacher
          </h1>
          <p className="text-slate-400 max-w-md">
            Access your classes, scan attendance, manage students and view schedules.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-3xl font-semibold">Welcome Back</h2>
            <p className="text-slate-400">Teacher Portal</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">Email Address</label>
            <Input
              label="Email Address"
              type="email"
              placeholder="teacher@school.edu"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">Password</label>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <Button
            ripple
            onClick={handleLogin}
            variant="primary"
            className="w-full py-4 text-lg"
          >
            Log In →
          </Button>
        </div>
      </div>
    </main>
  );
}
