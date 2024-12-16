"use client"
import ArrowBackButton from 'app/components/button/ArrowBackButton'
import EachCheckoutItem from 'app/components/checkout/EachCheckoutItem'
import { BankIcon, MapIcon } from 'app/components/icon'
import { Alamat, CheckoutItem } from 'app/interfaces/Item/types'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'


const Checkout = () => {
  const { data: session } = useSession()
  const [checkoutItem, setCheckoutItem] = useState<CheckoutItem[] | null>(null)
  // const [invoiceId, setInvoiceId] = useState<string | null>(null)
  const [alamatPembeli, setAlamatPembeli] = useState<Alamat[] | null>(null)
  const [selectedAlamat, setSelectedAlamat] = useState<string | null>(null)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const banks = ['BCA', 'BRI', 'BNI', 'CIMB NIAGA', 'MANDIRI', 'DANAMON']
  const bankImageNames = ['bca-icon', 'bri-icon', 'bni-icon', 'cimbniaga-icon', 'mandiri-icon', 'danamon-icon']

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

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData()
  }, [])

  useEffect(() => {
    if (checkoutItem) {
      const total = checkoutItem.reduce((acc, item) => acc + (item.item.harga * item.quantity), 0);
      setTotalPrice(total);
      console.log("RUNNNNN")
    }
  }, [checkoutItem])

  const handleCheckout = async () => {
    if (checkoutItem && checkoutItem[0]?.source === 'direct') {
      let invoiceId;
      try {
        const response = await axios.post(`${process.env.API_BASEURL}/transactions/direct`, null, {
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

        invoiceId = response.data.data

      } catch (error) {
        if (error instanceof Error) {
          console.log(error)
        }
      }

      try {
        const response = await axios.post(`${process.env.API_BASEURL}/payment/create/${invoiceId}`, {
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

      } catch (error) {
        if (error instanceof Error) {
          console.log(error)
        }
      }

    } else {
      try {
        const response = await axios.post(`${process.env.API_BASEURL}/transactions/cart`, null, {
          params: {
            alamatId: selectedAlamat,
          },
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        if (!response) {
          throw new Error('Some error occurred at making invoice by cart!');
        }

      } catch (error) {
        if (error instanceof Error) {
          console.log(error)
        }
      }
    }
  }
  
  return (
    <div className="w-full flex items-center justify-center mt-24">
      <div className="bgdashboard-wave"></div>
      <div className="max-w-screen-md w-full h-full relative p-8 xl:px-0 flex flex-col items-center justify-center">
        <div className="flex items-center mb-4 w-full">
          <ArrowBackButton url={"/dashboard"} size={20} hexColor={"#1f2937"} />
          <h1 className="text-2xl font-bold text-left w-full ms-2">Checkout Produk</h1>
        </div>

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
          <div className="flex">
            <MapIcon size={24} hexColor={"#007575"} />
            <h2 className="font-bold ms-2 mb-2 text-darkaqua">Pilih Alamat Pengiriman</h2>
          </div>
          {alamatPembeli && alamatPembeli.length > 0 ? (
            <div className="">
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
            </div>
            ) : (
            <p>Loading alamat...</p>
          )}
        </div>

        <div className="w-full bg-white mt-2 p-4 rounded-lg">
          <div className="flex">
            <BankIcon size={24} hexColor={"#007575"} />
            <h2 className="font-bold text-lg ms-2 mb-2 text-darkaqua">Pilih Bank</h2>
          </div>
          <div className="flex items-center">
            <div className="me-8">
              {/* Bank Kiri */}
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
                    {bank} Virtual Account
                  </label>
                </div>
              ))}
            </div>
            <div className="ms-8">
              {/* Bank Kanan */}
              {banks.slice(3).map((bank, index) => (
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
                  <img src={`/bankicon/${bankImageNames[index + 3]}.png`} alt="bank icon" className="w-16 sm:w-14 me-2" />
                  <label htmlFor={`bank-${bank}`} className="text-sm hidden sm:block">
                    {bank} Virtual Account
                  </label>
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
  )
}

export default Checkout;