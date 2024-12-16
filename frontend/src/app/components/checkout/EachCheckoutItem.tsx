"use client"

import { CheckoutItem } from 'app/interfaces/Item/types';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface Props {
  data: CheckoutItem;
}

const EachCheckoutItem: React.FC<Props> = ({ data }) => {
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageResponse = await axios.get(`${process.env.API_BASEURL}/api/items/${data.item.id_item}/pictures`)

        if (!imageResponse) {
          throw new Error('Some error occured when fetching an image!')
        }

        const { fileType, data: imageData } = imageResponse.data[0];

        // creates image url from base64 response
        const imageUrl = `data:${fileType};base64,${imageData}`;
        setImage(imageUrl);
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [data.item.id_item])

  return (
    <div className="w-full border border-gray-200 bg-white rounded-md p-4 mb-2">
      <div className="grid grid-cols-[100px_auto_auto] row-auto gap-0">
        <Image className="row-span-2 rounded-md" src={image ?? "/pexels-crisdip-35358-128756.jpg"} alt="cart-gambar-Ikan Anonim" width={100} height={100} />
        
        <div className="row-span-2 ms-4">
          <h1 className="font-bold">{data.item.nama}</h1>
          <h2 className="font-normal text-gray-600">{data.item.jenis_bibit}</h2>
          <h2 className="font-medium">Rp{data.item.harga} x {data.quantity}</h2>
        </div>

        <div className="row-span-2 flex flex-col justify-between justify-self-end">
          <p className="font-normal text-right">{data.item.penjual.nama}</p>
          <p className="font-bold text-right">Total: Rp{data.item.harga * data.quantity}</p>
        </div>
      </div>
    </div>
  )
}

export default EachCheckoutItem