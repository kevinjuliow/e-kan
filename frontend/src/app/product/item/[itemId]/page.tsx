"use client"

import BackButton from 'app/components/button/BackButton'
import { ChatBubbleIcon } from 'app/components/icon'
import Loading from 'app/components/loader/Loading'
import { Toast, useToast } from 'app/components/toast/Toast'
import { Item } from 'app/interfaces/Item/types'
import { useItemContext } from 'app/itemprovider'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface ParameterId {
  params: {
    itemId: string
  }
}

const DetailProductItem: React.FC<ParameterId> = ({ params }) => {
  const { data: session } = useSession()
  const [itemData, setItemData] = useState<Item | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const [penjualImage, setPenjualImage] = useState<string | null>(null)
  const [quantityToBuy, setQuantityToBuy] = useState<number>(0)
  const { addItemToCheckout } = useItemContext()
  const { message, toastType, showToast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASEURL}/api/items/${params.itemId}`)

        if (!response) {
          throw new Error('Some error occurred!')
        }

        const data: Item = await response.data.data
        setItemData(data)

        const imageResponse = await axios.get(`${process.env.API_BASEURL}/api/items/${data.id_item}/pictures`)

        if (!imageResponse) {
          throw new Error('Some error occured when fetching an image!')
        }

        const { fileType, data: imageData } = imageResponse.data[0];

        // creates image url from base64 response
        const imageUrl = `data:${fileType};base64,${imageData}`;
        setImage(imageUrl);

        // fetch penjual profile image
        const penjualImageResponse = await axios.get(`${process.env.API_BASEURL}/api/profile-picture/penjual/${itemData?.penjual.id_penjual}`, {
          responseType: 'blob'
        })
      
        if (!penjualImageResponse) {
          throw new Error('Some error occurred when fetching an image!');
        }
      
        // converts Blob into URL
        const penjualImageUrl = URL.createObjectURL(penjualImageResponse.data);
        setPenjualImage(penjualImageUrl ?? null)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [params.itemId, itemData?.penjual.id_penjual])

  // Check data from API
  useEffect(() => {
    console.log({ itemData });
  }, [itemData]);

  const handleQuantityToBuy = (action: string) => {
    setQuantityToBuy(action === 'add' ? quantityToBuy + 1 : quantityToBuy === 0 ? quantityToBuy : quantityToBuy - 1)
  }

  const handleBuy = async () => {
    if (quantityToBuy === 0) {
      return
    }
    if (itemData && image) {
      console.log({ item: itemData, quantity: quantityToBuy })
      await addItemToCheckout([{ item: itemData, quantity: quantityToBuy, source: 'direct' }]);
    }
    router.push('/checkout')
  }

  const handleStartChat = async () => {
    try {
      const response = await axios.post(`${process.env.API_BASEURL}/api/chat/create-group`, null, {
        params: {
          penjualId: itemData?.penjual.id_penjual,
        },
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (response.status !== 201) {
        throw new Error()
      }

      router.push("/chat")
    } catch (error) {
      if (error instanceof Error) {
        console.log("ERROR BOS")
        console.log(error)
        showToast("Gagal melakukan chat, coba lagi!", "WARNING")
      }
    }
  }
  
  return (
    <>
    <div className="mt-24 w-full px-0 lg:px-8">
      <div className="w-full flex items-center justify-center mt-24">
        <div className={`bgdetailitem-wave`}></div>
        <div className="max-w-screen-xl w-full h-full relative p-8 lg:px-0 flex flex-col items-center justify-center">
          <BackButton />
          {(itemData && image && penjualImage) ? <>
            <div className="flex flex-col lg:flex-row items-start justify-center mb-6 w-full">
              <div className="grid grid-rows-[auto,auto] grid-cols-4 gap-3 items-center justify-center w-full max-w-[400px] md:max-w-full lg:max-w-[400px]">
                <div className="col-span-4">
                  <h1 className="lg:hidden font-black tracking-wide text-4xl mb-4">{itemData?.nama}</h1>
                  <Image src={image ?? '/pexels-crisdip-35358-128756.jpg'} alt={`gambar-${itemData?.nama}`} height={400} width={400} className="w-full rounded-lg" />
                </div>
              </div>
              <div className="ms-0 lg:ms-10 mt-8 lg:mt-0 w-full">
                <h1 className="hidden lg:block font-black tracking-wide text-4xl mb-4">{itemData?.nama}</h1>
                <div className="flex items-center justify-start">
                  <div className="flex items-center w-auto me-2">
                    <h2 className="mb-2 font-medium bg-darkaqua text-white px-2 py-1 rounded-lg">Habitat air {itemData?.jenis_habitat.toLowerCase()}</h2>
                  </div>
                  <div className="flex items-center w-auto">
                    <h2 className="mb-2 font-medium bg-darkaqua text-white px-2 py-1 rounded-lg">Jenis bibit {itemData?.jenis_bibit.toLowerCase()}</h2>
                  </div>
                </div>
                <p className="w-full text-justify text-gray-600 leading-5">{itemData?.description?.slice(0, 400)}{(itemData?.description?.length || 0) > 400 ? '...' : ''}</p>
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
            <div className="mb-24 w-full grid grid-cols-[auto_1fr] grid-rows-auto gap-x-2">
              <Image src={penjualImage ?? '/default_profile.png'} width={68} height={68} alt={`gambar-${itemData?.penjual.nama}`} className="row-span-2 rounded-lg" />
              <div className="row-span-2 flex flex-col items-start justify-between">
                <Link href={`/profile/penjual/${itemData?.penjual.id_penjual}`} className="flex items-center justify-start">
                  <h1 className="text-lg text-darkaqua relative top-0.5">{itemData?.penjual.nama}</h1>
                </Link>
                <button onClick={handleStartChat} className="flex items-center justify-start rounded-lg custom-hover-button">
                  <div className="flex items-center justify-start bg-darkaqua text-white px-2 py-1 rounded-lg">
                    <ChatBubbleIcon size={18} hexColor={'#ffffff'} />
                    <h1 className="ms-1">Hubungi sekarang!</h1>
                  </div>
                </button>
              </div>
            </div>
          </> : <Loading /> }
        </div>
      </div>
    </div>
    {message && <Toast message={message} toastType={toastType ?? "SUCCESS"} onClose={() => {}} />}
    </>
  )
}

export default DetailProductItem