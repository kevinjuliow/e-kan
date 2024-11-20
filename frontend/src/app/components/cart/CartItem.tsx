"use client"

import { Item } from 'app/interfaces/Item/types';
import Image from 'next/image'
import React, { useState } from 'react'
import { Minus, Plus, Trash } from '../icon';

interface Props {
  data: Item;
  isChecked: boolean;
  onChangePassed: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CartItem: React.FC<Props> = ({ data, isChecked, onChangePassed }) => {
  const [quantityToBuy, setQuantityToBuy] = useState<number>(1);
  const handleQuantityToBuy = (action: string) => {
    setQuantityToBuy(action === 'add' ? quantityToBuy + 1 : quantityToBuy === 1 ? quantityToBuy : quantityToBuy - 1)
  }

  const handleRemoveFromCart = () => {
    console.log("CLICKED")
  }

  return (
    <div className="w-full border border-gray-200 bg-white rounded-md p-4 mt-2">
      <div className="grid md:grid-cols-[auto_auto_auto_1fr] row-auto gap-0">
        {/* CHECKBOX */}
        <input type="checkbox" className="row-span-2 self-start accent-mediumaqua w-4 h-4" value={data.id_item} checked={isChecked} onChange={(e) => onChangePassed(e)} />

        {/* ITEM IMAGE */}
        <Image className="row-span-2 ms-2 rounded-md" src={"/pexels-crisdip-35358-128756.jpg"} alt="cart-gambar-Ikan Anonim" width={140} height={140} />
        
        {/* ITEM TITLE */}
        <div className="row-span-2 ms-4">
          <h1 className="font-medium">Ikan Anonim</h1>
          <h2 className="font-normal text-gray-600">Calon Induk</h2>
        </div>

        {/* ITEM PRICE */}
        <p className="font-bold justify-self-end">Rp{data.harga}</p>

        {/* BUTTON AND MORE INFORMATION */}
        {/* <div className="col-span-2 col-start-2 justify-self-end self-end flex flex-col items-center justify-center"> */}
        <div className="col-start-4 justify-self-end self-end flex flex-col items-center justify-center">
          <p className="text-sm text-darkaqua text-right w-full mt-4 md:mt-0">Stok tersisa: {data?.stock ? data?.stock : 0}</p>
          <div className="flex items-center justify-center">
            <button onClick={handleRemoveFromCart} className="me-2 flex items-center">
              <Trash size={20} hexColor={"#6b7280"} />
            </button>
            <div className="flex items-center justify-center border border-gray-200 rounded-lg px-2 py-1">
              <button disabled={quantityToBuy === 1 ? true : false} onClick={() => handleQuantityToBuy('subtract')} className={`${quantityToBuy === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                {quantityToBuy === 1 ? <Minus size={18} hexColor={"#d1d5db"} /> : <Minus size={18} hexColor={"#007575"} />}
              </button>
              <p className="mx-2 w-4 text-center font-medium">{quantityToBuy}</p>
              <button disabled={quantityToBuy === data?.stock ? true : false} onClick={() => handleQuantityToBuy('add')} className={`${quantityToBuy === data?.stock ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                {quantityToBuy === data?.stock ? <Plus size={18} hexColor={"#d1d5db"} /> : <Plus size={18} hexColor={"#007575"} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
    