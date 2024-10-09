import React from "react";
import SwiperCS from "../SwiperCS";
import Link from "next/link";

const dummyCourses = [
  {
    id: 0,
    name: "AWS certified solutions architect",
    img: "/imgs/im2.jpg",
    owner: "vira",
    ownerImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    category: "design",
    time: "3 mounthes",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus perferendis molestias quibusdam. Harum, reprehenderit. Exercitationem!",
    price: 100,
    discountPercentage: 20,
  },
  {
    id: 1,
    name: "AWS certified solutions architect",
    img: "/imgs/im4.jpg",
    owner: "vira",
    ownerImg: "/imgs/study place.jpg",
    category: "design",
    time: "3 mounthes",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus perferendis molestias quibusdam. Harum, reprehenderit. Exercitationem!",
    price: 100,
    discountPercentage: 20,
  },
  {
    id: 2,
    name: "AWS certified solutions architect",
    img: "/imgs/study place.jpg",
    owner: "vira",
    ownerImg: "/imgs/study place.jpg",
    category: "design",
    time: "3 mounthes",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus perferendis molestias quibusdam. Harum, reprehenderit. Exercitationem!",
    price: 100,
    discountPercentage: 20,
  },
  {
    id: 3,
    name: "AWS certified solutions architect",
    img: "/imgs/im2.jpg",
    owner: "vira",
    ownerImg: "/imgs/study place.jpg",
    category: "design",
    time: "3 mounthes",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus perferendis molestias quibusdam. Harum, reprehenderit. Exercitationem!",
    price: 100,
    discountPercentage: 20,
  },
  {
    id: 4,
    name: "AWS certified solutions architect",
    img: "/imgs/im4.jpg",
    owner: "vira",
    ownerImg: "/imgs/study place.jpg",
    category: "design",
    time: "3 mounthes",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus perferendis molestias quibusdam. Harum, reprehenderit. Exercitationem!",
    price: 100,
    discountPercentage: 20,
  },
  {
    id: 5,
    name: "AWS certified solutions architect",
    img: "/imgs/study place.jpg",
    owner: "vira",
    ownerImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    category: "design",
    time: "3 mounthes",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus perferendis molestias quibusdam. Harum, reprehenderit. Exercitationem!",
    price: 100,
    discountPercentage: 20,
  },
];

function Recommended() {
  return (
    <section className="bg-primary-background flex flex-col gap-3 py-6">
      <div className="flex justify-between px-2 md:px-6 lg:px-8">
        <h2 className="text-3xl font-bold ml-5 self-center sm:self-start">
          Recommended for you
        </h2>

        <Link
          href="recommended"
          className="text-primary hover:text-primary-100"
        >
          See all{" "}
        </Link>
      </div>

      <div>
        <SwiperCS slides={dummyCourses} componentName="normalCourse" />
      </div>
    </section>
  );
}

export default Recommended;
