"use client";

import { useState } from "react";
import FeeStats from "@/components/fees/FeeStats";
import FeeFilters from "@/components/fees/FeeFilters";
import FeeTable from "@/components/fees/FeeTable";
import Page from "@/components/ui/Page";
import EmptyState from "@/components/ui/EmptyStates";
import { useSchool } from "@/context/SchoolContext";

export default function ManageFeesPage() {
  const { students, setStudents } = useSchool();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [classFilter, setClassFilter] = useState("all");

  return (
    <Page>
      <div className="relative min-h-screen bg-[#050B14] text-white overflow-hidden">
        {/* background glows */}
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-600/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-purple-600/20 blur-[160px] rounded-full" />

        <div className="relative px-4 py-6 max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Manage Fees</h1>
            <p className="opacity-70 text-sm">Track payments and dues</p>
          </div>

          {/* FeeStats */}
          <div className="transition hover:-translate-y-[2px] hover:shadow-xl hover:shadow-blue-500/10">
            <FeeStats students={students} />
          </div>

          {/* FeeFilters */}
          <div className="transition hover:-translate-y-[2px] hover:shadow-xl hover:shadow-blue-500/10">
            <FeeFilters
              search={search}
              setSearch={setSearch}
              status={status}
              setStatus={setStatus}
              classFilter={classFilter}
              setClassFilter={setClassFilter}
            />
          </div>

          {/* FeeTable */}
          <div className="transition hover:-translate-y-[2px] hover:shadow-xl hover:shadow-blue-500/10">
            {students.length === 0 ? (
              <EmptyState
                title="No fee records"
                description="There are no students available for fee tracking."
              />
            ) : (
              <FeeTable
                students={students}
                setStudents={setStudents}
                search={search}
                status={status}
                classFilter={classFilter}
              />
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
