"use client"

import BackButton from 'app/components/button/BackButton'
import { Item } from 'app/interfaces/Item/types'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface ParameterId {
  params: {
    itemId: string
  }
}

const DetailProductItem: React.FC<ParameterId> = ({ params }) => {
  const [itemData, setItemData] = useState<Item | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASEURL}/api/items/${params.itemId}`)

        if (!response) {
          throw new Error('Some error occurred!')
        }

        const data: Item = await response.data.data
        setItemData(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [params.itemId])

  // Check data from API
  useEffect(() => {
    console.log({ itemData });
  }, [itemData]);

  const handleBuy = () => {

  }

  const [quantityToBuy, setQuantityToBuy] = useState<number>(0);
  const handleQuantityToBuy = (action: string) => {
    setQuantityToBuy(action === 'add' ? quantityToBuy + 1 : quantityToBuy === 0 ? quantityToBuy : quantityToBuy - 1)
  }
  
  return (
    <div className="mt-24">
      <div className="w-full flex items-center justify-center mt-24">
      <div className={`bgdetailitem-wave`}></div>
        <div className="max-w-screen-xl w-full h-full relative p-8 lg:px-0 flex flex-col items-center justify-center">
          <BackButton />
          <div className="flex flex-col lg:flex-row items-start justify-center mb-20">
            <div className="grid grid-rows-[auto,auto] grid-cols-4 gap-3 items-center justify-center w-full max-w-[400px] md:max-w-full lg:max-w-[400px]">
              <div className="col-span-4">
                <h1 className="lg:hidden font-black tracking-wide text-4xl mb-4">{itemData?.nama}</h1>
                <Image src={'/pexels-crisdip-35358-128756.jpg'} alt={`gambar-${itemData?.nama}`} height={400} width={400} className="w-full" />
              </div>
              <Image src={'/pexels-crisdip-35358-128756.jpg'} alt={`gambar-${itemData?.nama}`} height={90} width={90} />
              <Image src={'/pexels-crisdip-35358-128756.jpg'} alt={`gambar-${itemData?.nama}`} height={90} width={90} />
              <Image src={'/pexels-crisdip-35358-128756.jpg'} alt={`gambar-${itemData?.nama}`} height={90} width={90} />
              <Image src={'/pexels-crisdip-35358-128756.jpg'} alt={`gambar-${itemData?.nama}`} height={90} width={90} />
            </div>
            <div className="ms-0 lg:ms-10 mt-8 lg:mt-0">
              <h1 className="hidden lg:block font-black tracking-wide text-4xl mb-4">{itemData?.nama}</h1>
              <p className="max-w-screen-sm text-gray-600 leading-5">{itemData?.description?.slice(0, 400)}{(itemData?.description?.length || 0) > 400 ? '...' : ''}</p>
              <p className="relative mt-10 lg:mt-6">
                <span className="text-darkaqua text-base font-bold relative top-[-16px]">Rp</span>
                <span className="font-black text-4xl ms-1">
                  {itemData?.harga ? new Intl.NumberFormat('id-ID').format(itemData?.harga) : '-'}
                </span>
                <span className="text-darkaqua font-bold ms-1 relative top-1">/{itemData?.tipe_penjualan}</span>
              </p>
              <div className="w-52 flex items-center justify-start mt-12 lg:mt-6">
                <button disabled={quantityToBuy === 0 ? true : false} onClick={() => handleQuantityToBuy('subtract')} className={`w-10 border py-1 rounded-md font-medium ${quantityToBuy === 0 ? 'cursor-not-allowed bg-gray-500' : 'cursor-pointer bg-darkaqua hover:bg-mediumaqua'} text-white border-none`}>-</button>
                <p className="mx-2 w-6 text-center font-medium text-lg">{quantityToBuy}</p>
                <button disabled={quantityToBuy === itemData?.stock ? true : false} onClick={() => handleQuantityToBuy('add')} className={`w-10 border py-1 rounded-md font-medium ${quantityToBuy === itemData?.stock ? 'cursor-not-allowed bg-gray-500' : 'cursor-pointer bg-darkaqua hover:bg-mediumaqua'} text-white border-none`}>+</button>
                <p className="ms-4 font-medium text-darkaqua">Stock: {itemData?.stock}</p>
              </div>
              <button onClick={handleBuy} className="w-52 mt-6 border py-1 custom-hover-button cursor-pointer rounded-md font-medium bg-darkaqua text-white border-none">Beli</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProductItem