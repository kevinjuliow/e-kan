"use client"

import AddAlamatForCheckout from 'app/components/checkout/AddAlamatForCheckout'
import EachCheckoutItem from 'app/components/checkout/EachCheckoutItem'
import { BankIcon, LeftArrowIcon, MapIcon, PlusNonSolid } from 'app/components/icon'
import { Toast, useToast } from 'app/components/toast/Toast'
import { Alamat, CheckoutItem } from 'app/interfaces/Item/types'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Checkout = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { message, toastType, showToast } = useToast()
  const [openAddAlamat, setOpenAddAlamat] = useState<boolean>(false);
  const [checkoutItem, setCheckoutItem] = useState<CheckoutItem[] | null>(null)
  // const [invoiceId, setInvoiceId] = useState<string | null>(null)
  const [alamatPembeli, setAlamatPembeli] = useState<Alamat[] | null>(null)
  const [selectedAlamat, setSelectedAlamat] = useState<string | null>(null)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const bankNames = ['BCA', 'BRI', 'BNI', 'CIMB NIAGA', 'MANDIRI', 'DANAMON']
  const banks = ['bca', 'bri', 'bni', 'cimb', 'mandiri', 'danamon']
  const bankImageNames = ['bca-icon', 'bri-icon', 'bni-icon', 'cimbniaga-icon', 'mandiri-icon', 'danamon-icon']

  const handleToast = (message: string, toastType: string) => {
    showToast(message, toastType)
  }

  const handleOpenAddAlamatForm = () => {
    setOpenAddAlamat(!openAddAlamat)
  }

  useEffect(() => {
    const storedCheckoutItems = sessionStorage.getItem("checkoutItems")

    if (storedCheckoutItems) {
      try {
        setCheckoutItem(JSON.parse(storedCheckoutItems))
      } catch (error) {
        console.error("Failed to parse checkoutItem:", error)
        setCheckoutItem(null)
      }
    }
  }, [])

  const fetchAlamat = async () => {
    try {
      const response = await axios.get(`${process.env.API_BASEURL}/api/alamat`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!response) {
        throw new Error('Some error occurred!');
      }

      setAlamatPembeli(response.data.data);
      setSelectedAlamat(response.data.data[0]?.id_alamat || null)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAlamat()
  }, [])

  useEffect(() => {
    if (checkoutItem) {
      const total = checkoutItem.reduce((acc, item) => acc + (item.item.harga * item.quantity), 0);
      setTotalPrice(total);
      console.log("RUNNNNN")
    }
  }, [checkoutItem])

  const handleCheckout = async () => {
    let invoiceId;

    if (checkoutItem && checkoutItem[0]?.source === 'direct') { // handle checkout from product detail (single buy)
      try {
        const response = await axios.post(`${process.env.API_BASEURL}/api/transactions/direct`, null, {
          params: {
            itemId: checkoutItem[0].item.id_item,
            quantity: checkoutItem[0].quantity,
            alamatId: selectedAlamat,
          },
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        if (!response) {
          throw new Error('Some error occurred at making invoice!');
        }

        const { id_invoice } = await response.data.data
        invoiceId = id_invoice

      } catch (error) {
        if (error instanceof Error) {
          handleToast("Gagal melakukan checkout, coba lagi!", "WARNING")
        }
      }
    } else { // handle checkout from cart
      try {
        const response = await axios.post(`${process.env.API_BASEURL}/api/transactions/cart`, null, {
          params: {
            alamatId: selectedAlamat,
          },
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        if (!response) {
          console.log("MASUK ERROR")
          throw new Error('Some error occurred at making invoice by cart!');
        }

        
        const { id_invoice } = await response.data.data
        invoiceId = id_invoice

      } catch (error) {
        if (error instanceof Error) {
          handleToast("Gagal melakukan checkout, coba lagi!", "WARNING")
        }
      }
    }

    try {
      const response = await axios.post(`${process.env.API_BASEURL}/api/payment/create/${invoiceId}`, {
        paymentMethod: "bank_transfer",
        bank: selectedBank
      }, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!response) {
        throw new Error('Some error occurred at midtrans!');
      }

      console.log(response.data.data)

      router.push(`/checkout/payment?invoiceId=${invoiceId}`);
    } catch (error) {
      if (error instanceof Error) {
        handleToast("Gagal melakukan checkout, coba lagi!", "WARNING")
      }
    }
  }
  
  return (
    <>
    <div className="w-full flex items-center justify-center mt-24">
      <div className="bgdashboard-wave"></div>
      <div className="max-w-screen-md w-full h-full relative p-8 xl:px-0 flex flex-col items-center justify-center">
        <button onClick={() => router.back()} className="flex items-center mb-4 w-full">
          <div className="relative bottom-[2px]">
            <LeftArrowIcon size={20} hexColor={"#1f2937"} />
          </div>
          <h1 className="text-2xl font-bold text-left w-full ms-2">Checkout Produk</h1>
        </button>

        {checkoutItem ? <>
        <div className="w-full flex flex-col">
          {checkoutItem && checkoutItem.map((eachCheckoutItem, index) => {
            console.log(eachCheckoutItem)
            return(
              <EachCheckoutItem key={index} data={eachCheckoutItem} />
            )
          })}
        </div>

        <div className="w-full bg-white p-4 rounded-lg">
          <h1 className="font-medium">Total biaya: Rp{totalPrice}</h1>
        </div>

        <div className="w-full bg-white mt-2 p-4 rounded-lg">
          <div className="flex relative">
            <MapIcon size={20} hexColor={"#007575"} />
            <h2 className="font-bold ms-2 mb-2 text-darkaqua relative bottom-0.5">Pilih Alamat Pengiriman</h2>
          </div>
          {alamatPembeli && alamatPembeli.length > 0 ?
            <div className="ms-1">
              {alamatPembeli.map((alamat) => (
                <div key={alamat.id_alamat} className="flex mb-4">
                  <input
                    type="radio"
                    id={`alamat-${alamat.id_alamat}`}
                    name="alamat"
                    value={alamat.id_alamat}
                    checked={selectedAlamat === alamat.id_alamat}
                    onChange={(e) => setSelectedAlamat(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor={`alamat-${alamat.id_alamat}`} className="text-sm">
                    {`${alamat.alamat_lengkap}, RT ${alamat.rt}/RW ${alamat.rw}, ${alamat.kecamatan}, ${alamat.kabupaten}, ${alamat.provinsi}, ${alamat.kode_pos}`}
                  </label>
                </div>
              ))}
            </div> : 
            <div className="flex flex-col items-center justify-center mb-2 relative">
              <h1 className="w-full text-center text-sm">Belum ada alamat ditambahkan!</h1>
              <button onClick={handleOpenAddAlamatForm} className="flex items-center justify-center text-sm relative border border-darkaqua px-2 py-1 rounded-lg mt-4">
                <PlusNonSolid size={20} hexColor={"#007575"} />
                <p className="relative top-0.5 ms-1">Tambah Alamat</p>
              </button>
              {openAddAlamat && <AddAlamatForCheckout handleToast={handleToast} closeFormWindow={handleOpenAddAlamatForm} fetchAlamat={fetchAlamat} />}
            </div>}
        </div>
        </> : 
          <div className="w-full bg-white p-4 rounded-lg text-center">
            <h1 className="font-medium">Loading...</h1>
          </div>
        }

        <div className="w-full bg-white mt-2 p-4 rounded-lg">
          <div className="flex relative">
            <BankIcon size={20} hexColor={"#007575"} />
            <h2 className="font-bold text-lg ms-2 mb-2 text-darkaqua relative bottom-0.5">Pilih Bank</h2>
          </div>
          <div className="flex items-center ms-1">
            <div className="me-8">
              {/* Left Banks */}
              {banks.slice(0, 3).map((bank, index) => (
                <div key={index} className="flex items-center mb-4">
                  <input
                    type="radio"
                    id={`bank-${bank}`}
                    name="bank"
                    value={bank}
                    checked={selectedBank === bank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="mr-2"
                  />
                  <img src={`/bankicon/${bankImageNames[index]}.png`} alt="bank icon" className="w-10 sm:w-8 me-2" />
                  <label htmlFor={`bank-${bank}`} className="text-sm hidden sm:block">
                    {bankNames[index]} Virtual Account
                  </label>
                </div>
              ))}
            </div>
            <div className="ms-8">
              {/* Right Banks */}
              {banks.slice(3).map((bank, index) => (
                <div key={index} className="flex items-center mb-4">
                  <input
                    type="radio"
                    id={`bank-${bank}`}
                    name="bank"
                    value={bank}
                    checked={selectedBank === bank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    disabled={true && (bank === 'mandiri' || bank === 'danamon')}
                    className="mr-2"
                  />
                  <img src={`/bankicon/${bankImageNames[index + 3]}.png`} alt="bank icon" className="w-16 sm:w-14 me-2" />
                  {(bank === 'mandiri' || bank === 'danamon') ?
                  <p className="font-medium">[BELUM TERSEDIA]</p> :
                  <label htmlFor={`bank-${bank}`} className="text-sm hidden sm:block">
                    {bankNames[index + 3]} Virtual Account
                  </label>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="w-full text-right mb-20">
          <button onClick={handleCheckout} className="w-full sm:max-w-60 mt-6 border py-1 custom-hover-button cursor-pointer rounded-md font-medium bg-darkaqua text-white border-none">
            Checkout
          </button>
        </div>
      </div>
    </div>
    {message && <Toast message={message} toastType={toastType ?? "SUCCESS"} onClose={() => {}} />}
    </>
  )
}

export default Checkout;