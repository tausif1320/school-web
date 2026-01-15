"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BrowserMultiFormatReader } from "@zxing/browser";

export default function QRScanPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(t => t.stop());
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      setError(null);
      setScanning(true);

      const reader = new BrowserMultiFormatReader();

      const devices = await BrowserMultiFormatReader.listVideoInputDevices();
      if (!devices.length) throw new Error("No camera found");

      const backCam =
        devices.find(d => d.label.toLowerCase().includes("back")) || devices[0];

      await reader.decodeFromVideoDevice(
        backCam.deviceId,
        videoRef.current!,
        (result) => {
          if (result) {
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

            // Stop camera
            const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks();
            tracks?.forEach(t => t.stop());

            router.push("/teacher/dashboard");
          }
        }
      );

      // Improve resolution (safe, typed correctly)
      const stream = videoRef.current?.srcObject as MediaStream;
      const track = stream?.getVideoTracks()[0];

      if (track) {
        await track.applyConstraints({
          width: { ideal: 1280 },
          height: { ideal: 720 },
        });
      }

    } catch (e) {
      console.error(e);
      setError("Failed to start camera");
      setScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-6 text-center">

        <h1 className="text-2xl font-bold">Scan QR Code</h1>
        <p className="opacity-60 text-sm">
          Point camera clearly at QR
        </p>

        <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            playsInline
          />
        </div>

        {!scanning && (
          <button
            onClick={startScanning}
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
