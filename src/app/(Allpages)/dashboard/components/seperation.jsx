"use client";
import { FaSpinner } from "react-icons/fa";
import { useAppSelector } from "../../../../../lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminDashboard from "./admin-dashboard/admindashboard";

function Seperation() {
  const { userInfo, tokenChecking } = useAppSelector((state) => state.user);
  const navigate = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      // Wait for the token checking to complete
      if (!tokenChecking && (!userInfo || !userInfo.role)) {
        // Redirect to homepage if no token or user info is found
        await navigate.push("/");
      }
    };

    // Call the async function
    checkToken();
  }, [tokenChecking, userInfo, navigate]);

  if (tokenChecking) {
    return (
      <div className="flex items-center justify-center flex-col h-screen">
        <FaSpinner className="text-6xl animate-spin" />
      </div>
    );
  }

  // Render based on user role
  if (userInfo && userInfo.role === "admin") {
    return (
      <div>
        <AdminDashboard />
      </div>
    );
  }
  if (!tokenChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-400 font-bold text-[3rem]">
        You need to sign In first
      </div>
    );
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-red-700 text-lg">
        Something went wrong! Please contact developers urgently.
      </p>
    </div>
  );
}

export default Seperation;
