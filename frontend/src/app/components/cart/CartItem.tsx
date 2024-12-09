"use client"

import { Item } from 'app/interfaces/Item/types';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Minus, Plus, Trash } from '../icon';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Props {
  data: {
    item: Item
  };
  idCart: string;
  isChecked: boolean;
  onChangePassed: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onItemRemoved: () => void; // refetch after succesfully delete an item
  handleToast: (toastType: string, namaItem: string) => void;
}

const CartItem: React.FC<Props> = ({ data, idCart, isChecked, onChangePassed, onItemRemoved, handleToast }) => {
  const { data: session } = useSession()
  const [quantityToBuy, setQuantityToBuy] = useState<number>(1);
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageResponse = await axios.get(`${process.env.API_BASEURL}/api/items/${data.item.id_item}/pictures`)

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
  }, [data.item.id_item])

  const handleQuantityToBuy = (action: string) => {
    setQuantityToBuy(action === 'add' ? quantityToBuy + 1 : quantityToBuy === 1 ? quantityToBuy : quantityToBuy - 1)
  }

  const handleRemoveFromCart = async () => {
    try {
      const response = await axios.delete(`${process.env.API_BASEURL}/api/cart/${idCart}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        }
      })

      if (response.status !== 200) {
        throw new Error('Something went wrong when deleting an item!')
      }

      handleToast("SUCCESS", data.item.nama)
      onItemRemoved()
    } catch (error) {
      if (error instanceof Error) {
        handleToast("WARNING", data.item.nama)
        console.log(error.message)
      }
    }
  }

  return (
    <div className="w-full border border-gray-200 bg-white rounded-md p-4 mt-2">
      <div className="grid md:grid-cols-[auto_auto_auto_1fr] row-auto gap-0">
        {/* Checkbox */}
        <input type="checkbox" className="row-span-2 self-start accent-mediumaqua w-4 h-4" value={data.item.id_item} checked={isChecked} onChange={(e) => onChangePassed(e)} />

        {/* Item Image */}
        <Image className="row-span-2 ms-2 rounded-md" src={image ?? "/pexels-crisdip-35358-128756.jpg"} alt="cart-gambar-Ikan Anonim" width={140} height={140} />
        
        {/* Item Title */}
        <div className="row-span-2 ms-4">
          <h1 className="font-medium">{data.item.nama}</h1>
          <h2 className="font-normal text-gray-600">{data.item.jenis_bibit}</h2>
        </div>

        {/* Item Price */}
        <p className="font-bold justify-self-end">Rp{data.item.harga}</p>

        {/* Button and More Information */}
        {/* <div className="col-span-2 col-start-2 justify-self-end self-end flex flex-col items-center justify-center"> */}
        <div className="col-start-4 justify-self-end self-end flex flex-col items-center justify-center">
          <p className="text-sm text-darkaqua text-right w-full mt-4 md:mt-0">Stok tersisa: {data?.item.stock ? data?.item.stock : 0}</p>
          <div className="flex items-center justify-center">
            <button onClick={handleRemoveFromCart} className="me-2 flex items-center">
              <Trash size={20} hexColor={"#6b7280"} />
            </button>
            <div className="flex items-center justify-center border border-gray-200 rounded-lg px-2 py-1">
              <button disabled={quantityToBuy === 1 ? true : false} onClick={() => handleQuantityToBuy('subtract')} className={`${quantityToBuy === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                {quantityToBuy === 1 ? <Minus size={18} hexColor={"#d1d5db"} /> : <Minus size={18} hexColor={"#007575"} />}
              </button>
              <p className="mx-2 w-4 text-center font-medium">{quantityToBuy}</p>
              <button disabled={quantityToBuy === data?.item.stock ? true : false} onClick={() => handleQuantityToBuy('add')} className={`${quantityToBuy === data?.item.stock ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                {quantityToBuy === data?.item.stock ? <Plus size={18} hexColor={"#d1d5db"} /> : <Plus size={18} hexColor={"#007575"} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
    