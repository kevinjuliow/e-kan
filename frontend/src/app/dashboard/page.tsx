"use client"

import ShowItem from 'app/components/item/ShowItem'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const searchParams = useSearchParams();
  const searchQueryParams = searchParams.get('search') || ''; // Mengambil query 'search' atau default empty string
  
  const handleSearch = () => {
    router.push(`/dashboard?search=${searchQuery}`);
  };

  useEffect(() => {
    router.refresh() // refresh page automatically
  })

  return (
    <div className="w-full flex items-center justify-center mt-24">
      <div className={`bgdashboard-wave`}></div>
      <div className="max-w-screen-xl w-full h-full p-8 xl:px-0 flex flex-col items-center justify-center">
        <div className="relative w-full md:w-[50%] flex items-center justify-center text-white border-none">
          <div className="absolute inset-y-0 start-0 flex items-center px-4">
            <svg width="20px" height="20px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff">
              <path d="M17 17L21 21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <input onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} className="w-full px-4 py-4 ps-12 text-base rounded-lg bg-darkaqua focus:outline-none" placeholder="Cari ikan di sini..." required />
          <button onClick={handleSearch} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-mediumaqua font-medium rounded-lg text-sm px-4 py-2">Cari</button>
        </div>
        <ShowItem searchQuery={searchQueryParams} />
      </div>
    </div>
  )
}

export default Dashboard