import React from "react";

const LoginRegisterSwitch = ({ isLogin, setIsLogin, toggleSwitch }) => {
  return (
    <div className="relative flex items-center justify-center bg-primary rounded-full w-64 h-12 p-1 cursor-pointer">
      {/* Background bar */}
      <div
        className={`absolute top-1 left-1 h-10 w-[48%] rounded-full transition-transform duration-300 ${
          isLogin
            ? "translate-x-0 bg-secondary"
            : "translate-x-[100%] bg-secondary"
        }`}
        onClick={toggleSwitch}
      />

      {/* Login Text */}
      <div
        onClick={() => setIsLogin(true)}
        className={`z-10 w-1/2 text-center text-white ${
          isLogin ? "" : "opacity-90"
        }`}
      >
        Login
      </div>

      {/* Register Text */}
      <div
        onClick={() => setIsLogin(false)}
        className={`z-10 w-1/2 text-center text-white  ${
          isLogin ? "opacity-90" : ""
        }`}
      >
        Register
      </div>
    </div>
  );
};

export default LoginRegisterSwitch;
