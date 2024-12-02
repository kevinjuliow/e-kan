"use client"

import CartItem from 'app/components/cart/CartItem'
import { Shop } from 'app/components/icon';
import MobileCart from 'app/components/mobile/MobileCart';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useSession } from 'next-auth/react';
import { CartData } from 'app/interfaces/Item/types';
import ArrowBackButton from 'app/components/button/ArrowBackButton';

const Cart = () => {
  const { data: session } = useSession()
  const [cartData, setCartData] = useState<CartData[]>([])
  const [selectedId, setSelectedId] = useState<string[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASEURL}/api/cart`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        })

        if (!response) {
          throw new Error('Some error occurred!')
        }

        const data: CartData[] = response.data.data
        setCartData(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  // Check data from API
  useEffect(() => {
    console.log({ cartData });
  }, [cartData]);

  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedId = e.target.value;
    setSelectedId(e.target.checked ? [...selectedId, checkedId] : selectedId.filter((id) => id !== checkedId))
  }

  const handleMultipleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemDataArray = cartData.map((eachCartData) => eachCartData.item.id_item);
    setSelectedId(e.target.checked ? itemDataArray : [])
  }

  // Update total price of selected item
  const updateTotalPrice = () => {
    const selectedItems = cartData.filter((eachCartData) => selectedId.includes(eachCartData.item.id_item));
    const total = selectedItems.reduce((sum, eachCartData) => sum + eachCartData.item.harga, 0);
    setTotalPrice(total);
  };

  // const updateTotalPrice = () => {
    //   const selectedItems = cartData.filter((eachCartData) => selectedId.includes(eachCartData.item.id_item));
  //   const total = selectedItems.reduce((sum, eachCartData) => sum + eachCartData.item.harga * quantities[eachCartData.item.id_item], 0);
  //   setTotalPrice(total);
  // };
  
  useEffect(() => {
    updateTotalPrice();
  }, [selectedId]);

  const isCartDataItemExist = (Array.isArray(cartData) && cartData.length > 0)
  const groupedItems = isCartDataItemExist
    ? cartData.reduce((acc, eachCartData) => {
      if (!acc[eachCartData.item.penjual.nama]) {
        acc[eachCartData.item.penjual.nama] = [];
      }
      acc[eachCartData.item.penjual.nama].push(eachCartData);
      return acc;
    }, {} as Record<string, typeof cartData>)
  : {};

  // handle quantities of cart item, adding or removing
  // const [quantities, setQuantities] = useState<Record<string, number>>(
  //   cartData.reduce((acc, eachCartData) => {
  //     acc[eachCartData.item.id_item] = 1; // Default quantity adalah 1
  //     return acc;
  //   }, {} as Record<string, number>)
  // );

  // const updateQuantity = (id: string, newQuantity: number) => {
  //   setQuantities((prev) => ({
  //     ...prev,
  //     [id]: newQuantity,
  //   }));
  // };

  // handle button to buy item
  const handleBuy = () => {

  }
  
  return (
    <div className="w-full flex items-center justify-center mt-24">
      <div className={`bgdashboard-wave`}></div>
      <div className="max-w-screen-xl w-full h-full relative p-8 xl:px-0 flex flex-col items-center justify-center">
        <div className="flex items-center mb-4 w-full">
          <ArrowBackButton url={"/dashboard"} size={20} hexColor={"#1f2937"} />
          <h1 className="text-2xl font-bold text-left w-full ms-2">Keranjang</h1>
        </div>
        {isCartDataItemExist ? <div className="flex flex-col md:flex-row justify-center w-full">
          <div className="w-full mb-56">
            <div className="w-full flex items-center justify-start bg-white rounded-md p-4 mb-2">

              {/* CHECKBOX */}
              <input type="checkbox" className="accent-mediumaqua w-4 h-4" onChange={(e) => {handleMultipleCheckboxChange(e)}} />

              <h2 className="font-medium ms-2">Pilih semua</h2>
            </div>
            {Object.entries(groupedItems).map(([penjual, cartData], index) => (
              <div key={index} className="rounded-md mb-4 p-2 bg-white">
                <div className="flex items-center justify-start p-2">
                  <Shop size={20} hexColor={"#007575"} />
                  <h1 className="ms-1 font-medium text-darkaqua">{penjual}</h1>
                </div>
                {cartData.map((eachCartData, index) => {
                  return (
                    <CartItem key={index} data={eachCartData} isChecked={selectedId.includes(eachCartData.item.id_item)} onChangePassed={handleCheckboxChange} />
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
        </div> : <h1 className="font-medium text-xl mt-48 text-center">Belum ada ikan yang ditambahkan ke dalam keranjang!</h1> }
      </div>
    </div>
  )
}

export default Cart