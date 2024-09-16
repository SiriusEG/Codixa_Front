import React from "react";

const LoginRegisterSwitch = ({ isLogin, setIsLogin, toggleSwitch }) => {
  return (
    <div className="relative flex items-center justify-center bg-primary rounded-full w-72 h-12 p-1 cursor-pointer">
      {/* Background bar that moves */}
      <div
        className={`absolute h-9 w-[45%] rounded-full transition-transform duration-500 ease-in-out bg-secondary ${
          isLogin ? "translate-x-[50%]" : "translate-x-[100%]"
        }`}
        onClick={toggleSwitch}
        style={{
          transform: isLogin ? "translateX(-50%)" : "translateX(50%)", // Move the background bar to match the state
        }}
      />

      {/* Login Text */}
      <div
        onClick={() => setIsLogin(true)}
        className={`z-10 w-1/2 text-center text-white ${
          isLogin ? "" : "opacity-70"
        }`}
      >
        Login
      </div>

      {/* Register Text */}
      <div
        onClick={() => setIsLogin(false)}
        className={`z-10 w-1/2 text-center text-white ${
          isLogin ? "opacity-70" : ""
        }`}
      >
        Register
      </div>
    </div>
  );
};

export default LoginRegisterSwitch;
