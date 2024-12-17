import React from 'react'

const GuideBNI = () => {
  return (
    <div className="w-full max-w-96 custom-box-shadow bg-white flex flex-col items-center justify-center p-4 mt-6 rounded-lg">
      <div className="">
        <h1 className="font-medium">Panduan Pembayaran:</h1>
        <div className="text-sm">
        <p>1. Akses BNI Mobile Banking dari handphone kemudian masukkan user ID dan password.</p>
        <p>2. Pilih menu "Transfer".</p>
        <p>3. Pilih menu "Virtual Account Billing" kemudian pilih rekening debet.</p>
        <p>4. Masukkan nomor Virtual Account Anda pada menu "input baru".</p>
        <p>5. Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi</p>
        <p>6. Konfirmasi transaksi dan masukkan password transaksi.</p>
        </div>
      </div>
    </div>
  )
}

export default GuideBNI