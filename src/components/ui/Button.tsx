"use client";

import { useRef } from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  type?: "button" | "submit";
  ripple?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  ripple = false,
  loading = false,
  disabled = false,
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (loading || disabled) return; // ⬅️ IMPORTANT: block clicks when loading

    if (ripple && btnRef.current) {
      const button = btnRef.current;
      const rect = button.getBoundingClientRect();

      const circle = document.createElement("span");
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.className = "ripple";

      const oldRipple = button.querySelector(".ripple");
      if (oldRipple) oldRipple.remove();

      button.appendChild(circle);
    }

    onClick?.();
  }

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={handleClick}
      disabled={loading || disabled}
      className={clsx(
        "relative overflow-hidden rounded-xl px-4 py-2 text-sm font-medium select-none",
        "transition active:scale-[0.97]",
        loading && "cursor-not-allowed opacity-80",
        {
          "bg-gradient-to-r from-blue-600/90 to-blue-500/90 shadow-lg shadow-blue-500/20 hover:brightness-110":
            variant === "primary",

          "bg-white/5 border border-white/10 hover:bg-white/10":
            variant === "secondary",

          "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20":
            variant === "danger",
        },
        className
      )}
    >
      {/* Spinner overlay */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
          <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        </span>
      )}

      {/* Hide text while loading */}
      <span className={clsx("relative", loading && "opacity-0")}>
        {children}
      </span>
    </button>
  );
}
