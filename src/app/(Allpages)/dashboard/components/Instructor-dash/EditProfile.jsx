import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const GET_API = "https://codixa.runasp.net/api/Account/GetInstructorData";
const UPDATE_API = "https://codixa.runasp.net/api/account/ChangeInstructorData";

const EditProfile = () => {
  const [rawData, setRawData] = useState(null);
  const [form, setForm] = useState({
    email: "",
    userName: "",
    phoneNumber: "",
    profilePic: null,
    instructorFullName: "",
    specialty: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(GET_API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch instructor data");
        const data = await res.json();
        setRawData(data.data);
        setForm({
          email: data.data.email || "",
          userName: data.data.userName || "",
          phoneNumber: data.data.phoneNumber || "",
          profilePic: data.data.profilePic || null,
          instructorFullName: data.data.instructorFullName || "",
          specialty: data.data.specialty || "",
        });
      } catch (e) {
        setToast({ show: true, message: e.message, type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setToast({ show: false, message: "", type: "success" });
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v !== undefined && v !== null) formData.append(k, v);
      });
      const res = await fetch(UPDATE_API, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update profile");
      setToast({
        show: true,
        message: "Profile updated successfully",
        type: "success",
      });
      setShowEditModal(false);
      setRawData({
        ...rawData,
        ...form,
        profilePic:
          typeof form.profilePic === "string"
            ? form.profilePic
            : rawData.profilePic,
      });
    } catch (e) {
      setToast({ show: true, message: e.message, type: "error" });
    } finally {
      setSaving(false);
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
    <div className="max-w-lg mx-auto mt-10 p-8 rounded ">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      {rawData && (
        <div className="mb-6 p-4 bg-gray-50 rounded text-gray-700">
          <div className="flex items-center gap-4 mb-4">
            {rawData.profilePic && (
              <img
                src={`https://codixa.runasp.net/${rawData.profilePic.replace(
                  /\\/g,
                  "/"
                )}`}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <div>
              <div className="font-semibold text-lg">
                {rawData.instructorFullName}
              </div>
              <div className="text-sm text-gray-500">{rawData.userName}</div>
            </div>
          </div>
          <div className="mb-1">
            <span className="font-medium">Email:</span> {rawData.email}
          </div>
          <div className="mb-1">
            <span className="font-medium">Phone:</span> {rawData.phoneNumber}
          </div>
          <div className="mb-1">
            <span className="font-medium">Specialty:</span> {rawData.specialty}
          </div>
          <button
            className="mt-4 bg-primary text-white px-4 py-2 rounded font-bold"
            onClick={() => setShowEditModal(true)}
          >
            Edit
          </button>
        </div>
      )}
      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Edit Instructor Info
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="instructorFullName"
                value={form.instructorFullName}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
                placeholder="Full Name"
                required
              />
              <input
                name="userName"
                value={form.userName}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
                placeholder="Username"
                required
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
                placeholder="Email"
                required
              />
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
                placeholder="Phone"
                required
              />
              <input
                name="specialty"
                value={form.specialty}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
                placeholder="Specialty"
                required
              />
              <div className="relative flex items-center">
                <span
                  className="absolute left-3 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="border pl-10 pr-4 py-2 rounded w-full"
                  placeholder="Current Password (required to confirm changes)"
                  required
                />
              </div>
              <input
                type="file"
                name="profilePic"
                accept="image/*"
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
              />
              {form.profilePic && typeof form.profilePic === "string" && (
                <img
                  src={`https://codixa.runasp.net/${form.profilePic.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt="Profile"
                  className="w-20 h-20 rounded-full mt-2 object-cover"
                />
              )}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setShowEditModal(false)}
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
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 z-[9999] px-6 py-3 rounded shadow-lg text-white text-sm font-semibold transition-all ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default EditProfile;
