"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, QrCode } from "lucide-react";

type Session = {
  arrivalTime: string | null;
  departureTime: string | null;
};

export default function TeacherDashboard() {
  const router = useRouter();

  const [session, setSession] = useState<Session>({
    arrivalTime: null,
    departureTime: null,
  });

  // Load session from localStorage (instead of nuking it like before)
  useEffect(() => {
    const saved = localStorage.getItem("teacher-session");
    if (saved) {
      setSession(JSON.parse(saved));
    }
  }, []);

  const markDeparture = () => {
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const updated = {
      ...session,
      departureTime: now,
    };

    setSession(updated);
    localStorage.setItem("teacher-session", JSON.stringify(updated));
  };

  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const month = now.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const date = now.getDate();

  return (
    <div className="min-h-screen bg-[#050B14] text-white">

      {/* Header */}
      <div className="px-6 py-5 flex justify-between items-center max-w-6xl mx-auto">
        <div>
          <h1 className="font-semibold text-lg">Springfield High</h1>
          <p className="text-sm opacity-60">Teacher Dashboard</p>
        </div>

        <div className="flex items-center gap-4">
          <Bell className="opacity-70" />
          <img
            src="https://i.pravatar.cc/100?img=47"
            className="w-10 h-10 rounded-full border border-white/10"
          />
        </div>
      </div>

      <div className="px-6 pb-12 max-w-6xl mx-auto space-y-10">

        {/* Greeting */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-bold">Good Morning, Aaliya!</h2>
            <p className="opacity-60 mt-2">Here’s your dashboard for today.</p>
          </div>

          <div className="text-right">
            <p className="text-blue-400 font-semibold tracking-wide">
              {month} {date}
            </p>
            <p className="opacity-60">{day}</p>
          </div>
        </div>

        {/* Scan QR Hero */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-500 p-10 shadow-[0_0_80px_#2563eb80]">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />

          <div className="relative flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-sm tracking-widest">
                <QrCode size={18} />
                ATTENDANCE ACTION
              </div>

              <h3 className="text-4xl font-bold">
                Scan QR for <br /> Attendance
              </h3>

              <p className="opacity-80 max-w-md">
                Scan the QR code provided by admin to mark your arrival.
              </p>
            </div>

            <button
              onClick={() => router.push("/teacher/scan")}
              className="w-20 h-20 bg-white text-blue-600 rounded-full text-3xl hover:scale-110 transition shadow-[0_0_40px_white]"
            >
              →
            </button>
          </div>
        </div>

        {/* Session Status */}
        <div className="glass bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-semibold">Today's Session</h3>

          <div className="flex justify-between text-sm">
            <span className="opacity-60">Arrival Time</span>
            <span>{session.arrivalTime ?? "---"}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="opacity-60">Departure Time</span>
            <span>{session.departureTime ?? "---"}</span>
          </div>

          <button
            onClick={markDeparture}
            disabled={!session.arrivalTime || session.departureTime !== null}
            className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium transition w-fit
              ${
                session.arrivalTime && !session.departureTime
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-white/10 text-white/40 cursor-not-allowed"
              }`}
          >
            Mark Departure
          </button>
        </div>
      </div>
    </div>
  );
}
