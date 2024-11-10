import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="font-black text-8xl">
        <span className="text-darkaqua">4</span>
        <span className="text-mediumaqua">0</span>
        <span className="text-lightaqua">4</span></h1>
      <h2 className="font-medium text-xl text-gray-500 text-center">Halaman yang Anda cari tidak ditemukan!</h2>
      <h3 className="font-light text-gray-500 mt-4">Coba lagi!</h3>
      <Link href="/dashboard">
        <button className="w-56 border mt-8 py-2 px-4 cursor-pointer custom-landing-button rounded-md bg-darkaqua text-lg text-white border-none">Kembali ke Dashboard</button>
      </Link>
    </div>
  )
}

export default NotFound