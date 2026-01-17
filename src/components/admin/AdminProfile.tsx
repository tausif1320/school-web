"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import Input from "@/components/ui/Input";
import Page from "../ui/Page";
import { useToast } from "../ui/Toast";

export default function AdminProfile() {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const {showToast} = useToast();

  const [profile, setProfile] = useState({
    name: "Aaliya",
    email: "admin@school.edu",
    phone: "+91 98765 11122",
    role: "School Administrator",
    qualification: "M.Ed, Education Management",
    experience: "12 Years",
  });

  const [temp, setTemp] = useState(profile);

  function handleSave() {
    setProfile(temp);
    setEditing(false);
    showToast("Profile updated successfully", "success");

  }

  function handleLogout() {
    setLoggingOut(true);
    setTimeout(() => {
      router.push("/");
    },1000);
    showToast("Logged out", "info");

    
  }

  return (
    <Page>
    <div className="max-w-5xl mx-auto space-y-8">

      <div>
        <h1 className="text-3xl font-semibold">Admin Profile</h1>
        <p className="text-slate-400 mt-1">Administrative information</p>
      </div>

      <div className="glass p-6 space-y-6">
        <div className="flex gap-6 items-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/60 to-indigo-600/60 flex items-center justify-center text-3xl font-bold">
            {profile.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
            <p className="text-slate-400">{profile.role}</p>
            <p className="text-blue-300 text-sm">System Administrator</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Info label="Email" value={profile.email} />
          <Info label="Phone" value={profile.phone} />
          <Info label="Qualification" value={profile.qualification} />
          <Info label="Experience" value={profile.experience} />
        </div>

        <div className="flex gap-4">
          <Button
            ripple
            onClick={() => {
              setTemp(profile);
              setEditing(true);
            }}
            
            variant="primary"
            className="flex-1"
          >
            Edit Profile
          </Button>

          <Button
            ripple
            onClick={handleLogout}
            loading={loggingOut}
            variant="danger"
            className="flex-1"
          >
            Logout
          </Button>
        </div>
      </div>

      {editing && (
  <div
    className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center px-4 z-50"
    onKeyDown={(e) => {
      if (e.key === "Escape") setEditing(false);
    }}
  >
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      className="glass p-6 max-w-xl w-full space-y-4"
      tabIndex={-1}
    >
      <h2 className="text-xl font-semibold">Edit Admin Profile</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input autoFocus label="Name" value={temp.name} onChange={(e) => setTemp({ ...temp, name: e.target.value })} />

        <Input label="Email" type="email" value={temp.email} onChange={(e) => setTemp({ ...temp, email: e.target.value })} />

        <Input label="Phone" numeric maxLength={10} value={temp.phone} onChange={(e) => setTemp({ ...temp, phone: e.target.value })} />

        <Input label="Role" value={temp.role} onChange={(e) => setTemp({ ...temp, role: e.target.value })} />

        <Input label="Qualification" value={temp.qualification} onChange={(e) => setTemp({ ...temp, qualification: e.target.value })} />

        <Input label="Experience" value={temp.experience} onChange={(e) => setTemp({ ...temp, experience: e.target.value })} />
      </div>

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          className="flex-1 py-3 bg-blue-600 rounded-xl btn-press"
        >
          Save
        </button>

        <button
          type="button"
          onClick={() => setEditing(false)}
          className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl btn-press"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}

    </div>
    </Page>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <p className="text-slate-400 text-sm">{label}</p>
      <p>{value}</p>
    </div>
  );
}
