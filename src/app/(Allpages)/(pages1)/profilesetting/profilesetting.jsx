"use client";
import React, { useEffect, useState, useRef } from "react";

/* ───────────────── toast ───────────────── */
function Toast({ message, type, onClose }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white ${
        type === "error" ? "bg-red-500" : "bg-green-600"
      }`}
    >
      <div className="flex items-center gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="text-xl font-bold">
          ×
        </button>
      </div>
    </div>
  );
}

/* ───────────── helper for API ───────────── */
async function apiFetch(url, opts = {}) {
  const token = localStorage.getItem("token");
  const res = await fetch(url, {
    ...opts,
    headers: {
      ...(opts.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return json.data ?? json; // unwrap if backend uses {data: …}
}
/* ─────────────── Edit Profile ─────────────── */
function EditProfileModal({ student, onClose, refresh, toast }) {
  const [form, setForm] = useState({
    studentFullName: student.studentFullName ?? "",
    email: student.email ?? "",
    userName: student.userName ?? "",
    phoneNumber: student.phoneNumber ?? "",
    profilePic: null,
    Password: "", // new password (optional)
  });

  const [preview, setPreview] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ---------- field change ---------- */
  const change = ({ target }) => {
    if (target.name === "profilePic") {
      setForm({ ...form, profilePic: target.files[0] });
      setPreview(target.files[0] ? URL.createObjectURL(target.files[0]) : null);
    } else {
      setForm({ ...form, [target.name]: target.value });
    }
  };

  /* ---------- submit ---------- */
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("StudentFullName", form.studentFullName);
      fd.append("Email", form.email);
      fd.append("UserName", form.userName);
      fd.append("PhoneNumber", form.phoneNumber);
      if (form.Password) fd.append("Password", form.Password);
      if (form.profilePic) fd.append("ProfilePic", form.profilePic);

      await apiFetch(
        "https://codixa.runasp.net/api/account/ChangeStudentData",
        {
          method: "PUT",
          body: fd,
        }
      );

      toast("Profile updated");
      await refresh();
      onClose();
    } catch {
      toast("Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- JSX ---------- */
  return (
    <div
      className="fixed inset-0  flex items-center justify-center bg-black/40 p-4"
      style={{ zIndex: 100 }}
    >
      <form
        onSubmit={submit}
        className="bg-white rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Edit Profile</h2>

        {[
          ["studentFullName", "Full Name"],
          ["email", "Email"],
          ["userName", "Username"],
          ["phoneNumber", "Phone"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="block text-sm mb-1">{label}</label>
            <input
              name={key}
              value={form[key]}
              onChange={change}
              required={key !== "phoneNumber"}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        {/* profile pic */}
        <div>
          <label className="block text-sm mb-1">Profile Picture</label>
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={change}
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-2 w-16 h-16 rounded-full object-cover"
            />
          )}
        </div>

        {/*  PASSWORD */}
        <div>
          <label className="block text-sm mb-1">Current Password</label>
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              name="Password"
              value={form.Password}
              onChange={change}
              className="w-full border px-3 py-2 rounded"
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-sm text-gray-500"
              onClick={() => setShowPwd((s) => !s)}
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─────────────── Change Password ─────────────── */
function ChangePasswordModal({ onClose, toast }) {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirm: "",
  });
  const [show, setShow] = useState({ old: false, new: false, confirm: false });
  const [saving, setSaving] = useState(false);

  const change = ({ target }) =>
    setForm({ ...form, [target.name]: target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirm)
      return toast("Passwords do not match", "error");
    setSaving(true);
    try {
      await apiFetch("https://codixa.runasp.net/api/account/ChangePassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
          confirmNewPassword: form.confirm,
        }),
      });
      toast("Password changed");
      onClose();
    } catch {
      toast("Failed to change password", "error");
    } finally {
      setSaving(false);
    }
  };

  const pwdInput = (name, label, key) => (
    <div key={key}>
      <label className="block text-sm mb-1">{label}</label>
      <div className="relative">
        <input
          type={show[name] ? "text" : "password"}
          name={name}
          value={form[name]}
          onChange={change}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="button"
          className="absolute right-3 top-2 text-sm text-gray-500"
          onClick={() => setShow((s) => ({ ...s, [name]: !s[name] }))}
        >
          {show[name] ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={submit}
        className="bg-white rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Change Password</h2>
        {[
          ["oldPassword", "Old Password", "old"],
          ["newPassword", "New Password", "new"],
          ["confirm", "Confirm New Password", "confirm"],
        ].map((a) => pwdInput(...a))}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            {saving ? "Saving…" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─────────────────── main ─────────────────── */
export default function ProfileSettings() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);

  const [toast, setToast] = useState({ visible: false, message: "", type: "" });
  const toastTimer = useRef();

  const showToast = (msg, type = "success") => {
    setToast({ visible: true, message: msg, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      3000
    );
  };

  const refresh = async () => {
    const data = await apiFetch(
      "https://codixa.runasp.net/api/Account/GetStudentData"
    );
    setStudent(data);
  };

  useEffect(() => {
    refresh()
      .catch(() => showToast("Failed to load profile", "error"))
      .finally(() => setLoading(false));
    return () => clearTimeout(toastTimer.current);
  }, []);

  /* normalise any picture path */
  const rawPic =
    student &&
    (student.profilePic ??
      student.ProfilePic ??
      student.profilePicturePath ??
      student.ProfilePicturePath ??
      student.profilePicPath ??
      student.ProfilePicPath ??
      "");
  const picUrl = rawPic
    ? rawPic.startsWith("http")
      ? rawPic
      : `https://codixa.runasp.net/${rawPic
          .replace(/\\/g, "/")
          .replace(/^\/+/, "")}`
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <h1 className="text-2xl font-bold text-primary">Profile Settings</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <div className="max-w-xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            {loading ? (
              <p>Loading…</p>
            ) : (
              <>
                {picUrl ? (
                  <img
                    src={picUrl}
                    alt="avatar"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary mx-auto"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-500 mx-auto">
                    {student?.studentFullName?.[0]?.toUpperCase() ?? "?"}
                  </div>
                )}

                <h2 className="mt-4 text-xl font-semibold">
                  {student.studentFullName}
                </h2>
                <p className="text-gray-500">{student.email}</p>

                <div className="mt-6 space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-800">Username:</span>{" "}
                    {student.userName}
                  </p>
                  {student.phoneNumber && (
                    <p>
                      <span className="font-medium text-gray-800">Phone:</span>{" "}
                      {student.phoneNumber}
                    </p>
                  )}
                </div>

                <div className="flex justify-center gap-4 mt-6">
                  <button
                    className="px-4 py-2 bg-primary text-white rounded"
                    onClick={() => setEditOpen(true)}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="px-4 py-2 bg-primary text-white rounded"
                    onClick={() => setPassOpen(true)}
                  >
                    Change Password
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {editOpen && (
          <EditProfileModal
            student={student}
            onClose={() => setEditOpen(false)}
            refresh={refresh}
            toast={showToast}
          />
        )}
        {passOpen && (
          <ChangePasswordModal
            onClose={() => setPassOpen(false)}
            toast={showToast}
          />
        )}

        {toast.visible && (
          <Toast
            {...toast}
            onClose={() => setToast((t) => ({ ...t, visible: false }))}
          />
        )}
      </main>
    </div>
  );
}
