"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { RefreshCw, Crosshair } from "lucide-react";
import { useSchool } from "@/context/SchoolContext";
import Page from "@/components/ui/Page";

function generateToken() {
  const now = new Date();
  const time = now.toISOString().slice(0, 19).replace(/[-T:]/g, "");
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ATT-${time}-${rand}`;
}

export default function QRPage() {
  const { qrSettings, setQrSettings } = useSchool();

  const [token, setToken] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(60);

  // Generate token on mount
  useEffect(() => {
    const newToken = generateToken();
    setToken(newToken);
    localStorage.setItem("active-attendance-token", newToken);
  }, []);

  // Countdown + auto refresh
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          const newToken = generateToken();
          setToken(newToken);
          localStorage.setItem("active-attendance-token", newToken);
          return 60;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [token]);

  const regenerate = () => {
    const newToken = generateToken();
    setToken(newToken);
    localStorage.setItem("active-attendance-token", newToken);
    setSeconds(60);
  };

  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setQrSettings({
          ...qrSettings,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        });
      },
      () => alert("Location permission denied")
    );
  };

  if (!token) {
    return (
      <div className="text-center opacity-60 mt-20">
        Generating secure QR...
      </div>
    );
  }

  return (
    <Page>
    <div className="max-w-6xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-semibold">QR Attendance Control</h1>
        <p className="opacity-60">QR + GPS configuration for attendance</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* QR SECTION */}
        <div className="glass p-6 flex flex-col items-center gap-4">
          <div className="bg-white p-4 rounded-xl">
            <QRCodeCanvas value={token} size={220} />
          </div>

          <p className="font-mono text-sm opacity-70">{token}</p>

          <div className="text-sm opacity-70">
            Expires in <span className="font-semibold">{seconds}s</span>
          </div>

          <button
            onClick={regenerate}
            className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-600 px-4 py-2 rounded-xl"
          >
            <RefreshCw size={16} />
            Regenerate
          </button>
        </div>

        {/* GPS SETTINGS */}
        <div className="glass p-6 space-y-6">
          <h2 className="text-xl font-medium">Location Settings</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs opacity-60">Latitude</label>
              <input
                value={qrSettings.latitude}
                onChange={(e) =>
                  setQrSettings({ ...qrSettings, latitude: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="text-xs opacity-60">Longitude</label>
              <input
                value={qrSettings.longitude}
                onChange={(e) =>
                  setQrSettings({ ...qrSettings, longitude: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <button
            onClick={useCurrentLocation}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
          >
            <Crosshair size={16} />
            Use Current Location
          </button>

          <div>
            <label className="text-xs opacity-60">Allowed Radius (meters)</label>
            <input
              type="number"
              value={qrSettings.radius}
              onChange={(e) =>
                setQrSettings({ ...qrSettings, radius: e.target.value })
              }
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2"
            />
          </div>

          <p className="text-xs opacity-50">
            Backend will validate teacher GPS against this radius.
          </p>
        </div>
      </div>
    </div>
    </Page>
  );
  
}
