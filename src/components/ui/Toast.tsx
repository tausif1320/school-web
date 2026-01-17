"use client";

import { createContext, useContext, useState } from "react";
import clsx from "clsx";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
  leaving?: boolean;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function showToast(message: string, type: ToastType = "info") {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, type }]);

    // Start exit animation slightly before removal
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, leaving: true } : t))
      );
    }, 2600);

    // Remove after animation finishes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2900);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast UI */}
      <div className="fixed top-6 right-6 z-[9999] space-y-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={clsx(
              "px-5 py-3 rounded-xl backdrop-blur border shadow-lg",
              "transition-all duration-200 ease-[cubic-bezier(.22,1,.36,1)]",
              "will-change-transform will-change-opacity",
              t.leaving
                ? "opacity-0 translate-y-2 scale-[0.98]"
                : "opacity-100 translate-y-0 scale-100",
              {
                "bg-green-500/10 border-green-500/30 text-green-300":
                  t.type === "success",
                "bg-red-500/10 border-red-500/30 text-red-300":
                  t.type === "error",
                "bg-blue-500/10 border-blue-500/30 text-blue-300":
                  t.type === "info",
              }
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
