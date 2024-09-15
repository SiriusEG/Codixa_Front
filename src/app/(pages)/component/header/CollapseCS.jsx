"use client"

import React, { useState } from 'react'
import NavListCS from './NavListCS';

function CollapseCS({children}) {
    const [isOpen,setIsOpen] = useState(true)
  return (
    <>
        <div onClick={()=>setIsOpen(!isOpen)} className="hidden">
        {children}
        </div>

    <div className="hidden"> 
        <NavListCS/>
    </div>
    </>
  )
}

export default CollapseCS