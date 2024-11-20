"use client"

import CartItem from 'app/components/cart/CartItem'
import { Shop } from 'app/components/icon';
import MobileCart from 'app/components/mobile/MobileCart';
import { useEffect, useState } from 'react';
// import { Item } from 'app/interfaces/Item/types'
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

const Cart = () => {
  // const [itemData, setItemData] = useState<Item[]>([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.API_BASEURL}/api/item`)

  //       if (!response) {
  //         throw new Error('Some error occurred!')
  //       }

  //       const data: Item[] = response.data.data
  //       setItemData(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchData()
  // }, [])

  // // Check data from API
  // useEffect(() => {
  //   console.log({ itemData });
  // }, [itemData]);

  const handleBuy = () => {

  }

  const [selectedId, setSelectedId] = useState<string[]>([])

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedId = e.target.value;
    setSelectedId(e.target.checked ? [...selectedId, checkedId] : selectedId.filter((id) => id !== checkedId))
  }

  const handleMultipleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemDataArray = itemData.map(item => item.id_item);
    setSelectedId(e.target.checked ? itemDataArray : [])
  }

  const [totalPrice, setTotalPrice] = useState<number>(0)
  // Update total price of selected item
  const updateTotalPrice = () => {
    const selectedItems = itemData.filter(item => selectedId.includes(item.id_item));
    const total = selectedItems.reduce((sum, item) => sum + item.harga, 0);
    setTotalPrice(total);
  };

  // const updateTotalPrice = () => {
  //   const selectedItems = itemData.filter(item => selectedId.includes(item.id_item));
  //   const total = selectedItems.reduce((sum, item) => sum + item.harga * quantities[item.id_item], 0);
  //   setTotalPrice(total);
  // };
  
  useEffect(() => {
    updateTotalPrice();
  }, [selectedId]);

  const itemData = [
    {id_item: "1", harga: 100000, penjual: "BPTBP Yogyakarta"},
    {id_item: "2", harga: 200000, penjual: "BPTBP Bantul"},
    {id_item: "3", harga: 300000, penjual: "BPTBP Gunungkidul"},
    {id_item: "4", harga: 400000, penjual: "BPTBP Yogyakarta"},
    {id_item: "5", harga: 500000, penjual: "BPTBP Yogyakarta"},
    {id_item: "6", harga: 600000, penjual: "BPTBP Yogyakarta"}]; // dummy for mapping

  const groupedItems = itemData.reduce((acc, item) => {
    if (!acc[item.penjual]) {
      acc[item.penjual] = [];
    }
    acc[item.penjual].push(item);
    return acc;
  }, {} as Record<string, typeof itemData>);

  // handle quantities of cart item, adding or removing
  // const [quantities, setQuantities] = useState<Record<string, number>>(
  //   itemData.reduce((acc, item) => {
  //     acc[item.id_item] = 1; // Default quantity adalah 1
  //     return acc;
  //   }, {} as Record<string, number>)
  // );

  // const updateQuantity = (id: string, newQuantity: number) => {
  //   setQuantities((prev) => ({
  //     ...prev,
  //     [id]: newQuantity,
  //   }));
  // };
  
  return (
    <div className="w-full flex items-center justify-center mt-24">
      <div className={`bgdashboard-wave`}></div>
      <div className="max-w-screen-xl w-full h-full relative p-8 xl:px-0 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-left w-full mb-4">Keranjang</h1>
        <div className="flex flex-col md:flex-row justify-center w-full">
          <div className="w-full mb-56">
            <div className="w-full flex items-center justify-start bg-white rounded-md p-4 mb-2">

              {/* CHECKBOX */}
              <input type="checkbox" className="accent-mediumaqua w-4 h-4" onChange={(e) => {handleMultipleCheckboxChange(e)}} />

              <h2 className="font-medium ms-2">Pilih semua</h2>
            </div>
            {Object.entries(groupedItems).map(([penjual, items], index) => (
              <div key={index} className="rounded-md mb-4 p-2 bg-white">
                <div className="flex items-center justify-start p-2">
                  <Shop size={20} hexColor={"#007575"} />
                  <h1 className="ms-1 font-medium text-darkaqua">{penjual}</h1>
                </div>
                {items.map((item, index) => {
                  return (
                    <CartItem key={index} data={item} isChecked={selectedId.includes(item.id_item)} onChangePassed={handleCheckboxChange} />
                  )
                })}
              </div>
            ))}
          </div>
          <div className="hidden md:block ms-0 md:ms-2 mb-12 md:mb-0 p-4 w-full md:max-w-80 h-full max-h-60 rounded-md bg-white">
            <h1 className="font-bold">Ringkasan pesanan</h1>
            <div className="w-full mt-4 flex items-center justify-between">
              <p className="">Total biaya</p>
              <p className="font-bold">Rp{totalPrice}</p>
            </div>
            <hr className="mt-4" />
            <button onClick={handleBuy} className="w-full mt-6 border py-1 custom-hover-button cursor-pointer rounded-md font-medium bg-darkaqua text-white border-none">Beli</button>
          </div>
          <div className="block md:hidden">
            <MobileCart totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart