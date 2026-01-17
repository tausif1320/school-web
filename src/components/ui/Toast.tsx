"use client";

import { createContext, useContext, useState } from "react";
import clsx from "clsx";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
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

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast UI */}
      <div className="fixed top-6 right-6 z-[9999] space-y-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={clsx(
              "px-5 py-3 rounded-xl backdrop-blur border shadow-lg animate-slide-in",
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
