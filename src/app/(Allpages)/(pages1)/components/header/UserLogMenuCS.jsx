"use client";

import Link from "next/link";
import { MoonLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../../../../../lib/hooks";
import { FiChevronDown } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { motion } from "framer-motion";
import { useState } from "react";
import { logout } from "../../../../../../lib/reducers/auth/logInSlice";
import { useRouter } from "next/navigation";
import { clearUserInfo } from "../../../../../../lib/reducers/user/userSlice";
import { FaUser } from "react-icons/fa"; // Import profile icon

const UserLogMenuCS = () => {
  const [open, setOpen] = useState(false);
  const { userInfo, tokenChecking } = useAppSelector((state) => state.user);

  // Dynamically set menu options based on role
  const menuOptions = [
    {
      icon: userInfo?.role === "Student" ? FaUser : MdDashboard,
      text: userInfo?.role === "Student" ? "Profile" : "Dashboard",
      route: userInfo?.role === "Student" ? "/profile" : "/dashboard",
    },
    { icon: CiLogout, text: "Log Out", route: "/", isLogout: true },
  ];

  return (
    <>
      {tokenChecking ? (
        <MoonLoader color="#20B486" size={15} />
      ) : userInfo ? (
        // Drop menu
        <div className="p-8 flex items-center justify-center bg-white z-50">
          <motion.div animate={open ? "open" : "closed"} className="relative">
            <button
              onClick={() => setOpen((pv) => !pv)}
              onBlur={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-300 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">
                {userInfo.name}
              </span>
              <motion.span variants={iconVariants}>
                <FiChevronDown />
              </motion.span>
            </button>

            <motion.ul
              initial={wrapperVariants.closed}
              variants={wrapperVariants}
              style={{ originY: "top", translateX: "-100%" }}
              className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
            >
              {menuOptions.map((opt, i) => (
                <Option
                  key={i}
                  setOpen={setOpen}
                  Icon={opt.icon}
                  text={opt.text}
                  route={opt.route}
                  isLogout={!!opt.isLogout}
                />
              ))}
            </motion.ul>
          </motion.div>
        </div>
      ) : (
        <>
          <Link
            className="rounded-md text-sm bg-gray-100 px-3 py-2 font-semibold text-primary transition hover:text-hoverPrimary"
            href="/user/login"
          >
            Login
          </Link>
          <Link
            className="block rounded-md text-base bg-primary px-3 py-2 font-semibold text-white transition hover:bg-hoverPrimary"
            href="/user/signup"
          >
            Create free account
          </Link>
        </>
      )}
    </>
  );
};

const Option = ({ text, Icon, setOpen, route, isLogout = false }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const optionClick = () => {
    if (isLogout) {
      dispatch(logout());
      dispatch(clearUserInfo());
    }
    setOpen(false);
    return router.push(route);
  };

  return (
    <motion.li
      variants={itemVariants}
      onClick={optionClick}
      className={`flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md text-slate-700 ${
        isLogout
          ? "hover:text-red-600 hover:bg-red-300"
          : "hover:text-primary hover:bg-primary-background"
      } transition-colors cursor-pointer`}
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default UserLogMenuCS;

// Animation Variants
const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.1 },
  },
  closed: {
    scaleY: 0,
    transition: { when: "afterChildren", staggerChildren: 0.1 },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: { opacity: 1, y: 0, transition: { when: "beforeChildren" } },
  closed: { opacity: 0, y: -15, transition: { when: "afterChildren" } },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
