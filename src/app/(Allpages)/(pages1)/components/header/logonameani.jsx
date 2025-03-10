"use client";
import { motion } from "framer-motion";

const Codixia = () => {
  return (
    <motion.h2
      className="text-primary text-2xl font-bold inline-block origin-bottom"
      animate={{ rotate: [0, 5, -5, 0] }} // Swing effect
      transition={{
        duration: 2,
        repeat: Infinity, // Repeat the animation
        ease: "easeInOut",
      }}
    >
      Codixia
    </motion.h2>
  );
};

export default Codixia;
