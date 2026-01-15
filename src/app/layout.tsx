"use client";

import "./globals.css";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export const metadata = {
  title: "School Web",
  description: "School Management System",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b1220] text-white overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="min-h-screen"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}
