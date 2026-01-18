import { Student } from "@/context/SchoolContext";
import { Wallet, CheckCircle, AlertTriangle, Users } from "lucide-react";

type Props = {
  students: Student[];
};

export default function FeeStats({ students }: Props) {
  const total = students.reduce((sum, s) => sum + s.totalFees, 0);
  const collected = students.reduce((sum, s) => sum + s.paidFees, 0);
  const pending = total - collected;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat
        title="Total Fees"
        value={`₹${total.toLocaleString("en-IN")}`}
        icon={Wallet}
        color="blue"
      />
      <Stat
        title="Collected"
        value={`₹${collected.toLocaleString("en-IN")}`}
        icon={CheckCircle}
        color="green"
      />
      <Stat
        title="Pending"
        value={`₹${pending.toLocaleString("en-IN")}`}
        icon={AlertTriangle}
        color="orange"
      />
      <Stat
        title="Students"
        value={students.length.toString()}
        icon={Users}
        color="purple"
      />
    </div>
  );
}

/* -------------------- */

function Stat({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  icon: any;
  color: "blue" | "green" | "orange" | "purple";
}) {
  const glow: Record<string, string> = {
    blue: "bg-blue-500/20 text-blue-400 shadow-[0_0_25px_#3b82f660]",
    green: "bg-green-500/20 text-green-400 shadow-[0_0_25px_#22c55e60]",
    orange: "bg-orange-500/20 text-orange-400 shadow-[0_0_25px_#f9731660]",
    purple: "bg-purple-500/20 text-purple-400 shadow-[0_0_25px_#a855f760]",
  };

  return (
    <div className="glass p-5">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${glow[color]}`}
      >
        <Icon size={20} />
      </div>

      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-sm opacity-60">{title}</p>
    </div>
  );
}
