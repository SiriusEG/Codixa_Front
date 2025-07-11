"use client";

import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaKey,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const TEACHERS_API = "https://codixa.runasp.net/api/admin/GetAllInstructors";
const UPDATE_API = "https://codixa.runasp.net/api/admin/ChangeInstructorData";
const PASSWORD_API = "https://codixa.runasp.net/api/admin/ChangeUserPassword";

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editIdx, setEditIdx] = useState(null);
  const [editData, setEditData] = useState({});
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [pwdUserId, setPwdUserId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pwdSaving, setPwdSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [preview, setPreview] = useState(null);

  const fetchTeachers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(TEACHERS_API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch teachers");
      const data = await res.json();
      setTeachers(Array.isArray(data.data) ? data.data : []);
    } catch (e) {
      setError(e.message);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditData({ ...teachers[idx] });
    setPreview(
      teachers[idx].profilePic
        ? `https://codixa.runasp.net/${teachers[idx].profilePic.replace(
            /\\/g,
            "/"
          )}`
        : null
    );
    setShowEditModal(true);
  };

  const handleCancel = () => {
    setEditIdx(null);
    setEditData({});
    setShowEditModal(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setEditData((prev) => ({ ...prev, profilePic: files[0] }));
      setPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (id) => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      Object.entries(editData).forEach(([k, v]) => {
        if (v !== undefined && v !== null) formData.append(k, v);
      });
      formData.append("Id", id);
      const res = await fetch(UPDATE_API, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update teacher");
      setShowEditModal(false);
      setTeachers((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...editData } : t))
      );
      setToast({
        show: true,
        message: "Teacher updated successfully",
        type: "success",
      });
    } catch (e) {
      setToast({ show: true, message: e.message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const openPwdModal = (userId) => {
    setPwdUserId(userId);
    setShowPwdModal(true);
    setNewPassword("");
    setError("");
    setSuccess("");
  };

  const handlePwdChange = async (e) => {
    e.preventDefault();
    setPwdSaving(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(PASSWORD_API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: pwdUserId, newPassword }),
      });
      if (!res.ok) throw new Error("Failed to change password");
      setShowPwdModal(false);
      setToast({
        show: true,
        message: "Password changed successfully",
        type: "success",
      });
    } catch (e) {
      setToast({ show: true, message: e.message, type: "error" });
    } finally {
      setPwdSaving(false);
    }
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ ...toast, show: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6  rounded ">
      <h2 className="text-2xl font-bold mb-4">Teacher Management</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 z-[9999] px-6 py-3 rounded shadow-lg text-white text-sm font-semibold transition-all ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">AVATAR</th>
              <th className="px-4 py-2">FULL NAME</th>
              <th className="px-4 py-2">USERNAME</th>
              <th className="px-4 py-2">EMAIL</th>
              <th className="px-4 py-2">PHONE</th>
              <th className="px-4 py-2">SPECIALTY</th>
              <th className="px-4 py-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t, idx) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  {t.profilePic ? (
                    typeof t.profilePic === "string" ? (
                      <img
                        src={`https://codixa.runasp.net/${t.profilePic.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(t.profilePic)}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 text-lg font-medium">
                        {t.instructorFullName?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">{t.instructorFullName}</td>
                <td className="px-4 py-2">{t.userName}</td>
                <td className="px-4 py-2">{t.email}</td>
                <td className="px-4 py-2">{t.phoneNumber}</td>
                <td className="px-4 py-2">{t.specialty}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded flex items-center gap-2 shadow-none border-none"
                    onClick={() => handleEdit(idx)}
                    title="Edit"
                  >
                    <FaEdit className="text-lg" /> Edit
                  </button>
                  <button
                    className="bg-primary text-white font-bold px-4 py-2 rounded flex items-center gap-2 shadow-none border-none"
                    onClick={() => openPwdModal(t.id)}
                    title="Change Password"
                  >
                    <FaKey className="text-lg" /> Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {teachers.length === 0 && !loading && (
          <div className="text-center py-4 text-gray-500">
            No teachers found.
          </div>
        )}
      </div>
      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Edit Instructor
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(editData.id);
              }}
              className="space-y-4"
            >
              <input
                name="instructorFullName"
                value={editData.instructorFullName || ""}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
                placeholder="Full Name"
                required
              />
              <input
                name="userName"
                value={editData.userName || ""}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
                placeholder="Username"
                required
              />
              <input
                name="email"
                value={editData.email || ""}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
                placeholder="Email"
                required
              />
              <input
                name="phoneNumber"
                value={editData.phoneNumber || ""}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
                placeholder="Phone"
                required
              />
              <input
                name="specialty"
                value={editData.specialty || ""}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
                placeholder="Specialty"
                required
              />
              {/* Profile Picture Upload */}
              <div>
                <label className="block text-sm mb-1">Profile Picture</label>
                <input
                  type="file"
                  name="profilePic"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-16 h-16 rounded-full object-cover"
                  />
                )}
              </div>
              {/* Show API response here too */}
              {error && <div className="text-red-600 text-sm">{error}</div>}
              {success && (
                <div className="text-green-600 text-sm">{success}</div>
              )}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2"
                  disabled={saving}
                >
                  {saving && (
                    <span className="animate-spin h-5 w-5 border-b-2 border-white rounded-full mr-2"></span>
                  )}
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Password Modal */}
      {showPwdModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Change Password
            </h3>
            <form onSubmit={handlePwdChange} className="space-y-4">
              <div className="relative flex items-center">
                <span
                  className="absolute left-3 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="border pl-10 pr-4 py-2 rounded w-full focus:ring-2 focus:ring-primary"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              {success && (
                <div className="text-green-600 text-sm">{success}</div>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setShowPwdModal(false)}
                  disabled={pwdSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded flex items-center gap-2"
                  disabled={pwdSaving}
                >
                  {pwdSaving && (
                    <span className="animate-spin h-5 w-5 border-b-2 border-white rounded-full mr-2"></span>
                  )}
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherManagement;
