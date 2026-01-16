import { ReactNode } from "react";

export default function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`glass rounded-2xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}
