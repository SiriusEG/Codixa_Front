"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaUsers, FaClock, FaChartLine, FaDollarSign } from "react-icons/fa";

const mockData = {
  totalStudents: 1452,
  engagementRate: 68,
  completionRate: 42,
  totalEarnings: 25480,
  progressData: [
    { day: "Mon", students: 400 },
    { day: "Tue", students: 600 },
    { day: "Wed", students: 800 },
    { day: "Thu", students: 550 },
    { day: "Fri", students: 900 },
    { day: "Sat", students: 750 },
    { day: "Sun", students: 300 },
  ],
  courseRatings: [
    { name: "Content", value: 4.8 },
    { name: "Teaching", value: 4.7 },
    { name: "Support", value: 4.5 },
    { name: "Value", value: 4.6 },
  ],
  recentStudents: [
    {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      progress: 65,
      joined: "2024-03-15",
    },
    {
      name: "Mike Chen",
      email: "mike@example.com",
      progress: 42,
      joined: "2024-03-14",
    },
    {
      name: "Emma Wilson",
      email: "emma@example.com",
      progress: 88,
      joined: "2024-03-13",
    },
    {
      name: "David Kim",
      email: "david@example.com",
      progress: 35,
      joined: "2024-03-12",
    },
  ],
};

export default function Status() {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-3xl font-bold mt-2">
                {mockData.totalStudents}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FaUsers className="text-primary-100 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Engagement Rate</p>
              <p className="text-3xl font-bold mt-2">
                {mockData.engagementRate}%
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FaChartLine className="text-primary-100 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="text-3xl font-bold mt-2">
                {mockData.completionRate}%
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FaClock className="text-primary-100 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Student Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#01623c"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Course Ratings</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.courseRatings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="value" fill="#01623c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Students Table */}
    </div>
  );
}
