import React from 'react'
import { RiStarSFill } from "react-icons/ri";

export default function Raiting() {
  return <>
  <section className='flex justify-between items-center mb-10'>
    <div className='bg-white rounded-2xl p-4'>
        <h2 className='text-2xl font-bold text-[rgba(0,0,0,0.5)]'>4 out of 5</h2>
        <div className='flex text-[#FDB022] py-2'>
        <RiStarSFill  />
        <RiStarSFill />
        <RiStarSFill />
        <RiStarSFill />
        <RiStarSFill />
        </div>
        <p className='text-[rgba(0,0,0,0.5)]'>Top raiting</p>
    </div>
    <div className='text-[rgba(0,0,0,0.5)]'>
        <p>5 stars </p>
        <p>4 stars </p>
        <p>3 stars </p>
        <p>2 stars </p>
        <p>1 stars </p>
    </div>
  </section>
  </>
}
