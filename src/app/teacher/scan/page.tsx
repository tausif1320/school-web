"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, CheckCircle, QrCode, XCircle } from "lucide-react";

type CameraDevice = {
  id: string;
  label: string;
};

export default function QRScanPage() {
  const router = useRouter();

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const readerRef = useRef<HTMLDivElement | null>(null);

  const [devices, setDevices] = useState<CameraDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [scanning, setScanning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [invalid, setInvalid] = useState(false);

  // Load cameras
  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((cams) => {
        setDevices(cams);
        if (cams.length > 0) {
          setSelectedDevice(cams[cams.length - 1].id);
        }
      })
      .catch((err) => console.error("Camera error:", err));
  }, []);

  const startScan = async () => {
    if (!selectedDevice || !readerRef.current) return;

    setScanning(true);

    setTimeout(async () => {
      const width = readerRef.current!.clientWidth;
      const qrboxSize = Math.floor(width * 0.7); // responsive QR box

      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("qr-reader");
      }

      try {
        await scannerRef.current.start(
          { deviceId: { exact: selectedDevice } },
          {
            fps: 10,
            qrbox: qrboxSize,
          },
          async (decodedText) => {
            const activeToken = localStorage.getItem("active-attendance-token");

            if (!activeToken || decodedText !== activeToken) {
              setInvalid(true);
              await scannerRef.current?.stop();
              return;
            }

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

            setSuccess(true);

            await scannerRef.current?.stop();
            scannerRef.current?.clear();

            setTimeout(() => {
              router.push("/teacher/dashboard");
            }, 1200);
          },
          () => {}
        );
      } catch (err) {
        console.error("Scanner failed:", err);
      }
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050B14] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center">
              <QrCode />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Scan QR Code</h1>
          <p className="text-sm opacity-60">
            Scan the admin QR to mark attendance
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0B1628]/95 border border-white/10 rounded-2xl p-6 space-y-6 shadow-2xl">

          {!scanning && !success && !invalid && (
            <>
              <div className="space-y-2">
                <label className="text-sm opacity-70 flex gap-2 items-center">
                  <Camera size={16} /> Select Camera
                </label>

                <select
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white"
                >
                  {devices.map((device) => (
                    <option key={device.id} value={device.id}>
                      {device.label || "Camera"}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={startScan}
                className="w-full bg-blue-600 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
              >
                Start Scanning
              </button>
            </>
          )}

          {scanning && !success && !invalid && (
            <div ref={readerRef} className="space-y-4 text-center">
              <div
                id="qr-reader"
                className="overflow-hidden rounded-xl border border-white/10"
              />
              <p className="text-xs opacity-50">Align QR inside the box…</p>
            </div>
          )}

          {success && (
            <div className="flex flex-col items-center gap-4 py-6">
              <CheckCircle size={48} className="text-green-400" />
              <p className="text-green-400 font-medium">
                Attendance marked successfully
              </p>
            </div>
          )}

          {invalid && (
            <div className="flex flex-col items-center gap-4 py-6">
              <XCircle size={48} className="text-red-400" />
              <p className="text-red-400 font-medium">
                Invalid or expired QR code
              </p>
              <button
                onClick={() => {
                  setInvalid(false);
                  setScanning(false);
                }}
                className="mt-2 bg-red-600 px-4 py-2 rounded-xl"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
