"use client";

import { useState, ReactNode, useRef, useEffect } from "react";
import Input from "@/components/ui/Input";
import Page from "@/components/ui/Page";
import { useToast } from "@/components/ui/Toast";
import { useSchool } from "@/context/SchoolContext";

type Teacher = {
  id: number;
  name: string;
  email: string;
  phone: string;
  designation: string;
};

export default function ManageTeachersPage() {
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();
  const {teachers, setTeachers} = useSchool();

  const [selected, setSelected] = useState<Teacher | null>(null);
  const [adding, setAdding] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
  });

  function handleAddTeacher() {
    if (!form.name || !form.email) {
      showToast("Name and Email required", "error");
      return;
    }

    setSaving(true);

    setTimeout(() => {
      setTeachers((prev) => [
        ...prev,
        { id: Date.now(), ...form },
      ]);

      showToast("Teacher added successfully", "success");

      setForm({ name: "", email: "", phone: "", designation: "" });
      setAdding(false);
      setSaving(false);
    }, 600);
  }

  function handleRemove(id: number, name: string) {
    if (confirm(`Remove ${name}? This cannot be undone.`)) {
      setTeachers((prev) => prev.filter((t) => t.id !== id));
      showToast("Teacher removed", "info");
    }
  }

  return (
    <Page>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Manage Teachers</h1>
            <p className="text-slate-400">Add, view and manage teacher profiles</p>
          </div>

          <button
            onClick={() => setAdding(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/70 to-indigo-600/70 shadow-lg shadow-blue-500/20"
          >
            + Add Teacher
          </button>
        </div>

        {/* Table */}
        <div className="glass p-6">
          <div className="overflow-x-auto">
            <table className="min-w-[750px] w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-white/10">
                  <th className="text-left py-3">Name</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Phone</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((t) => (
                  <tr key={t.id} className="border-b border-white/5">
                    <td className="py-4">{t.name}</td>
                    <td>{t.email}</td>
                    <td>{t.designation}</td>
                    <td>{t.phone}</td>
                    <td className="text-right space-x-2">
                      <button
                        onClick={() => setSelected(t)}
                        className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-300"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleRemove(t.id, t.name)}
                        className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* VIEW PROFILE */}
        {selected && (
          <Modal onClose={() => setSelected(null)}>
            <h2 className="text-xl font-semibold">Teacher Profile</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Info label="Name" value={selected.name} />
              <Info label="Email" value={selected.email} />
              <Info label="Phone" value={selected.phone} />
              <Info label="Designation" value={selected.designation} />
            </div>

            <AttendanceSection />
          </Modal>
        )}

        {/* ADD TEACHER */}
        {adding && (
          <Modal onClose={() => setAdding(false)}>
            <h2 className="text-xl font-semibold">Add New Teacher</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTeacher();
              }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  autoFocus
                  label="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <Input
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <Input
                  label="Phone"
                  numeric
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />

                <Input
                  label="Designation"
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 bg-blue-600 rounded-xl"
                >
                  {saving ? "saving..." : "Save Teacher"}
                </button>

                <button
                  type="button"
                  onClick={() => setAdding(false)}
                  className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </Page>
  );
}

/* ---------- Components ---------- */

function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = modalRef.current;
    if (!container) return;

    const focusable = container.querySelectorAll<HTMLElement>(
      'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }

      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur flex justify-center items-center px-4 z-50">
      <div
        ref={modalRef}
        className="glass max-w-3xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-end">
          <button tabIndex={-1} onClick={onClose} className="text-slate-400">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
      <p className="text-slate-400 text-sm">{label}</p>
      <p>{value}</p>
    </div>
  );
}

function AttendanceSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Attendance Records</h3>

      <Table
        title="Monthly Attendance"
        headers={["Month", "Year", "School Days", "Present", "%"]}
        rows={[["February", "2026", "22", "21", "95%"]]}
      />

      <Table
        title="Absence Summary"
        headers={["Month", "Absent Days", "Total Absent"]}
        rows={[["February", "1", "9"]]}
      />

      <Table
        title="Day-wise Attendance"
        headers={["Date", "Status", "In", "Out"]}
        rows={[
          ["1 Feb", "Present", "9:02", "4:30"],
          ["2 Feb", "Late", "9:18", "4:20"],
        ]}
      />
    </div>
  );
}

function Table({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
      <h4 className="font-medium">{title}</h4>
      <div className="overflow-x-auto">
        <table className="min-w-[600px] text-sm">
          <thead>
            <tr className="text-slate-400">
              {headers.map((h, i) => (
                <th key={i} className="text-left py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
