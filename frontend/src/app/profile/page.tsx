import React from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User } from 'lucide-react';

const Profile = () => {
  return (
    <div className="w-full">
      <nav className="bg-[#00B7B7] p-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <a href="/" className="text-white text-2xl font-bold">
            e-KAN
          </a>
          <div className="flex space-x-6">
            <a href="/" className="text-white hover:text-gray-200">
              Home
            </a>
            <a href="/kategori" className="text-white hover:text-gray-200">
              Kategori
            </a>
            <a href="/tentang-kami" className="text-white hover:text-gray-200">
              Tentang Kami
            </a>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search Item"
              className="px-3 py-1 rounded-md w-72 bg-[#80DCDC] text-white placeholder-white text-sm focus:outline-none"
            />
            <Search className="absolute right-2 text-white w-4 h-4" />
          </div>
          <ShoppingCart className="text-white w-5 h-5 cursor-pointer" />
          <User className="text-white w-5 h-5 cursor-pointer" />
        </div>
      </nav>

     
      <div className="relative">
        <div className="absolute w-full h-40 bg-[#00B7B7]">
          <div className="absolute -bottom-1 w-full">
            <svg
              viewBox="0 0 1440 200"
              className="w-full"
              preserveAspectRatio="none"
              height="150"
            >
              <path
                fill="#ffffff"
                d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,200L1380,200C1320,200,1200,200,1080,200C960,200,840,200,720,200C600,200,480,200,360,200C240,200,120,200,60,200L0,200Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      
      <div className="mt-16 flex flex-col items-center">
        <div className="w-28 h-28 rounded-full bg-gray-200 border-4 border-[#00B7B7] flex items-center justify-center">
          <User className="w-14 h-14 text-gray-400" />
        </div>
        <h2 className="mt-3 text-lg font-medium">John Doe</h2>
        <p className="text-gray-500 text-sm mt-1">pembeli</p>

        
        <div className="mt-8 flex w-full max-w-xl justify-center border-b border-gray-200">
          <button className="px-8 py-2 text-white bg-[#008080] font-medium rounded-t-lg">
            Akun Saya
          </button>
          <button className="px-8 py-2 text-gray-600 hover:bg-gray-50">
            Pesanan Saya
          </button>
          <button className="px-8 py-2 text-gray-600 hover:bg-gray-50">
            Riwayat Beli
          </button>
        </div>


        <div className="w-full max-w-xl min-h-[400px] p-6">
        </div>
      </div>
    </div>
  );
};

export default Profile;