"use client";

import { useState } from "react";
import { Eye, Pencil, Trash2, X } from "lucide-react";
import { useSchool, Student } from "@/context/SchoolContext";
import Input from "@/components/ui/Input";
export default function Page() {
  const { students, setStudents } = useSchool();

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");

  const [viewing, setViewing] = useState<Student | null>(null);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [deleting, setDeleting] = useState<Student | null>(null);

  const [form, setForm] = useState<Omit<Student, "id">>({
    admissionNo: "",
    name: "",
    class: "",
    section: "",
    gender: "Male",
    parentPhone: "",
  });

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(search.toLowerCase());

    const matchesClass = classFilter === "all" || s.class === classFilter;

    return matchesSearch && matchesClass;
  });

  const resetForm = () =>
    setForm({
      admissionNo: "",
      name: "",
      class: "",
      section: "",
      gender: "Male",
      parentPhone: "",
    });

  const addStudent = () => {
    setStudents((prev) => [...prev, { id: Date.now(), ...form }]);
    resetForm();
    setAdding(false);
  };

  const updateStudent = () => {
    if (!editing) return;
    setStudents((prev) =>
      prev.map((s) => (s.id === editing.id ? { ...editing, ...form } : s))
    );
    setEditing(null);
  };

  const deleteStudent = () => {
    if (!deleting) return;
    setStudents((prev) => prev.filter((s) => s.id !== deleting.id));
    setDeleting(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Students</h1>
        <button
          onClick={() => setAdding(true)}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl transition"
        >
          + Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="glass p-4 flex gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or admission no"
          className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 outline-none"
        />
      </div>

      {/* Student List */}
      <div className="space-y-3">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="glass p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-xs opacity-60">
                {s.admissionNo} • Class {s.class}-{s.section}
              </p>
            </div>

            <div className="flex gap-3">
              <IconButton onClick={() => setViewing(s)}>
                <Eye size={16} />
              </IconButton>

              <IconButton
                onClick={() => {
                  setEditing(s);
                  setForm(s);
                }}
              >
                <Pencil size={16} />
              </IconButton>

              <IconButton danger onClick={() => setDeleting(s)}>
                <Trash2 size={16} />
              </IconButton>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW */}
      {viewing && (
        <Modal onClose={() => setViewing(null)} title="Student Details">
          <Detail label="Name" value={viewing.name} />
          <Detail label="Admission No" value={viewing.admissionNo} />
          <Detail label="Class" value={`${viewing.class}-${viewing.section}`} />
          <Detail label="Gender" value={viewing.gender} />
          <Detail label="Parent Phone" value={viewing.parentPhone} />
        </Modal>
      )}

      {/* ADD */}
      {adding && (
        <Modal onClose={() => setAdding(false)} title="Add Student">
          <Form form={form} setForm={setForm} />
          <PrimaryButton onClick={addStudent}>Add Student</PrimaryButton>
        </Modal>
      )}

      {/* EDIT */}
      {editing && (
        <Modal onClose={() => setEditing(null)} title="Edit Student">
          <Form form={form} setForm={setForm} />
          <PrimaryButton onClick={updateStudent}>Save Changes</PrimaryButton>
        </Modal>
      )}

      {/* DELETE */}
      {deleting && (
        <Modal onClose={() => setDeleting(null)} title="Confirm Delete">
          <p className="opacity-70">Delete {deleting.name} permanently?</p>
          <div className="flex gap-4">
            <DangerButton onClick={deleteStudent}>Delete</DangerButton>
            <SecondaryButton onClick={() => setDeleting(null)}>
              Cancel
            </SecondaryButton>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ---------------- Components ---------------- */

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center px-4">
      <div className="bg-[#0B1628]/95 border border-white/10 rounded-2xl p-6 w-full max-w-lg space-y-4 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 opacity-60">
          <X />
        </button>
        <h2 className="text-xl font-semibold">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Form({
  form,
  setForm,
}: {
  form: Omit<Student, "id">;
  setForm: React.Dispatch<React.SetStateAction<Omit<Student, "id">>>;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">

      <Field label="Admission No">
        <input
          value={form.admissionNo}
          onChange={(e) => setForm((p) => ({ ...p, admissionNo: e.target.value }))}
          className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-lg outline-none"
          placeholder="e.g. A1023"
        />
      </Field>

      <Field label="Name">
        <Input
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-lg outline-none"
          placeholder="Student name"
        />
      </Field>

      <Field label="Class">
        <Input
          numeric
          value={form.class}
          onChange={(e) => setForm((p) => ({ ...p, class: e.target.value }))}
          className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-lg outline-none"
          placeholder="e.g. 10"
        />
      </Field>

      <Field label="Section">
        <input
          value={form.section}
          onChange={(e) => setForm((p) => ({ ...p, section: e.target.value }))}
          className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-lg outline-none"
          placeholder="e.g. A"
        />
      </Field>

      <Field label="Gender">
        <select
          value={form.gender}
          onChange={(e) =>
            setForm((p) => ({ ...p, gender: e.target.value as "Male" | "Female" }))
          }
          className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-lg outline-none"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </Field>

      <Field label="Parent Phone">
        <Input
          numeric
          maxLength={10}
          value={form.parentPhone}
          onChange={(e) =>
            setForm((p) => ({ ...p, parentPhone: e.target.value }))
          }
          className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-lg outline-none"
          placeholder="e.g. 9876543210"
        />
      </Field>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs opacity-60">{label}</p>
      {children}
    </div>
  );
}


function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs opacity-50">{label}</p>
      <p>{value}</p>
    </div>
  );
}

function IconButton({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition ${
        danger
          ? "bg-red-500/10 hover:bg-red-500/20 text-red-400"
          : "bg-white/5 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-600 py-2 rounded-xl"
    >
      {children}
    </button>
  );
}

function DangerButton({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-red-600 py-2 rounded-xl"
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white/10 py-2 rounded-xl"
    >
      {children}
    </button>
  );
}
