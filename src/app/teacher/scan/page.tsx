"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Html5Qrcode } from "html5-qrcode";

export default function QRScanPage() {
  const router = useRouter();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const startScanner = async () => {
    setError(null);

    const element = document.getElementById("qr-reader");
    if (!element) {
      setError("Scanner element not found");
      return;
    }

    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      const devices = await Html5Qrcode.getCameras();
      if (!devices.length) {
        setError("No camera found");
        return;
      }

      // Prefer back camera
      const backCam =
        devices.find(d => d.label.toLowerCase().includes("back")) || devices[0];

      await scanner.start(
        backCam.id,
        {
          fps: 10,
          qrbox: { width: 220, height: 220 },
        },
        (decodedText) => {
          const now = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          localStorage.setItem(
            "teacher-session",
            JSON.stringify({
              arrivalTime: now,
              departureTime: null,
            })
          );

          scanner.stop().then(() => {
            router.push("/teacher/dashboard");
          });
        },
        () => {}
      );

      setStarted(true);
    } catch (err) {
      console.error(err);
      setError("Camera failed to start");
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-6 text-center">

        <h1 className="text-2xl font-bold">Scan QR Code</h1>
        <p className="opacity-60 text-sm">
          Allow camera and tap start scanning
        </p>

        <div
          id="qr-reader"
          className="w-full aspect-square rounded-2xl border border-white/10 overflow-hidden bg-black"
        />

        {!started && (
          <button
            onClick={startScanner}
            className="w-full py-3 bg-blue-600 rounded-xl font-medium"
          >
            Start Scanning
          </button>
        )}

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
}
