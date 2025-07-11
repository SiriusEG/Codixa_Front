"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../lib/hooks";
import { AiOutlineSetting } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
// import { toast } from "react-hot-toast";

// Minimal custom toast system
function Toast({ message, type, onClose }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white transition-all duration-300 ${
        type === "error" ? "bg-red-500" : "bg-green-500"
      }`}
      style={{ minWidth: 200 }}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          className="ml-4 text-white text-lg font-bold focus:outline-none"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}

// Edit Profile Modal
function EditProfileModal({ studentData, onClose, onSave, showToast }) {
  const [form, setForm] = React.useState({
    name: studentData?.name || "",
    email: studentData?.email || "",
    profilePicture: null,
    currentPassword: "",
  });
  const [preview, setPreview] = React.useState(
    studentData?.ProfilePicturePath
      ? `https://codixa.runasp.net/${studentData.ProfilePicturePath}`
      : null
  );
  const [saving, setSaving] = React.useState(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setForm((f) => ({ ...f, profilePicture: files[0] }));
      setPreview(files[0] ? URL.createObjectURL(files[0]) : preview);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.currentPassword) {
      showToast("Current password is required", "error");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("currentPassword", form.currentPassword);
      if (form.profilePicture) fd.append("profilePicture", form.profilePicture);
      const res = await fetch(
        "https://codixa.runasp.net/api/account/ChangeStudentData",
        {
          method: "PUT",
          credentials: "include",
          body: fd,
        }
      );
      if (!res.ok) throw new Error("Failed to update profile");
      const data = await res.json();
      onSave(
        data.data || data,
        form,
        form.profilePicture ? preview : studentData.ProfilePicturePath
      );
      showToast("Profile updated successfully", "success");
      onClose();
    } catch (err) {
      showToast("Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Profile Picture
          </label>
          <input
            name="profilePicture"
            type="file"
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Current Password <span className="text-red-500">*</span>
          </label>
          <input
            name="currentPassword"
            type="password"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

// Change Password Modal
function ChangePasswordModal({ onClose, showToast }) {
  const [form, setForm] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = React.useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [saving, setSaving] = React.useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const handleShow = (field) => setShow((s) => ({ ...s, [field]: !s[field] }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      showToast("All fields are required", "error");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(
        "https://codixa.runasp.net/api/account/ChangeStudentPassword",
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to change password");
      showToast("Password changed successfully", "success");
      onClose();
    } catch (err) {
      showToast("Failed to change password", "error");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Old Password</label>
          <div className="relative">
            <input
              name="oldPassword"
              type={show.old ? "text" : "password"}
              value={form.oldPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => handleShow("old")}
            >
              {show.old ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <div className="relative">
            <input
              name="newPassword"
              type={show.new ? "text" : "password"}
              value={form.newPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => handleShow("new")}
            >
              {show.new ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              name="confirmPassword"
              type={show.confirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => handleShow("confirm")}
            >
              {show.confirm ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded"
            disabled={saving}
          >
            {saving ? "Saving..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
}

const ProfileSettings = () => {
  // Remove userInfo from Redux, use local state
  // const { userInfo } = useAppSelector((state) => state.user);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const router = useRouter();
  const [toastData, setToastData] = useState({
    message: "",
    type: "success",
    visible: false,
  });
  const toastTimeoutRef = React.useRef();

  const showToast = (message, type = "success") => {
    setToastData({ message, type, visible: true });
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastData((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://codixa.runasp.net/api/Account/GetStudentData",
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch student data");
        const data = await res.json();
        setStudentData(data.data || data); // handle both {data: ...} and direct
      } catch (err) {
        showToast("Failed to load profile data", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">
                Profile Settings
              </h1>

              {/* Navigation Tabs */}
              {/* <div className="ml-8 flex space-x-8">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center text-gray-500 hover:text-primary-100"
                >
                  <AiOutlineHome className="inline-block mr-2" />
                  Back to Dashboard
                </button>
              </div> */}
            </div>

            {/* Profile Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="relative">
                  {studentData?.ProfilePicturePath === "null" ||
                  !studentData?.ProfilePicturePath ? (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-medium">
                        {studentData?.name?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={`https://codixa.runasp.net/${studentData.ProfilePicturePath}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="loader" />
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={studentData?.name || ""}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={studentData?.email || ""}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <input
                    type="text"
                    value={studentData?.role || ""}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    readOnly
                  />
                </div>

                <div className="flex gap-4 mt-8 border-t pt-6">
                  <button
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    onClick={() => setEditModalOpen(true)}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    onClick={() => setChangePasswordModalOpen(true)}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Edit Profile Modal */}
        {editModalOpen && (
          <EditProfileModal
            studentData={studentData}
            onClose={() => setEditModalOpen(false)}
            onSave={(updated, form, newPic) => {
              setStudentData((prev) => ({
                ...prev,
                ...form,
                ProfilePicturePath: newPic,
              }));
            }}
            showToast={showToast}
          />
        )}
        {/* Change Password Modal */}
        {changePasswordModalOpen && (
          <ChangePasswordModal
            onClose={() => setChangePasswordModalOpen(false)}
            showToast={showToast}
          />
        )}
        {/* Toast Notification */}
        {toastData.visible && (
          <Toast
            message={toastData.message}
            type={toastData.type}
            onClose={() =>
              setToastData((prev) => ({ ...prev, visible: false }))
            }
          />
        )}
      </main>
    </div>
  );
};

export default ProfileSettings;
