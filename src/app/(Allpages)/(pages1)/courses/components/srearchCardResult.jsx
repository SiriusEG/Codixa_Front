"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaPenFancy, FaArrowRight } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import Link from "next/link";

function SearchResultCard() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Dummy data array
    const dummyData = [
      {
        id: 1,
        name: "AWS certified solutions architect",
        img: "/imgs/study place.jpg",
        owner: "Vira",
        ownerImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
        category: "Design",
        time: "3 months",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus perferendis molestias quibusdam. Harum, reprehenderit. Exercitationem!",
        price: 100,
        discountPercentage: 20,
      },
      {
        id: 2,
        name: "Data Science 101",
        img: "/imgs/study place.jpg",
        owner: "John",
        ownerImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG9kP7OqV2IbSVAZltfxcQW7hbElVZjgpNG8M&s",
        category: "Technology",
        time: "4 months",
        desc: "This course introduces you to data science concepts and tools. It covers everything from basic statistics to machine learning.",
        price: 120,
        discountPercentage: 15,
      },
      {
        id: 3,
        name: "Full Stack Web Development",
        img: "/imgs/study place.jpg",
        owner: "Alice",
        ownerImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5UjM87V8VnvO5hgg-JXK9NYggbPt9z06_XsQ&s",
        category: "Programming",
        time: "6 months",
        desc: "Master both front-end and back-end technologies. Learn JavaScript, React, Node.js, and more!",
        price: 150,
        discountPercentage: 10,
      },
      {
        id: 4,
        name: "Introduction to Machine Learning",
        img: "/imgs/study place.jpg",
        owner: "Bob",
        ownerImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeWzmtvOwXfql5nzqf_6yOirAVV9a4eQUbzK4&s",
        category: "AI & ML",
        time: "3 months",
        desc: "An introductory course to machine learning concepts, tools, and algorithms for beginners.",
        price: 110,
        discountPercentage: 25,
      },
      {
        id: 5,
        name: "Cyber Security Basics",
        img: "/imgs/study place.jpg",
        owner: "Sara",
        ownerImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDtQ5cC1A5uYYHR1dVtTZvZUpOxOcbkk5nRlA&s",
        category: "Security",
        time: "5 months",
        desc: "Learn the fundamentals of cybersecurity and protect yourself and your data online.",
        price: 130,
        discountPercentage: 18,
      },
      {
        id: 6,
        name: "Digital Marketing Mastery",
        img: "/imgs/study place.jpg",
        owner: "Tom",
        ownerImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkxLO_7mK0jys6f5tvH25o_xkLfCtttEK7c8Q&s",
        category: "Marketing",
        time: "2 months",
        desc: "Become an expert in digital marketing strategies including SEO, content marketing, and paid ads.",
        price: 90,
        discountPercentage: 30,
      },
    ];

    // Set dummy data to results
    setResults(dummyData);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Search Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.length === 0 ? (
          <p className="text-gray-600">Loading results...</p>
        ) : (
          results.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={item.img}
                  alt={`${item.name} image`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
                <div className="absolute top-2 right-2 bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
                  {item.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.ownerImg}
                      alt={item.owner}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    />
                    <span className="text-gray-600 text-sm">{item.owner}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <CiTimer className="mr-1 text-lg" />
                    {item.time}
                  </div>
                </div>

                <Link href={`/courses/${item.id}`}>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.desc}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <del className="text-gray-400 text-sm">
                      ${item.price.toFixed(2)}
                    </del>
                    <span className="text-2xl font-bold text-primary">
                      $
                      {calculateDiscountedPrice(
                        item.price,
                        item.discountPercentage
                      ).toFixed(2)}
                    </span>
                  </div>
                  <Link
                    href={`/courses/${item.id}`}
                    className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    <span className="mr-2">View Course</span>
                    <FaArrowRight className="text-sm" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function calculateDiscountedPrice(originalPrice, discountPercentage) {
  return originalPrice * (1 - discountPercentage / 100);
}

export default SearchResultCard;
