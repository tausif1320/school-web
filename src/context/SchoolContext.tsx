"use client";

import React, { createContext, useContext, useState } from "react";

/* ---------------- TYPES ---------------- */

export type AttendanceStatus = "present" | "absent" | "late";

export type Student = {
  id: number;
  admissionNo: string;
  name: string;
  class: string;
  section: string;
  gender: "Male" | "Female";
  parentPhone: string;
  totalFees: number;
  paidFees: number;
};

export type Teacher = {
  id: number;
  name: string;
  email: string;
  phone: string;
  designation: string;
};

type QrSettings = {
  latitude: string;
  longitude: string;
  radius: string;
};

type SchoolContextType = {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;

  teachers: Teacher[];
  setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;

  teacherAttendance: Record<number, AttendanceStatus | undefined>;
  setTeacherAttendance: React.Dispatch<
    React.SetStateAction<Record<number, AttendanceStatus | undefined>>
  >;

  qrSettings: QrSettings;
  setQrSettings: React.Dispatch<React.SetStateAction<QrSettings>>;
};

/* ---------------- CONTEXT ---------------- */

const SchoolContext = createContext<SchoolContextType | null>(null);

export function SchoolProvider({ children }: { children: React.ReactNode }) {
  /* ---------- Students ---------- */
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      admissionNo: "A1001",
      name: "Aalu",
      class: "10",
      section: "A",
      gender: "Female",
      parentPhone: "9876543210",
      totalFees: 12000,
      paidFees: 0,
    },
    {
      id: 2,
      admissionNo: "A1002",
      name: "Aaliya",
      class: "9",
      section: "B",
      gender: "Female",
      parentPhone: "9123456789",
      totalFees: 12000,
      paidFees:0,
    },
    {
      id: 3,
      admissionNo: "A1003",
      name: "Candy",
      class: "8",
      section: "A",
      gender: "Male",
      parentPhone: "9988776655",
      totalFees: 12000,
      paidFees:0,
    },
  ]);

  /* ---------- Teachers ---------- */
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      name: "Anita Sharma",
      email: "anita@school.edu",
      phone: "9876543210",
      designation: "Mathematics Teacher",
    },
    {
      id: 2,
      name: "Rohit Mehta",
      email: "rohit@school.edu",
      phone: "9123456789",
      designation: "Physics Teacher",
    },
  ]);

  /* ---------- Attendance ---------- */
  const [teacherAttendance, setTeacherAttendance] = useState<
    Record<number, AttendanceStatus | undefined>
  >({});

  /* ---------- QR + GPS ---------- */
  const [qrSettings, setQrSettings] = useState<QrSettings>({
    latitude: "",
    longitude: "",
    radius: "100",
  });

  return (
    <SchoolContext.Provider
      value={{
        students,
        setStudents,
        teachers,
        setTeachers,
        teacherAttendance,
        setTeacherAttendance,
        qrSettings,
        setQrSettings,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */

export function useSchool() {
  const ctx = useContext(SchoolContext);
  if (!ctx) {
    throw new Error("useSchool must be used inside SchoolProvider");
  }
  return ctx;
}
