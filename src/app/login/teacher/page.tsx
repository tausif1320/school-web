"use client";

export default function TeacherLogin() {
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
            <input
              type="email"
              placeholder="teacher@school.edu"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-right text-sm text-blue-500 hover:underline cursor-pointer">
            Forgot Password?
          </div>

          <button className="
            w-full py-4 rounded-2xl font-medium text-lg
            bg-gradient-to-r from-blue-600/80 to-blue-500/80
            backdrop-blur-xl border border-white/10
            shadow-lg shadow-blue-500/20
            hover:scale-[1.01] active:scale-[0.98] transition
          ">
            Log In →
          </button>

          <p className="text-center text-sm text-slate-400">
            Having trouble? <span className="text-blue-500 hover:underline cursor-pointer">Contact Support</span>
          </p>
        </div>
      </div>
    </main>
  );
}
