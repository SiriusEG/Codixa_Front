"use client";
import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";

// Register necessary chart elements with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Example chart data for various metrics
const courseHoursData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Hours of Courses Watched",
      data: [50, 80, 100, 150, 200, 300],
      borderColor: "#4F46E5", // Indigo color
      backgroundColor: "#6366F1", // Indigo background for line points
      fill: true,
    },
  ],
};

const studentsEnrolledData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Number of Students Enrolled",
      data: [200, 250, 300, 350, 400, 500],
      backgroundColor: "#F472B6", // Pink background for bar
    },
  ],
};

const revenueGeneratedData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Revenue Generated",
      data: [1000, 2000, 3000, 4000, 4500, 5000],
      backgroundColor: "#10B981", // Green background for bar
    },
  ],
};

const courseCompletionData = {
  labels: ["Course A", "Course B", "Course C"],
  datasets: [
    {
      label: "Completion Rate",
      data: [85, 70, 90],
      backgroundColor: ["#4F46E5", "#F472B6", "#10B981"], // Different colors for each course
    },
  ],
};

// Framer Motion animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

function Status() {
  // Calculate total revenue
  const totalRevenue = revenueGeneratedData.datasets[0].data.reduce(
    (a, b) => a + b,
    0
  );

  return (
    <motion.div
      className="p-8 bg-gray-100 min-h-screen flex flex-col gap-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Total Profit Section */}
      <div className="bg-white p-5 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-2">Total Profit</h2>
        <p className="text-4xl text-green-600">${totalRevenue}</p>
      </div>

      {/* Grid layout for charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Hours of Courses Watched Chart */}
        <motion.div
          className="bg-white p-5 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold mb-4">
            Hours of Courses Watched
          </h2>
          <Line data={courseHoursData} />
        </motion.div>

        {/* Number of Students Enrolled Chart */}
        <motion.div
          className="bg-white p-5 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold mb-4">
            Number of Students Enrolled
          </h2>
          <Bar data={studentsEnrolledData} />
        </motion.div>

        {/* Revenue Generated Chart */}
        <motion.div
          className="bg-white p-5 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold mb-4">Revenue Generated</h2>
          <Bar data={revenueGeneratedData} />
        </motion.div>

        {/* Course Completion Rates Chart */}
        <motion.div
          className="bg-white p-5 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold mb-4">
            Course Completion Rates
          </h2>
          <Doughnut data={courseCompletionData} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Status;
