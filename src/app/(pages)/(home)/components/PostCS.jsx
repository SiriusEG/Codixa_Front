"use client";

import React from "react";
import { FaEye } from "react-icons/fa";

const dummyData = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/564x/bc/e4/cd/bce4cd39bc29b28192f3bdccea342a3b.jpg",
    title: "Sample Post Title",
    publisherAvatar:
      "https://i.pinimg.com/564x/05/3b/c6/053bc6114fcc054b3985c050fdcba094.jpg",
    publisherName: "John Doe",
    views: 123,
    description:
      "This is a short description for the post. It provides a brief overview of the content.",
    readMoreHref: "#",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/564x/d3/d5/a3/d3d5a3e259ee8ca212d85f07e92c16cd.jpg",
    title: "Sample Post Title",
    publisherAvatar:
      "https://i.pinimg.com/564x/05/3b/c6/053bc6114fcc054b3985c050fdcba094.jpg",
    publisherName: "John Doe",
    views: 123,
    description:
      "This is a short description for the post. It provides a brief overview of the content.",
    readMoreHref: "#",
  },
];

const PostCS = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden pb-4 pt-3 transition-trans form transform hover:scale-102  border-[1px] duration-500 w-[40rem]">
      <div className="relative w-full h-[25rem]">
        <img
          src={post.image}
          alt={post.title}
          className="absolute top-0 left-0 w-full h-full object-cover  p-5 mb-2"
          style={{ borderRadius: "4rem" }}
        />
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-3 text-center">{post.title}</h2>

        <div className="flex items-center space-x-3 mb-10 mt-3">
          <img
            src={post.publisherAvatar}
            alt={post.publisherName}
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <div>
            <p className="text-lg font-semibold">{post.publisherName}</p>
            <p className="text-sm text-gray-500">Publisher</p>
          </div>
        </div>

        <p className="text-gray-700 mb-4 mt-2 opacity-60 h-[75px] line-clamp-3 overflow-hidden">
          {post.description}
        </p>

        <div className="flex items-center justify-between text-gray-600 pt-3 pb-4">
          <a
            href={post.readMoreHref}
            className="text-blue-600   transition-colors hover:scale-[105%] duration-600 "
          >
            Read More
          </a>
          <div className="flex items-center space-x-1">
            <FaEye className="text-primary" />
            <span>{post.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostCSblogList = () => {
  return (
    <div className=" p-0 flex flex-row flex-wrap gap-4 justify-center items-center py-8">
      {dummyData.map((post) => (
        <PostCS key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostCSblogList;
