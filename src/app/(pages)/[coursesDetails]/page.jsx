import Image from 'next/image'
import React from 'react'
import Headersec from './component/headersec/Headersec'
import CourseDet from './component/courseDet/CourseDet'




export default function coursesDetails({ element: course }) {
  return <>
 <section className='relative'>
 <Headersec/>
 <CourseDet element={course}/>
 </section>
  </>
}
