import Image from 'next/image'
import React from 'react'

function HomeFirstSection() {
  return (
    <section className='bg-primary/20 grid grid-cols-2 rounded-lg gap-8 px-4 py-12'>
        <div className='col-span-2 md-col-span-1 flex items-start justify-center gap-6 flex-col'>
        <h4 className='text-2xl'>
        By Themadbrains in <span className='text-primary font-semibold'>inspiration</span>
        </h4>

        <h2 className='text-5xl font-semibold text-secondary'>why should ui be on every the radar of every mobile developer</h2>

        <p className='text-gray-500 text-lg font-semibold'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium earum expedita nesciunt architecto quae aliquid a soluta ipsam! Vitae asperiores et tempore, consectetur magni alias.
        </p>
        </div>

        <div className='flex  justify-end relative col-span-2 md-col-span-1'>
            <div className="absolute bg-transparent rounded-full border-4 border-primary -top-6 right-0 w-[420px] h-[420px]"></div>
            <div className="absolute bg-transparent rounded-full border-4 border-primary -top-4 right-8 w-[420px] h-[420px]"></div>

        <Image src='/home-first-sec.png' alt='first-sec-image' width={2000} height={2000} className=' h-[352px] relative z-10 w-[411px]' />
        </div>

    </section>
  )
}

export default HomeFirstSection