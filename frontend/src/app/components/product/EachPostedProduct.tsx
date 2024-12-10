"use client"

import { Item } from 'app/interfaces/Item/types'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { PencilEditIcon, Trash } from '../icon';

interface Props {
  data: Item;
  onItemRemoved: () => void; // refetch after succesfully delete an item
  handleToast: (toastType: string, namaItem: string) => void;
}

const EachPostedProduct: React.FC<Props> = ({ data, onItemRemoved, handleToast }) => {
  const { data: session } = useSession()
  const [image, setImage] = useState<string | null>(null)

  // fetch image for each item
  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageResponse = await axios.get(`${process.env.API_BASEURL}/api/items/${data.id_item}/pictures`)

        if (!imageResponse) {
          throw new Error('Some error occured when fetching an image!')
        }

        const imageData = imageResponse.data[0];

        // creates image url from base64 response
        const imageUrl = `data:${imageData.fileType};base64,${imageData.data}`;
        setImage(imageUrl);
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [data.id_item])

  const handleRemoveFromPostedProduct = async () => {
    try {
      const response = await axios.delete(`${process.env.API_BASEURL}/api/items/${data.id_item}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        }
      })

      if (response.status !== 200) {
        throw new Error('Something went wrong when deleting an item!')
      }

      handleToast("SUCCESS", data.nama)
      onItemRemoved()
    } catch (error) {
      if (error instanceof Error) {
        handleToast("WARNING", data.nama)
        console.log(error.message)
      }
    }
  }

  const handleUpdateItemData = () => {
    
  }

  return (
    <>
      {image && <div className="w-full border border-gray-200 bg-white rounded-md p-2">
      <div className="grid grid-cols-[auto,1fr,auto] row-auto gap-0">

        {/* Item Image */}
        <img className="row-span-2 rounded-[4px] min-w-20 w-[140px] h-auto" src={image ?? "/pexels-crisdip-35358-128756.jpg"} alt="cart-gambar-Ikan Anonim" />
        
        <div className="row-span-2 col-start-2 ms-2 flex flex-col justify-between">
          {/* Item Title */}
          <div className="">
            <h1 className="font-medium">{data.nama}</h1>
            <h2 className="font-normal text-gray-600">{data.jenis_bibit}</h2>
            <p className="text-sm text-darkaqua w-full mt-1">Stok: {data?.stock ? data?.stock : 0}</p>
          </div>
          {/* Item Price */}
          <p className="font-bold">Rp{data.harga}</p>
        </div>

        {/* Button and More Information */}
        <div className="col-start-3 place-items-end flex flex-col justify-between">
          
          <div className="flex items-center justify-center mt-2">
            <button onClick={handleUpdateItemData} className="flex items-center">
              <PencilEditIcon size={20} hexColor={"#6b7280"} />
            </button>
            <button onClick={handleRemoveFromPostedProduct} className="ms-2 flex items-center">
              <Trash size={20} hexColor={"#6b7280"} />
            </button>
          </div>
        </div>
      </div>
    </div>}
    </>
  )
}

export default EachPostedProduct