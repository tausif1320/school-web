import React from "react";
import { Student } from "@/app/admin/dashboard/fees/page";

type Props = {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  search: string;
  status: string;
  classFilter: string;
};

export default function FeeTable({
  students,
  setStudents,
  search,
  status,
  classFilter,
}: Props) {
  const updatePaid = (id: number, amount: number) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === id ? { ...s, paid: Math.min(amount, s.total) } : s
      )
    );
  };

  const filtered = students.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(search.toLowerCase());

    const matchesClass = classFilter === "all" || s.class === classFilter;

    const due = s.total - s.paid;
    const state =
      due === 0 ? "paid" : s.paid === 0 ? "pending" : "partial";

    const matchesStatus = status === "all" || status === state;

    return matchesSearch && matchesClass && matchesStatus;
  });

  return (
    <div className="glass p-4">
      {/* Horizontal scroll wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-[850px] w-full text-sm">
          <thead className="border-b border-white/10 text-left opacity-60">
            <tr>
              <th className="px-6 py-4 w-[160px]">Admission No</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4 w-[90px]">Class</th>
              <th className="px-6 py-4 w-[110px] text-right">Total</th>
              <th className="px-6 py-4 w-[140px] text-right">Paid</th>
              <th className="px-6 py-4 w-[110px] text-right">Due</th>
              <th className="px-6 py-4 w-[130px] text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => {
              const due = s.total - s.paid;
              const state =
                due === 0 ? "Paid" : s.paid === 0 ? "Pending" : "Partial";

              const badge =
                state === "Paid"
                  ? "bg-green-500/20 text-green-400"
                  : state === "Partial"
                  ? "bg-purple-500/20 text-purple-400"
                  : "bg-orange-500/20 text-orange-400";

              return (
                <tr
                  key={s.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4 font-mono text-xs opacity-80 truncate">
                    {s.admissionNo}
                  </td>

                  <td className="px-6 py-4 font-medium truncate">
                    {s.name}
                  </td>

                  <td className="px-6 py-4">{s.class}</td>

                  <td className="px-6 py-4 text-right">₹{s.total.toLocaleString("en-IN")}</td>


                  <td className="px-6 py-4 text-right">
                    <input
                      type="number"
                      value={s.paid}
                      min={0}
                      max={s.total}
                      onChange={(e) =>
                        updatePaid(s.id, Number(e.target.value))
                      }
                      className="w-24 bg-transparent border border-white/10 rounded-lg px-2 py-1 text-right outline-none"
                    />
                  </td>

                  <td className="px-6 py-4 text-right">₹{due.toLocaleString("en-IN")}</td>

                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 text-xs rounded-full ${badge}`}>
                      {state}
                    </span>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 opacity-50">
                  No students match this filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
