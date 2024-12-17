"use client"

import React, { useEffect, useState } from 'react'
import { BoxIcon, InternetIcon, MapIcon } from 'app/components/icon'
import ArrowBackButton from 'app/components/button/ArrowBackButton'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import PenjualProduct from 'app/components/product/PenjualProduct'
import { PenjualData } from 'app/interfaces/Item/types'
import Link from 'next/link'

interface ParameterId {
  params: {
    penjualId: string
  }
}

const PublicPenjualProfile: React.FC<ParameterId> = ({ params }) => {
  console.log(params.penjualId)
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState<string | 'produk'>('produk')
  const [penjualData, setPenjualData] = useState<PenjualData | null>(null)
  const [penjualImage, setPenjualImage] = useState<string | null>(null)

  const fetchPenjualData = async () => {
    try {
      const response = await axios.get(`${process.env.API_BASEURL}/api/penjual/${params.penjualId}`);

      const data = response.data.data

      setPenjualData(data ?? null)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
      }
    }
  }

  const fetchPenjualImage = async () => {
      if (session?.accessToken) {
        try {
          const imageResponse = await axios.get(`${process.env.API_BASEURL}/api/profile-picture/penjual/${params.penjualId}`, {
            // telling axios that the server's response isn't a normal JSON or text-based response, but rather a binary large object (Blob)
            responseType: 'blob'
          })
      
          if (!imageResponse) {
            throw new Error('Some error occurred when fetching an image!');
          }
      
          // Converts Blob into URL
          const imageUrl = URL.createObjectURL(imageResponse.data);
      
          setPenjualImage(imageUrl ?? null)
        } catch (error) {
          if (error instanceof Error) {
            console.log(error)
          }
        }
      }
    };
  
    useEffect(() => {
      if (session?.accessToken) {
        fetchPenjualData()
        fetchPenjualImage()
        console.log("fetch data user RUN ONCE")
      }
    }, [session]);

  return (
    <>
    <div className="w-full flex items-center justify-center mt-24">
      <div className={`bgdashboard-wave`}></div>
      <div className="max-w-screen-md w-full h-full relative p-8 xl:px-0 flex flex-col items-center justify-center">
        <div className="flex items-center mb-4 w-full">
          <ArrowBackButton url={"/dashboard"} size={20} hexColor={"#1f2937"} />
          <h1 className="text-2xl font-bold text-left w-full ms-2">Penjual</h1>
        </div>

        <div className="w-full flex items-start mt-4">
          <div className="relative">
            <img src={penjualImage ?? '/default_profile.png'} alt="profile image" className="rounded-full border-2 border-darkaqua w-full max-w-40 h-auto" />
          </div>
          <div className="ms-4 mt-2 w-full flex flex-col">
            <h1 className="font-bold text-xl md:text-3xl">{penjualData?.nama}</h1>
            <div className="flex items-center mt-2">
              <InternetIcon size={18} hexColor={"#1f2937"} />
              <Link href={penjualData?.website ?? ""} className="ms-2">
                <h2 className="text-base">{penjualData?.website}</h2>
              </Link>
            </div>
            <div className="flex items-start mt-1 relative">
              <MapIcon size={18} hexColor={"#1f2937"} />
              <h3 className="text-base ms-2 relative bottom-0.5">{penjualData?.alamat}</h3>
            </div>
          </div>
        </div>
        
        {/* Menu tabs */}
        <div className="mt-8 w-full border-b border-gray-400 flex">
          <ul className="flex flex-wrap text-sm font-medium text-center">
            <li className="w-40">
              <button onClick={() => setActiveTab('produk')} className={`relative w-full flex items-center justify-center px-4 py-2 rounded-t-lg group ${activeTab === 'produk' ? 'bg-mediumaqua text-white' : 'bg-none text-darkaqua'}`}>
                <BoxIcon size={24} hexColor={`${activeTab === 'produk' ? "#ffffff" : "#007575"}`} />
                <p className="ps-1 relative top-0.5">Produk Dijual</p>
              </button>
            </li>
          </ul>
        </div>

        {/* Content selected by menu tab */}
        <div className="w-full mt-4">
          {activeTab === 'produk' && <PenjualProduct penjualId={params.penjualId} />}
        </div>
      </div>
    </div>
    </>
  )
}

export default PublicPenjualProfile