import { AdminDashboardData } from "@/types/dashboard";

export const mockAdminDashboard: AdminDashboardData = {
  stats: {
    totalStudents: 1240,
    totalTeachers: 48,
    attendanceRate: 92,
    pendingFees: 185000,
  },

  attendanceTrend: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    values: [91, 93, 89, 94, 92],
  },

  feesOverview: {
    totalCollected: 560000,
    collectedPercent: 78,
    pendingPercent: 22,
  },

  quickActions: [
    {
      title: "Manage Teachers",
      description: "Add, remove, and manage teacher accounts",
      href: "/admin/teachers",
      icon: "group",
    },
    {
      title: "View Attendance",
      description: "Check attendance reports and trends",
      href: "/admin/attendance",
      icon: "calendar_month",
    },
    {
      title: "Manage Fees",
      description: "Track payments and pending dues",
      href: "/admin/fees",
      icon: "payments",
    },
  ],
};
