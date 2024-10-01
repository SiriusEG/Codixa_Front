import React from 'react'
import { RiStarSFill } from "react-icons/ri";
import ProgressBar from '../progressbar/Progressbar';

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
    <div className='text-[rgba(0,0,0,0.5)] flex flex-col justify-center items-center'>
        <p className='text-nowrap'>5 stars</p>
        <p className='text-nowrap'>4 stars</p>
        <p className='text-nowrap'>3 stars</p>
        <p className='text-nowrap'>2 stars</p>
        <p className='text-nowrap'>1 stars</p>
    </div>


    <div className='flex flex-col justify-center items-center xl:w-[34.25rem] 2xl:w-[28.25rem] w-[20rem] gap-4'>
    <ProgressBar/>
    <ProgressBar/>
    <ProgressBar/>
    <ProgressBar/>
    <ProgressBar/>
    </div>
  </section>
  </>
}
