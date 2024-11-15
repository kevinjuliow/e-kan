import Link from 'next/link'
import React from 'react'

const BackButton = () => {
  return (
    <div className="absolute top-[-20px] left-0 px-8 lg:px-0">
      <Link href={"/dashboard"} className="flex items-center justify-start font-bold text-gray-500 w-full">
        <svg className="me-2" width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="2" fill="none" xmlns="http://www.w3.org/2000/svg" color="#6b7280">
          <path d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        Kembali
      </Link>
    </div>
  )
}

export default BackButton