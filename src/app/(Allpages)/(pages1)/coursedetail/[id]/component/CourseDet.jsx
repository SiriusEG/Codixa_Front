"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  FaCamera,
  FaFacebook,
  FaFileAlt,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";
import { GiCircularSawblade } from "react-icons/gi";
import { BsGraphUp } from "react-icons/bs";
import Link from "next/link";

import Comment from "./Comment";
import Raiting from "./Raiting";

export default function CourseDet() {
  const [activeTab, setActiveTab] = useState("Overview");
  return (
    <>
      <section className="container flex xl:flex-nowrap md:flex-nowrap flex-wrap gap-[3rem] justify-evenly items-center relative pb-20">
        <div className="w-full md:w-[43.75rem] xl:w-[59.375rem] h-[47.75rem]">
          <div className="flex gap-4 mb-10">
            <Link
              href="#"
              scroll={false}
              className={`py-2 px-4 rounded-lg ${
                activeTab === "Overview"
                  ? "bg-primary text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setActiveTab("Overview")}
            >
              Overview
            </Link>
            <Link
              href="#"
              scroll={false}
              className={`py-2 px-4 rounded-lg ${
                activeTab === "Comments"
                  ? "bg-primary text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setActiveTab("Comments")}
            >
              comments
            </Link>
          </div>
          <div className=" bg-[rgba(157,204,255,0.3)] p-8 rounded-3xl  mb-20">
            {activeTab === "Overview" && (
              <>
                <Raiting />
                <Comment />
              </>
            )}
            {activeTab === "Comments" && (
              <>
                <Comment />
              </>
            )}
          </div>
        </div>

        <div className="w-full md:w-[20.75rem] xl:w-[31.3125rem] rounded-3xl bg-white relative bottom-[8rem] order-first md:order-last xl:order-last">
          <div className="inner p-4">
            <div className="text-center">
              <Image
                src="/logo.gif"
                width={200}
                height={200}
                alt=""
                className="w-[27.0625rem] "
              />
              <div className="flex justify-between items-center text-xl font-bold"></div>
              <button className="w-full h-[3.125rem] bg-primary text-white rounded-lg">
                Send a request now
              </button>
            </div>

            <div className="border-y-2 my-4 b- ">
              <p className="text-2xl font-bold py-4">this course included</p>
              <p className="">
                {" "}
                <span className="mr-2">
                  <FaCamera className="inline text-primary" />
                </span>
                access in all devices
              </p>
              <p>
                <span className="mr-2">
                  <FaFileAlt className="inline text-primary" />
                </span>
                certification of complation
              </p>
              <p className="pb-4">
                <span className="mr-2">
                  <BsGraphUp className="inline text-primary" />
                </span>
                32 models
              </p>
            </div>

            <div className="border-b-2">
              <p className="text-2xl font-bold py-4">
                Training 5 or more people
              </p>
              <p className="pb-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Accusamus quas aliquid adipisci omnis, officiis repudiandae.
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold py-4">share this course</p>
              <Link href="#">
                <IoLogoTwitter className="inline  w-[2rem] h-[2rem] rounded-full mx-2 bg-gray-700 p-1 text-white" />
              </Link>
              <Link href="#">
                <FaFacebook className="inline w-[2rem] h-[2rem] rounded-full mx-2 bg-gray-700 p-1 text-white" />
              </Link>
              <Link href="#">
                <FaYoutube className="inline  w-[2rem] h-[2rem] rounded-full mx-2 bg-red-700 p-1 text-white" />
              </Link>
              <Link href="#">
                {" "}
                <FaInstagram className="inline  w-[2rem] h-[2rem] rounded-full mx-2 bg-gray-700 p-1 text-white" />
              </Link>
              <Link href="#">
                <FaTelegramPlane className="inline  w-[2rem] h-[2rem] rounded-full mx-2 bg-gray-700 p-1 text-white" />
              </Link>
              <Link href="#">
                {" "}
                <FaLinkedin className="inline  w-[2rem] h-[2rem] rounded-full mx-2 bg-gray-700 p-1 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
