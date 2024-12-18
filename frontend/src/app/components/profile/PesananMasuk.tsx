"use client"

import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const PesananMasuk = () => {
  // const { data: session } = useSession()
  // const [invoice, setInvoice] = useState()

  // useEffect(() => {
  //   const fetchInvoice = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.API_BASEURL}/api/items/process`, {
  //         headers: {
  //           Authorization: `Bearer ${session?.accessToken}`,
  //         },
  //       });
  
  //       if (!response) {
  //         throw new Error('Some error occurred!');
  //       }
        
  //       const data = response.data.data
  //       console.log(data)

  //       setInvoice(data)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchInvoice()
  // }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1>Pesanan Masuk</h1>
    </div>
  )
}

export default PesananMasuk