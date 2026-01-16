"use client";

import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useSchool, AttendanceStatus } from "@/context/SchoolContext";

export default function AttendancePage() {
  const { teachers, teacherAttendance, setTeacherAttendance } = useSchool();

  const setStatus = (id: number, status: AttendanceStatus) => {
    setTeacherAttendance(prev => ({
      ...prev,
      [id]: status,
    }));
  };

  const present = Object.values(teacherAttendance).filter(s => s === "present").length;
  const absent = Object.values(teacherAttendance).filter(s => s === "absent").length;
  const late = Object.values(teacherAttendance).filter(s => s === "late").length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Teacher Attendance</h1>
        <p className="text-slate-400">Auto-updated when teachers mark attendance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Present" value={present} color="green" />
        <Stat label="Late" value={late} color="orange" />
        <Stat label="Absent" value={absent} color="red" />
        <Stat label="Total" value={teachers.length} color="blue" />
      </div>

      {/* Table */}
      <div className="glass p-4 transition hover:-translate-y-[2px] hover:shadow-xl hover:shadow-blue-500/10">
        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full text-sm">
            <thead className="border-b border-white/10 text-left opacity-60">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Designation</th>
                <th className="px-6 py-4 text-right">Mark / Override</th>
              </tr>
            </thead>

            <tbody>
              {teachers.map(t => {
                const status = teacherAttendance[t.id];

                return (
                  <tr
                    key={t.id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-4 font-medium">{t.name}</td>
                    <td className="px-6 py-4 opacity-60">{t.designation}</td>

                    <td className="px-6 py-4 text-right space-x-2">
                      <AttendanceButton
                        active={status === "present"}
                        onClick={() => setStatus(t.id, "present")}
                        color="green"
                      >
                        <CheckCircle size={18} />
                      </AttendanceButton>

                      <AttendanceButton
                        active={status === "late"}
                        onClick={() => setStatus(t.id, "late")}
                        color="orange"
                      >
                        <Clock size={18} />
                      </AttendanceButton>

                      <AttendanceButton
                        active={status === "absent"}
                        onClick={() => setStatus(t.id, "absent")}
                        color="red"
                      >
                        <XCircle size={18} />
                      </AttendanceButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---- Stat card ---- */

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "green" | "red" | "orange" | "blue";
}) {
  const styles = {
    green: "text-green-400 bg-green-500/10",
    red: "text-red-400 bg-red-500/10",
    orange: "text-orange-400 bg-orange-500/10",
    blue: "text-blue-400 bg-blue-500/10",
  };

  return (
    <div className="glass p-4 space-y-2 transition hover:-translate-y-[2px] hover:shadow-xl hover:shadow-blue-500/10">
      <div className={`inline-block px-3 py-1 rounded-full text-xs ${styles[color]}`}>
        {label}
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

/* ---- Button with glow ---- */

function AttendanceButton({
  active,
  onClick,
  color,
  children,
}: {
  active: boolean;
  onClick: () => void;
  color: "green" | "red" | "orange";
  children: React.ReactNode;
}) {
  const styles = {
    green: active
      ? "bg-green-500/20 text-green-400 shadow-[0_0_15px_#22c55e66]"
      : "bg-white/5 text-white/40 hover:bg-white/10",
    red: active
      ? "bg-red-500/20 text-red-400 shadow-[0_0_15px_#ef444466]"
      : "bg-white/5 text-white/40 hover:bg-white/10",
    orange: active
      ? "bg-orange-500/20 text-orange-400 shadow-[0_0_15px_#f9731666]"
      : "bg-white/5 text-white/40 hover:bg-white/10",
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition hover:-translate-y-[1px] hover:shadow-md ${styles[color]}`}
    >
      {children}
    </button>
  );
}
