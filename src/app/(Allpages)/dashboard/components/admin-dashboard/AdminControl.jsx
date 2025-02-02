"use client";
import React, { useState } from "react";
import axios from "axios";

const AdminControl = () => {
  // Dummy admin data for the table (to be replaced by API data later)
  const [admins, setAdmins] = useState([
    {
      id: 1,
      userName: "admin1",
      email: "admin1@example.com",
      phoneNumber: "+1234567890",
      gender: true,
      dateOfBirth: "1990-01-01",
    },
    {
      id: 2,
      userName: "admin2",
      email: "admin2@example.com",
      phoneNumber: "+0987654321",
      gender: false,
      dateOfBirth: "1992-02-02",
    },
  ]);

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

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    // Simple client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }

    try {
      // Call our internal API route, which hides the external API endpoint
      const response = await axios.post("/api/registerAdmin", formData);
      if (response.data?.success) {
        setSuccess("Admin registered successfully!");
        // Optionally, update the admin list here or refetch data
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
          setSuccess(null);
        }, 2000);
      } else {
        setError(response.data?.error || "Registration failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "An error occurred."
      );
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-8 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Admin Control</h1>
      <button
        onClick={() => setShowModal(true)}
        className="mb-6 px-4 text-center self-end m-w-[13rem] py-2 bg-primary hover:bg-primary-100 text-white rounded-md transition-colors"
      >
        Register New Admin
      </button>

      {/* Admins Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">User Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-left">Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b">
                <td className="px-4 py-2">{admin.userName}</td>
                <td className="px-4 py-2">{admin.email}</td>
                <td className="px-4 py-2">{admin.phoneNumber}</td>
                <td className="px-4 py-2">
                  {admin.gender ? "Male" : "Female"}
                </td>
                <td className="px-4 py-2">{admin.dateOfBirth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for New Admin Registration */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 z-40">
          <div className="bg-white p-4 rounded-lg border border-primary-100 w-full max-w-2xl mx-4 z-50">
            <h2 className="text-2xl font-bold mb-4">Register New Admin</h2>
            {error && (
              <div className="mb-3 p-2 bg-red-50 text-red-700 border border-red-200 rounded text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-3 p-2 bg-green-50 text-green-700 border border-green-200 rounded text-sm">
                {success}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      User Name
                    </label>
                    <input
                      type="text"
                      name="userName"
                      className="mt-1 block w-full border border-gray-200 rounded-md p-2 text-sm"
                      value={formData.userName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="mt-1 block w-full border border-gray-200 rounded-md p-2 text-sm"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="mt-1 block w-full border border-gray-200 rounded-md p-2 text-sm"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="mt-1 block w-full border border-gray-200 rounded-md p-2 text-sm"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      className="mt-1 block w-full border border-gray-200 rounded-md p-2 text-sm"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      placeholder="+201017565459"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Gender
                    </label>
                    <select
                      name="gender"
                      className="mt-1 block w-full border border-gray-200 rounded-md p-2 text-sm bg-white"
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          gender: e.target.value === "true",
                        }))
                      }
                      required
                    >
                      <option value="true">Male</option>
                      <option value="false">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="mt-1 block w-full border border-gray-200 rounded-md p-2 text-sm text-center"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary hover:bg-primary-100 text-white rounded-md text-sm transition-colors"
                >
                  {isSubmitting ? "Registering..." : "Register"}
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
