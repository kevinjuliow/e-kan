"use client"

import { Invoice } from 'app/interfaces/Item/types'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const StatusTransaksi = () => {
  const { data: session } = useSession()
  const [invoice, setInvoice] = useState<Invoice[]>([])

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASEURL}/api/transactions`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
  
        if (!response) {
          throw new Error('Some error occurred!');
        }
        
        const data: Invoice[] = response.data.data
        console.log(data)

        setInvoice(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchInvoice()
  }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center mb-20">
      {invoice && invoice.filter((eachInvoice) => eachInvoice.status === 'PENDING').length > 0 && (
        <>
          <h1 className="w-full text-left mb-2 font-medium">Pembayaran Pending</h1>
          {invoice
            .filter((eachInvoice) => eachInvoice.status === 'PENDING')
            .map((eachInvoice, index) => (
              <Link href={`/checkout/payment?invoiceId=${eachInvoice.id_invoice}`} key={index} className="w-full flex items-center justify-between mb-2 p-4 border border-gray-300 rounded-lg shadow-md">
                <div className="flex flex-col items-start justify-center">
                  <h1>ID Invoice: {eachInvoice.id_invoice}</h1>
                  <p>Tanggal pembelian: {
                    new Date(eachInvoice.tanggalPembelian).toLocaleString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                      year: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </p>
                </div>
                <h1 className="font-bold text-red-500">{eachInvoice.status.toUpperCase()}</h1>
              </Link>
            ))}
        </>
      )}

      {invoice && invoice.filter((eachInvoice) => eachInvoice.status === 'PAID').length > 0 && (
        <>
          <h1 className="w-full text-left mb-2 font-medium">Pembayaran Lunas</h1>
          {invoice
            .filter((eachInvoice) => eachInvoice.status === 'PAID')
            .map((eachInvoice, index) => (
              <div key={index} className="w-full flex items-center justify-between mb-2 p-4 border border-gray-300 rounded-lg shadow-md">
                <div className="flex flex-col items-start justify-center">
                  <h1 className="font-semibold">ID Invoice: {eachInvoice.id_invoice}</h1>
                  <p>Tanggal pembelian: {
                    new Date(eachInvoice.tanggalPembelian).toLocaleString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                      year: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </p>
                </div>
                <h1 className="font-bold text-darkaqua">{eachInvoice.status.toUpperCase()}</h1>
              </div>
            ))}
        </>
      )}
    </div>
  )
}

export default StatusTransaksi