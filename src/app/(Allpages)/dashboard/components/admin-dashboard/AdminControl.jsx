"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AdminControl = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
    gender: true,
    dateOfBirth: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [pwdAdminId, setPwdAdminId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError, setPwdError] = useState(null);
  const [pwdSuccess, setPwdSuccess] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [editForm, setEditForm] = useState({
    email: "",
    userName: "",
    phoneNumber: "",
    newPhoto: null,
  });
  const [editPreview, setEditPreview] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);
  const [editSuccess, setEditSuccess] = useState(null);

  // Fetch admins (dummy data - replace with API call)
  useEffect(() => {
    // Fetch admins from API
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://codixa.runasp.net/api/admin/GetAllAdmins",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch admins");
        const data = await res.json();
        setAdmins(Array.isArray(data.data) ? data.data : []);
      } catch (e) {
        setAdmins([]);
        setError(e.message);
      }
    };
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Add new admin to local state (replace with actual API implementation)
      const newAdmin = {
        id: admins.length + 1,
        ...formData,
        gender: Boolean(formData.gender),
      };

      setAdmins([...admins, newAdmin]);
      setSuccess("Admin registered successfully!");

      setTimeout(() => {
        setShowModal(false);
        setFormData({
          userName: "",
          password: "",
          confirmPassword: "",
          email: "",
          phoneNumber: "",
          gender: true,
          dateOfBirth: "",
        });
      }, 2000);
    } catch (err) {
      setError(err.message || "An error occurred.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-8 flex flex-col min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Admin Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-100 text-white rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Admin
        </button>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Photo
              </th>
              {["User Name", "Email", "Phone"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {admin.photoPath ? (
                    <img
                      src={`https://codixa.runasp.net/${admin.photoPath.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt="Admin"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 text-lg font-medium">
                        {admin.userName?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {admin.userName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {admin.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {admin.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-100"
                    onClick={() => {
                      setPwdAdminId(admin.userId);
                      setShowPwdModal(true);
                      setNewPassword("");
                      setPwdError(null);
                      setPwdSuccess(null);
                    }}
                  >
                    Change Password
                  </button>
                  <button
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => {
                      setEditAdmin(admin);
                      setEditForm({
                        email: admin.email || "",
                        userName: admin.userName || "",
                        phoneNumber: admin.phoneNumber || "",
                        newPhoto: null,
                      });
                      setEditPreview(
                        admin.photoPath
                          ? `https://codixa.runasp.net/${admin.photoPath.replace(
                              /\\/g,
                              "/"
                            )}`
                          : null
                      );
                      setEditError(null);
                      setEditSuccess(null);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0000003d] bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Register New Admin
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    name="userName"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary-100 pr-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>

                {/* Confirm Password Field */}
                <div className="relative mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary-100 pr-10"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+201017565459"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gender: e.target.value === "true",
                      })
                    }
                    required
                  >
                    <option value="true">Male</option>
                    <option value="false">Female</option>
                  </select>
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-100 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  {isSubmitting && (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {isSubmitting ? "Processing..." : "Register Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPwdModal && (
        <div className="fixed inset-0 bg-[#0000003d] bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Change Admin Password
              </h2>
              <button
                onClick={() => setShowPwdModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setPwdLoading(true);
                setPwdError(null);
                setPwdSuccess(null);
                try {
                  const token = localStorage.getItem("token");
                  const res = await fetch(
                    "https://codixa.runasp.net/api/admin/ChangeUserPassword",
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({ userId: pwdAdminId, newPassword }),
                    }
                  );
                  if (!res.ok) throw new Error("Failed to change password");
                  setPwdSuccess("Password changed successfully!");
                  setTimeout(() => setShowPwdModal(false), 1500);
                } catch (err) {
                  setPwdError(err.message || "An error occurred.");
                }
                setPwdLoading(false);
              }}
              className="p-6 space-y-6"
            >
              {pwdError && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                  {pwdError}
                </div>
              )}
              {pwdSuccess && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm">
                  {pwdSuccess}
                </div>
              )}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type={showPwd ? "text" : "password"}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary-100 pr-16"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-[66%] -translate-y-1/2 text-gray-500 font-medium"
                  tabIndex={-1}
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowPwdModal(false)}
                  className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200"
                  disabled={pwdLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pwdLoading || !newPassword}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-100 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  {pwdLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Admin Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-[#0000003d] bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit Admin
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setEditLoading(true);
                setEditError(null);
                setEditSuccess(null);
                try {
                  const token = localStorage.getItem("token");
                  const fd = new FormData();
                  fd.append("UserId", editAdmin.userId);
                  fd.append("Email", editForm.email);
                  fd.append("UserName", editForm.userName);
                  fd.append("PhoneNumber", editForm.phoneNumber);
                  if (editForm.newPhoto)
                    fd.append("NewPhoto", editForm.newPhoto);
                  const res = await fetch(
                    "https://codixa.runasp.net/api/admin/ChangeAdminData",
                    {
                      method: "PUT",
                      headers: { Authorization: `Bearer ${token}` },
                      body: fd,
                    }
                  );
                  if (!res.ok) throw new Error("Failed to update admin");
                  setEditSuccess("Admin updated successfully!");
                  setTimeout(() => setShowEditModal(false), 1500);
                } catch (err) {
                  setEditError(err.message || "An error occurred.");
                }
                setEditLoading(false);
              }}
              className="p-6 space-y-6"
            >
              {editError && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                  {editError}
                </div>
              )}
              {editSuccess && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm">
                  {editSuccess}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary-100"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary-100"
                  value={editForm.userName}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, userName: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary-100"
                  value={editForm.phoneNumber}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, phoneNumber: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setEditForm((f) => ({ ...f, newPhoto: file }));
                    setEditPreview(file ? URL.createObjectURL(file) : null);
                  }}
                  className="w-full"
                />
                {editPreview && (
                  <img
                    src={editPreview}
                    alt="Preview"
                    className="mt-2 w-16 h-16 rounded-full object-cover"
                  />
                )}
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200"
                  disabled={editLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-100 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminControl;
