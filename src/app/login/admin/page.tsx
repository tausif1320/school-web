"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Page from "@/components/ui/Page";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function handleLogin() {
    
    const newErrors: typeof errors = {};

    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin/dashboard");
    }, 1000);

    
  }

  return (
    <Page>
    <main className="min-h-screen bg-[#0b1220] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-10">

        <div className="hidden md:flex flex-col justify-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-[#0f1d34] flex items-center justify-center text-3xl">
            🎓
          </div>
          <h1 className="text-5xl font-semibold leading-tight">
            Welcome back,<br />Admin
          </h1>
          <p className="text-slate-400 max-w-md">
            Manage teachers, attendance, reports and school data securely from your dashboard.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-3xl font-semibold">Welcome Back</h2>
            <p className="text-slate-400">School Admin Portal</p>
          </div>

          <Input
            label="Email Address"
            type="email"
            placeholder="admin@school.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <Button
            ripple
            loading={loading}
            onClick={handleLogin}
            variant="primary"
            className="w-full py-4 text-lg"
          >
            Log In →
          </Button>
        </div>
      </div>
    </main>
    </Page>
  );
}
