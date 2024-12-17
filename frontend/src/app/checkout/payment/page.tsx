"use client"

import ArrowBackButton from 'app/components/button/ArrowBackButton';
import GuideBCA from 'app/components/guide/bank/GuideBCA';
import GuideBNI from 'app/components/guide/bank/GuideBNI';
import GuideBRI from 'app/components/guide/bank/GuideBRI';
import GuideCIMB from 'app/components/guide/bank/GuideCIMB';
import { CheckNonSolidIcon, CopyIcon } from 'app/components/icon';
import { Invoice } from 'app/interfaces/Item/types';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Payment = () => {
  const { data: session } = useSession()
  const params = useSearchParams();
  const invoiceId = params.get('invoiceId') || '';
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    const fetchAlamat = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASEURL}/api/transactions/${invoiceId}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        if (!response) {
          throw new Error('Some error occurred!');
        }

        setInvoice(response.data.data ?? null)
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    }

    fetchAlamat()
  }, [])

  useEffect(() => {
    console.log({ invoice })
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(invoice?.vaNumbers.va_number ?? "")
      .then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      })
      .catch((error) => {
        console.error('Copy failed:', error)
        alert('Failed to copy text')
      });
  };

  return (
    <>
    <div className="w-full flex items-center justify-center mt-24">
      <div className="bgdashboard-wave"></div>
      <div className="max-w-screen-md w-full h-full relative p-8 xl:px-0 flex flex-col items-center justify-center">
        <div className="flex items-center mb-4 w-full">
          <ArrowBackButton url={"/dashboard"} size={20} hexColor={"#1f2937"} />
          <h1 className="text-2xl font-bold text-left w-full ms-2">Pembayaran</h1>
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="mb-2 text-lg font-medium">{invoice?.vaNumbers.bank.toUpperCase()} Virtual Account</h1>
          <div className="w-full max-w-96 custom-box-shadow bg-white flex items-center justify-between p-2 rounded-lg">
            <h1 className="font-medium text-lg w-full text-center">{invoice?.vaNumbers.va_number}</h1>
            <button onClick={handleCopy} className="w-32 border py-1 custom-hover-button cursor-pointer rounded-md font-medium bg-darkaqua text-white border-none">
              {isCopied ?
              <div className="flex items-center justify-center relative">
                <CheckNonSolidIcon size={20} hexColor={"#ffffff"} />
                <p className="ms-1 relative top-[1px]">Copied</p>
              </div> :
              <div className="flex items-center justify-center relative">
                <CopyIcon size={20} hexColor={"#ffffff"} />
                <p className="ms-1 relative top-[1px]">Copy</p>
              </div>}
            </button>
          </div>
        </div>

        {invoice?.vaNumbers.bank === 'bca' && <GuideBCA />}
        {invoice?.vaNumbers.bank === 'bri' && <GuideBRI />}
        {invoice?.vaNumbers.bank === 'bni' && <GuideBNI />}
        {invoice?.vaNumbers.bank === 'cimb' && <GuideCIMB />}

      </div>
    </div>
    </>
  )
}

export default Payment