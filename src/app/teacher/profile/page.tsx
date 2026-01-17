"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { UserStar } from "lucide-react";
import Page from "@/components/ui/Page";

export default function TeacherProfilePage() {
  const router = useRouter();

  const [showAttendance, setShowAttendance] = useState(false);
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Jahan-e-aara aalu",
    email: "aalu.sharma@school.edu",
    phone: "+91 95027 13558",
    department: "Mathematics Department",
    designation: "Senior Faculty",
    qualification: "M.Sc Mathematics, B.Ed",
    experience: "8 Years",
  });

  const [temp, setTemp] = useState(profile);
  const [loggingOut, setLoggingOut] = useState(false);
  function handleSave() {
    setProfile(temp);
    setEditing(false);
  }

  function handleLogout() {
    setLoggingOut(true);
    setTimeout(() => {
      router.push("/");
    },1000);
    
  }

  return (
    <Page>
    <div className="min-h-screen bg-gradient-to-br from-[#050B14] via-[#0A1220] to-[#0E1A2F] text-white px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-semibold">Teacher Profile</h1>
          <p className="text-slate-400 mt-1">Your professional information</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-400/60 to-teal-500/60 flex items-center justify-center text-3xl font-bold shadow-lg shadow-emerald-500/10">
              {profile.name.charAt(0)}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <p className="text-slate-400">{profile.department}</p>
              <p className="text-emerald-300 text-sm mt-1 font-medium">
                {profile.designation}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem label="Email" value={profile.email} />
            <InfoItem label="Phone" value={profile.phone} />
            <InfoItem label="Qualification" value={profile.qualification} />
            <InfoItem label="Experience" value={profile.experience} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              onClick={() => {
                setTemp(profile);
                setEditing(true);
                
              }}
              ripple
              variant="primary"
              
              className="flex-1"
            >
              Edit Profile
            </Button>

            <button
              onClick={() => setShowAttendance(!showAttendance)}
              className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500/60 to-teal-600/60 py-3 font-medium shadow-lg shadow-emerald-500/10"
            >
              {showAttendance ? "Hide Attendance" : "Check Attendance"}
            </button>

            <Button
              ripple
              onClick={handleLogout}
              loading={loggingOut}
              variant="danger"
              className="flex-1"
            >
              Logout
            </Button>
          </div>
        </div>

                {showAttendance && (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold">Attendance Records</h2>

            {/* Monthly Attendance */}
            <TableCard title="Monthly Attendance">
              <Table>
                <thead>
                  <tr>
                    <Th>Month</Th>
                    <Th>Year</Th>
                    <Th>School Days</Th>
                    <Th>Present Days</Th>
                    <Th>Attendance %</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>February</Td>
                    <Td>2026</Td>
                    <Td>22</Td>
                    <Td>21</Td>
                    <Td className="text-emerald-300">95.4%</Td>
                  </tr>
                </tbody>
              </Table>
            </TableCard>

            {/* Absence Summary */}
            <TableCard title="Absence Summary">
              <Table>
                <thead>
                  <tr>
                    <Th>Month</Th>
                    <Th>Year</Th>
                    <Th>Absent (This Month)</Th>
                    <Th>Total Absent</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>February</Td>
                    <Td>2026</Td>
                    <Td className="text-yellow-300">1</Td>
                    <Td className="text-red-300">10</Td>
                  </tr>
                </tbody>
              </Table>
            </TableCard>

            {/* Day-wise Attendance */}
            <TableCard title="Day-wise Attendance (Current Month)">
              <Table>
                <thead>
                  <tr>
                    <Th>Date</Th>
                    <Th>Status</Th>
                    <Th>Check-in</Th>
                    <Th>Check-out</Th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["1 Feb", "Present", "09:02 AM", "04:31 PM"],
                    ["2 Feb", "Present", "08:59 AM", "04:35 PM"],
                    ["3 Feb", "Late", "09:18 AM", "04:20 PM"],
                    ["4 Feb", "Present", "09:00 AM", "04:28 PM"],
                    ["5 Feb", "Absent", "-", "-"],
                  ].map(([date, status, inTime, outTime]) => (
                    <tr key={date}>
                      <Td>{date}</Td>
                      <Td
                        className={
                          status === "Present"
                            ? "text-emerald-300"
                            : status === "Late"
                            ? "text-yellow-300"
                            : "text-red-300"
                        }
                      >
                        {status}
                      </Td>
                      <Td>{inTime}</Td>
                      <Td>{outTime}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableCard>
          </div>
        )}

      </div>

      {editing && (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 z-50"
    onKeyDown={(e) => {
      if (e.key === "Escape") setEditing(false);
    }}
  >
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      className="w-full max-w-xl bg-[#0A1220] border border-white/10 rounded-2xl p-6 space-y-6"
      tabIndex={-1}
    >
      <h2 className="text-xl font-semibold">Edit Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input autoFocus label="Name" value={temp.name} onChange={(e) => setTemp({ ...temp, name: e.target.value })} />

        <Input label="Email" type="email" value={temp.email} onChange={(e) => setTemp({ ...temp, email: e.target.value })} />

        <Input label="Phone" numeric maxLength={10} value={temp.phone} onChange={(e) => setTemp({ ...temp, phone: e.target.value })} />

        <Input label="Department" value={temp.department} onChange={(e) => setTemp({ ...temp, department: e.target.value })} />

        <Input label="Designation" value={temp.designation} onChange={(e) => setTemp({ ...temp, designation: e.target.value })} />

        <Input label="Qualification" value={temp.qualification} onChange={(e) => setTemp({ ...temp, qualification: e.target.value })} />
      </div>

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500/70 to-teal-600/70 py-3 font-medium"
        >
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => setEditing(false)}
          className="flex-1 rounded-xl bg-white/5 border border-white/10 py-3 font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}

    </div>
    </Page>
  );
}

/* Components */

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="text-white font-medium mt-1">{value}</p>
    </div>
  );
}

function TableCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      {children}
    </div>
  );
}

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[720px] w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left text-slate-400 font-medium border-b border-white/10 pb-2">
      {children}
    </th>
  );
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`py-3 border-b border-white/5 ${className}`}>
      {children}
    </td>
  );
}
