import React from 'react'
import dynamic from 'next/dynamic';

const IoIosSearch = dynamic(() => import("react-icons/io").then((mod) => mod.IoIosSearch), { ssr: false });

const ButtonStyle = () => {
  return (
    <div className='flex items-center justify-center'>
        <button className="btn font-bold gap-2" type="button">
        <IoIosSearch className='w-5 h-5 text-accent dark:text-accentDark' />
        <span className='text-accent dark:text-accentDark text-sm uppercase '>
            Istraži
        </span>
        <div id="container-stars">
          <div id="stars"></div>
       </div>
     <div id="glow">
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
      </button>
    </div>
  )
}

export default ButtonStyle