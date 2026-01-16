"use client";

import clsx from "clsx";

type InputProps = {
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
};

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  disabled,
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm text-slate-400">{label}</label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          "w-full px-4 py-3 rounded-xl bg-white/5 border text-white outline-none transition",
          "border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20",
          "placeholder:text-slate-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error && "border-red-500/50 focus:ring-red-500/30"
        )}
      />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
