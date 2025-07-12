"use client";
import { FaPlayCircle, FaStar, FaUsers, FaCertificate } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const AnimatedNumber = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  // Move number formatting to client-side only
  const formattedCount =
    typeof window !== "undefined" ? count.toLocaleString() : "0"; // Use plain '0' during server rendering

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [value]);

  return (
    <span ref={countRef}>
      {formattedCount}
      {suffix}
    </span>
  );
};

const CourseHomePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Get token from localStorage or environment variable
        const token =
          localStorage.getItem("authToken") ||
          process.env.NEXT_PUBLIC_API_TOKEN;

        const response = await fetch(
          "https://codixa.runasp.net/api/Courses/GetLastCourses",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message);
        // Fallback to default courses if API fails
        setCourses([
          {
            courseId: 1,
            courseName: "Digital Marketing Mastery",
            courseDescription: "Become a digital marketing expert from scratch",
            courseCardPhotoFilePath:
              "https://i.pinimg.com/474x/a0/95/cd/a095cda32b2e721db20551b17e488d52.jpg",
            level: 3,
            language: 0,
          },
          {
            courseId: 2,
            courseName: "Web Development Bootcamp",
            courseDescription: "Full-stack development career path",
            courseCardPhotoFilePath:
              "https://i.pinimg.com/474x/22/bc/8e/22bc8ebef610eb881071e1a7007a7a80.jpg",
            level: 3,
            language: 0,
          },
          {
            courseId: 3,
            courseName: "Graphic Design Pro",
            courseDescription: "Master professional design tools",
            courseCardPhotoFilePath:
              "https://i.pinimg.com/474x/45/27/9b/45279bf5fade53b05ed0a36535740576.jpg",
            level: 3,
            language: 0,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Rest of the component remains the same
  const features = [
    {
      icon: <FaPlayCircle className="w-8 h-8 text-primary" />,
      title: "Practical Video Lessons",
      description: "Learn by doing with hands-on projects",
    },
    {
      icon: <GiTeacher className="w-8 h-8 text-primary" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals",
    },
    {
      icon: <FaCertificate className="w-8 h-8 text-primary" />,
      title: "Certification",
      description: "Earn valuable credentials",
    },
    {
      icon: <FaUsers className="w-8 h-8 text-primary" />,
      title: "Community Support",
      description: "Join our learning network",
    },
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative min-h-[700px] bg-gradient-to-br from-primary/20 via-purple-100/30 to-primary/5 overflow-hidden">
        {/* Floating Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-8 h-8 border-2 border-primary/50 rounded-lg animate-spin-slow"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-primary/50 rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-20 left-1/4 w-10 h-10 border-2 border-purple-400/30 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-primary/50 rounded-lg animate-bounce-slow"></div>
          {/* Additional floating shapes */}
          <div className="absolute bottom-32 right-1/4 w-6 h-6 bg-purple-400/30 rounded-full animate-float-slow"></div>
          <div className="absolute top-1/4 left-1/3 w-12 h-12 border-2 border-primary/50 rounded-lg rotate-45 animate-spin-reverse-slow"></div>
          <div className="absolute top-2/3 right-1/5 w-8 h-8 bg-primary/50 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 left-20 w-4 h-4 bg-purple-400/40 rounded-lg animate-bounce-slow delay-500"></div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 h-full">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between h-full gap-8 py-0">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="w-full md:w-1/2 text-center md:text-left space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                <motion.span
                  className="absolute -left-4 -top-4 w-12 h-12 bg-red-200/50 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <motion.span
                    className="bg-gradient-to-r from-primary to-primary-100 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    Unlock
                  </motion.span>{" "}
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="relative"
                  >
                    Your{" "}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="bg-gradient-to-r from-primary-100 to-primary bg-clip-text text-transparent"
                  >
                    Potential
                  </motion.span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-xl md:text-2xl text-gray-600/90 drop-shadow-sm"
              >
                Discover new skills with our comprehensive courses
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <Link
                  href="/courses"
                  className="relative px-8 py-3 bg-gradient-to-r from-primary to-primary-100 text-white rounded-full text-lg font-semibold 
                           hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 
                           hover:translate-y-[-2px] active:translate-y-[1px]"
                >
                  <motion.span
                    className="absolute inset-0 rounded-full bg-white/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="relative">Explore Courses</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Image with enhanced animation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="w-full md:w-1/2"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/imgs/bg1.png"
                  alt="Learning Illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto "
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Wave Shape Divider */}
        <div className="absolute bottom-0 left-0 w-full -mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 "
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the best online learning platform with our unique
              features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 text-center hover:shadow-md group rounded-xl transition-all duration-300 "
              >
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 bg-primary/10 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white rounded-xl shadow-lg flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary/60 mb-2 block">
                  Feature {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold mb-3transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-gray-100">
            {[
              { value: 1000, label: "Active Students", suffix: "+" },
              { value: 50, label: "Expert Instructors", suffix: "+" },
              { value: 200, label: "Courses", suffix: "+" },
              { value: 95, label: "Success Rate", suffix: "%" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center group"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <motion.div
                    className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-100 bg-clip-text text-transparent mb-2"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </motion.div>
                  <div className="absolute -inset-2 bg-primary/5 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                <p className="text-gray-600 font-medium relative z-10">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start your learning journey with our most popular courses
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">
                Error loading courses: {error}
              </p>
              <p className="text-gray-600">Showing fallback courses</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course.courseId || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group"
                >
                  <div className="relative h-[280px] rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={
                        course.courseCardPhotoFilePath
                          ? course.courseCardPhotoFilePath.startsWith("http")
                            ? course.courseCardPhotoFilePath
                            : `https://codixa.runasp.net/${course.courseCardPhotoFilePath.replace(
                                /\\/g,
                                "/"
                              )}`
                          : "https://via.placeholder.com/400x280?text=Course+Image"
                      }
                      alt={course.courseName}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <Link
                          href={`coursedetail/${course.courseId}`}
                          className="block w-full py-3 bg-white text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors duration-300 text-center"
                        >
                          Enroll Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-4 py-1.5 bg-primary/5 text-primary rounded-full text-sm font-medium">
                      Level {course.level || 1}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <FaStar className="mr-1" />
                      <span className="font-semibold">4.8</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 transition-colors">
                    {course.courseName}
                  </h3>
                  <p className="text-gray-600">{course.courseDescription}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse-slow {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -10px);
          }
          50% {
            transform: translate(0, -20px);
          }
          75% {
            transform: translate(-10px, -10px);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 8s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default CourseHomePage;
