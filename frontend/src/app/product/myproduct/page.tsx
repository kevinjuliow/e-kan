"use client"

import ArrowBackButton from 'app/components/button/ArrowBackButton'
import EachPostedProduct from 'app/components/product/EachPostedProduct'
import { Toast, useToast } from 'app/components/toast/Toast'
import { Item } from 'app/interfaces/Item/types'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const MyProduct = () => {
  const { data: session } = useSession()
  const { message, toastType, showToast } = useToast()
  const [itemData, setItemData] = useState<Item[]>([])

  // fetch items that posted by specified penjual
  const fetchData = async () => {
    try {
      console.log(`${process.env.API_BASEURL}/api/items/penjual/${session?.user.id}`)
      const response = await axios.get(`${process.env.API_BASEURL}/api/items/penjual/${session?.user.id}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })

      if (!response) {
        throw new Error('Some error occurred!')
      }

      const data: Item[] = response.data.data
      setItemData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Check data from API
  useEffect(() => {
    console.log({ itemData });
  }, [itemData]);

  const handleToast = (toastType: string, namaItem: string) => {
    if (toastType === 'SUCCESS') {
      showToast("Berhasil menghapus " + namaItem + " dari keranjang!", "SUCCESS")
    } else {
      showToast("Gagal menghapus item dari keranjang, coba lagi!", "WARNING");
    }
  }

  return (
    <div className="w-full flex items-center justify-center mt-24">
      <div className={`bgdashboard-wave`}></div>
      <div className="max-w-screen-md w-full h-full relative p-8 xl:px-0 flex flex-col items-center justify-center">
        <div className="flex items-center mb-4 w-full">
          <ArrowBackButton url={"/dashboard"} size={20} hexColor={"#1f2937"} />
          <h1 className="text-2xl font-bold text-left w-full ms-2">Produk Saya</h1>
        </div>
        
        {/* {itemData ? <div className="flex flex-col md:flex-row justify-center w-full"> */}
        {itemData ? <div className="grid grid-cols-1 sm:grid-cols-2 w-full mb-32 gap-2">
          {itemData.map((item, index) => {
            return (
              <EachPostedProduct key={index} data={item} onItemRemoved={fetchData} handleToast={handleToast} />
            )
          })}
        </div>
        : <h1 className="font-medium text-xl mt-48 text-center">Belum ada ikan yang ditambahkan ke dalam keranjang!</h1>}

      </div>
      {message && <Toast message={message} toastType={toastType ?? "SUCCESS"} onClose={() => {}} />}
    </div>
  )
}

export default MyProduct