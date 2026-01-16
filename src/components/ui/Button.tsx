"use client";

import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  type?: "button" | "submit";
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "rounded-xl px-4 py-2 text-sm font-medium transition active:scale-[0.97] cursor-pointer select-none",
        {
          "bg-gradient-to-r from-blue-600/90 to-blue-500/90 hover:opacity-95 shadow-md shadow-blue-500/20":
            variant === "primary",

          "bg-white/5 border border-white/10 hover:bg-white/10":
            variant === "secondary",

          "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20":
            variant === "danger",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
