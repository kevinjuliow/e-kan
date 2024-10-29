"use client"

import React, { useEffect, useState } from 'react'

const Landing = () => {
  const [absolute, setAbsolute] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setAbsolute(true);
      } else {
        setAbsolute(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <div className="w-full flex items-center justify-center mt-24 h-[600px]">
      <div className={`bgmain-wave ${absolute ? 'absolute' : 'fixed'}`}></div>
      <div className="max-w-screen-xl w-full h-full p-8 lg:px-0 flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-black text-white">Masa Depan Budidaya Ikan</h1>
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-black text-white">Dimulai di sini</h1>
        <div>
          <svg className="relative right-8 bottom-1 md:right-16 md:bottom-1 lg:right-20 lg:bottom-2 w-[90px] md:w-[180px] lg:w-[220px]" viewBox="0 0 280 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.00028 25.4999V25.4999C86.6992 5.32132 172.285 -0.272798 256.907 8.96916L275.5 10.9998" stroke="#F6B50E" strokeWidth="8" strokeLinecap="round"/>
          </svg>
        </div>
        <a href="/dashboard">
          <button className="w-60 border mt-8 py-2 px-4 cursor-pointer custom-landing-button rounded-md bg-darkaqua text-xl text-white border-none">Jelajahi Produk Sekarang</button>
        </a>
      </div>
    </div>
  )
}

export default Landing