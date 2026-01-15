// KPI cards
export type AdminStats = {
  totalStudents: number;
  totalTeachers: number;
  attendanceRate: number; // percentage, e.g. 92
  pendingFees: number; // numeric amount
};

// Chart data for attendance
export type AttendanceTrend = {
  labels: string[]; // ["Mon", "Tue", "Wed", ...]
  values: number[]; // [91, 93, 89, ...]
};

// Fees overview
export type FeesOverview = {
  totalCollected: number;
  collectedPercent: number;
  pendingPercent: number;
};

// Quick action cards
export type QuickAction = {
  title: string;
  description: string;
  href: string;
  icon: string;
};

// Full admin dashboard shape
export type AdminDashboardData = {
  stats: AdminStats;
  attendanceTrend: AttendanceTrend;
  feesOverview: FeesOverview;
  quickActions: QuickAction[];
};
