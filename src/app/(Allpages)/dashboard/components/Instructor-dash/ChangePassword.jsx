import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const API_URL = "https://codixa.runasp.net/api/account/ChangePassword";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast({ show: false, message: "", type: "success" });
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmNewPassword,
        }),
      });
      if (!res.ok) throw new Error("Failed to change password");
      setToast({
        show: true,
        message: "Password changed successfully",
        type: "success",
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (e) {
      setToast({ show: true, message: e.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ ...toast, show: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="max-w-md mx-auto mt-10 p-8 rounded ">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative flex items-center">
          <span
            className="absolute left-3 cursor-pointer text-gray-500"
            onClick={() => setShowOld((v) => !v)}
          >
            {showOld ? <FaEyeSlash /> : <FaEye />}
          </span>
          <input
            type={showOld ? "text" : "password"}
            className="border pl-10 pr-4 py-2 rounded w-full"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="relative flex items-center">
          <span
            className="absolute left-3 cursor-pointer text-gray-500"
            onClick={() => setShowNew((v) => !v)}
          >
            {showNew ? <FaEyeSlash /> : <FaEye />}
          </span>
          <input
            type={showNew ? "text" : "password"}
            className="border pl-10 pr-4 py-2 rounded w-full"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="relative flex items-center">
          <span
            className="absolute left-3 cursor-pointer text-gray-500"
            onClick={() => setShowConfirm((v) => !v)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
          <input
            type={showConfirm ? "text" : "password"}
            className="border pl-10 pr-4 py-2 rounded w-full"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded font-bold mt-4 flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading && (
            <span className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></span>
          )}
          Change Password
        </button>
      </form>
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

export default ChangePassword;
