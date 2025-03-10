"use client";
import { FaPlayCircle, FaStar, FaUsers, FaCertificate } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CourseHomePage = () => {
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

  const courses = [
    {
      title: "Digital Marketing Mastery",
      image:
        "https://i.pinimg.com/474x/a0/95/cd/a095cda32b2e721db20551b17e488d52.jpg",
      description: "Become a digital marketing expert from scratch",
      lessons: 32,
      rating: 4.8,
    },
    {
      title: "Web Development Bootcamp",
      image:
        "https://i.pinimg.com/474x/22/bc/8e/22bc8ebef610eb881071e1a7007a7a80.jpg",
      description: "Full-stack development career path",
      lessons: 45,
      rating: 4.9,
    },
    {
      title: "Graphic Design Pro",
      image:
        "https://i.pinimg.com/474x/45/27/9b/45279bf5fade53b05ed0a36535740576.jpg",
      description: "Master professional design tools",
      lessons: 28,
      rating: 4.7,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="relative h-[700px]">
        <div
          className="absolute inset-0 bg-cover bg-center rounded-md"
          style={{
            backgroundImage: "url('https://codixa.runasp.net/uploads/3.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.5)",
          }}
        ></div>
        <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Unlock Your Potential
            </h1>
            <p className="text-2xl mb-8 text-gray-200">
              Discover new skills with our comprehensive courses
            </p>
            <Link
              href="/courses"
              className="px-8 py-3 bg-white text-primary rounded-full text-lg font-semibold hover:bg-gray-200 transition"
            >
              Explore Courses
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 text-center"
              >
                <div className="mb-4 text-primary">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-primary">
                      <FaStar className="mr-1" />
                      <span>{course.rating}</span>
                    </div>
                    <span className="text-gray-600">
                      {course.lessons} lessons
                    </span>
                  </div>
                  <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-100 transition">
                    Enroll Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseHomePage;
