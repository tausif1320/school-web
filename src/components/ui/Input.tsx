"use client";

import clsx from "clsx";

type InputProps = {
  label?: string;
  error?: string;
  numeric?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  error,
  numeric,
  className,
  onChange,
  ...props
}: InputProps) {

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;

    if (numeric) {
      value = value.replace(/[^0-9]/g, "");
      e.target.value = value;
    }

    onChange?.(e);
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm text-slate-400">
          {label}
        </label>
      )}

      <input
        {...props}
        onChange={handleChange}
        inputMode={numeric ? "numeric" : undefined}
        className={clsx(
          "w-full px-4 py-2 rounded-xl bg-white/5 border text-white outline-none transition",
          "border-white/10 focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/20",
          "placeholder:text-white/30",
          error && "border-red-500/40 focus:ring-red-500/20",
          className
        )}
      />

      {error && (
        <p className="text-xs text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
