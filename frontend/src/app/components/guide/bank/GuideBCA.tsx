import React from 'react'

const GuideBCA = () => {
  return (
    <div className="w-full max-w-96 custom-box-shadow bg-white flex flex-col items-center justify-center p-4 mt-6 rounded-lg">
      <div className="">
        <h1 className="font-medium">Panduan Pembayaran:</h1>
        <div className="text-sm">
          <p>1. Buka BCA mobile, pilih menu &quot;m-Transfer&quot;</p>
          <p>2. Pilih menu &quot;BCA Virtual Account&quot;</p>
          <p>3. Masukkan nomor BCA Virtual Account dan klik &quot;Send&quot;</p>
          <p>4. Cek detail transaksi dan nominal transfer</p>
          <p>5. Masukkan PIN m-BCA</p>
        </div>
      </div>
    </div>
  )
}

export default GuideBCA