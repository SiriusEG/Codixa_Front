"use client";
import React from "react";
import { useAppSelector } from "../../../../../lib/hooks";
import { AiOutlineSetting } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";

const ProfileSettings = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const router = useRouter();

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
                {userInfo?.ProfilePicturePath === "null" || !userInfo?.ProfilePicturePath ? (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-medium">
                      {userInfo?.name?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                  </div>
                ) : (
                  <img
                    src={`https://codixa.runasp.net/${userInfo.ProfilePicturePath}`}
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
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userInfo?.name || ""}
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
                  value={userInfo?.email || ""}
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
                  value={userInfo?.role || ""}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  readOnly
                />
              </div>

              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Security Settings
                </h3>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;
