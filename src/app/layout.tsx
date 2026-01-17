// src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import { ToastProvider } from "@/components/ui/Toast";
export const metadata = {
  title: "School Web",
  description: "School Management System",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b1220] text-white">
        <ToastProvider>
          {children}
        </ToastProvider>
        
      </body>
    </html>
  );
}
