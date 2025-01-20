"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaPenFancy } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import Link from "next/link";

function SearchResultCard() {
  // Dummy data with 6 results
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Dummy data for now
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
  }, []);

  return (
    <div className="w-[100%]  p-3 border-l-[1.5px] border-l-[#F2EED7] rounded-md">
      <h2 className="font-bold text-lg mb-2">Query Results</h2>
      <div className="grid grid-cols-3  gap-1">
        {/* Example Result Items */}
        {results.length === 0 ? (
          <p>Loading results...</p>
        ) : (
          results.map((item) => (
            <div key={item.id} className="p-2 border rounded-md">
              <div className="flex flex-col gap-4 p-2 bg-white rounded-xl shadow-xl">
                <Image
                  width={1500}
                  height={1000}
                  src={item.img}
                  alt={`${item.name} image`}
                  className="w-[334px] h-[236px] rounded-2xl"
                />

                <div className="flex items-center justify-between text-gray-500">
                  <p className="text-sm">
                    <FaPenFancy className="inline" /> {item.category}
                  </p>
                  <p className="text-sm">
                    <CiTimer className="inline" /> {item.time}
                  </p>
                </div>

                <Link href={`/resultDetails/${item.id}`}>
                  <h5 className="mb-2 text-2xl font-medium text-gray-900">
                    {item.name}
                  </h5>
                </Link>

                <p className="mb-2 text-lg font-normal text-gray-900">
                  {item.desc}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.ownerImg}
                      alt={item.owner}
                      className="w-5 h-5 rounded-full"
                    />
                    <p>{item.owner}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <del className="text-base font-light italic text-gray-500">
                      ${item.price}
                    </del>
                    <p className="text-2xl font-bold text-primary">
                      $
                      {calculateDiscountedPrice(
                        item.price,
                        item.discountPercentage
                      )}
                    </p>
                  </div>
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
  const discount = discountPercentage / 100;
  const finalPrice = originalPrice * (1 - discount);
  return finalPrice;
}

export default SearchResultCard;
