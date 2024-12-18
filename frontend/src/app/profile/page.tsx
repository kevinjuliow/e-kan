"use client"

import React, { useEffect, useState } from 'react'
import { BoxOrderIcon, MapIcon, PencilEditIcon, ReceiptIcon, UserIcon } from 'app/components/icon'
import PembeliProfile from 'app/components/profile/PembeliProfile'
import PenjualProfile from 'app/components/profile/PenjualProfile'
import { Toast, useToast } from 'app/components/toast/Toast'
import ArrowBackButton from 'app/components/button/ArrowBackButton'
import { useSession } from 'next-auth/react'
import StatusTransaksi from 'app/components/profile/StatusTransaksi'
import ProfileImageCropper from 'app/components/cropper/ProfileImageCropper'
import { useUser } from 'app/userprovider'
import Alamat from 'app/components/profile/Alamat'
import AddAlamat from 'app/components/profile/AddAlamat'
import PesananMasuk from 'app/components/profile/PesananMasuk'

const Profile = () => {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState<string | 'account' | 'alamat' | 'riwayat' | 'produkpesanan'>('account')
  const { message, toastType, showToast } = useToast()
  const [openAddImage, setOpenAddImage] = useState<boolean>(false);
  const [openAddAlamat, setOpenAddAlamat] = useState<boolean>(false);
  const { userImage, fetchUserImage } = useUser()

  const handleToast = (message: string, toastType: string) => {
    showToast(message, toastType)
  }

  const handleOpenUpdateProfilePictureForm = () => {
    setOpenAddImage(!openAddImage)
  }

  const handleOpenAddAlamatForm = () => {
    setOpenAddAlamat(!openAddAlamat)
  }

   // Watch activeTab for changes and reset openAddAlamat
   useEffect(() => {
    if (activeTab === 'alamat') {
      setOpenAddAlamat(false)
    }
  }, [activeTab])

  return (
    <>
    <div className="w-full flex items-center justify-center mt-24">
      <div className={`bgdashboard-wave`}></div>
      <div className="max-w-screen-md w-full h-full relative p-8 xl:px-0 flex flex-col items-center justify-center">
        <div className="flex items-center mb-4 w-full">
          <ArrowBackButton url={"/dashboard"} size={20} hexColor={"#1f2937"} />
          <h1 className="text-2xl font-bold text-left w-full ms-2">Profil</h1>
        </div>

        <div className="w-full flex items-start mt-4">
          <div className="relative">
            <button onClick={handleOpenUpdateProfilePictureForm}>
              <img src={userImage ?? '/default_profile.png'} alt="profile image" className="rounded-full border-2 border-darkaqua w-full max-w-40 h-auto" />
              <div className="absolute bottom-2 right-2 bg-darkaqua rounded-full p-1.5 z-20">
                <PencilEditIcon size={18} hexColor={"#ffffff"} />
              </div>
            </button>
          </div>
          <div className="ms-4 mt-2 w-full flex flex-col">
            <div className="w-full flex flex-col bg-transparent rounded-lg">
              <h1 className="font-bold text-xl md:text-3xl">{session?.user.name}</h1>
              <h2 className="text-sm font-light">{session?.user.email}</h2>
            </div>
            <h2 className="font-medium mt-1 text-lg text-gray-500">{session?.user.userType.toUpperCase()}</h2>
          </div>
        </div>
        
        {/* Menu tabs */}
        <div className="mt-8 w-full border-b border-gray-400 flex">
          <ul className="flex flex-wrap text-sm font-medium text-center">
            <li className="w-24 sm:w-40">
              <button onClick={() => setActiveTab('account')} className={`relative w-full flex items-center justify-center px-4 py-2 rounded-t-lg group ${activeTab === 'account' ? 'bg-mediumaqua text-white' : 'bg-none text-darkaqua'}`}>
                <UserIcon size={24} hexColor={`${activeTab === 'account' ? "#ffffff" : "#007575"}`} />
                <p className="ps-1 relative top-0.5 hidden sm:block">Akun Saya</p>
              </button>
            </li>
            {session?.user.userType === 'PEMBELI' ? (
            <>
              <li className="w-24 sm:w-40">
                <button onClick={() => setActiveTab('alamat')} className={`relative w-full flex items-center justify-center px-4 py-2 rounded-t-lg group ${activeTab === 'alamat' ? 'bg-mediumaqua text-white' : 'bg-none text-darkaqua'}`} aria-current="page">
                  <MapIcon size={24} hexColor={`${activeTab === 'alamat' ? "#ffffff" : "#007575"}`} />
                  <p className="ps-1 relative top-0.5 hidden sm:block">Alamat Saya</p>
                </button>
              </li>
              <li className="w-24 sm:w-40">
                <button onClick={() => setActiveTab('riwayat')} className={`relative w-full flex items-center justify-center px-4 py-2 rounded-t-lg group ${activeTab === 'riwayat' ? 'bg-mediumaqua text-white' : 'bg-none text-darkaqua'}`} aria-current="page">
                  <ReceiptIcon size={24} hexColor={`${activeTab === 'riwayat' ? "#ffffff" : "#007575"}`} />
                  <p className="ps-1 relative top-0.5 hidden sm:block">Status Transaksi</p>
                </button>
              </li>
            </>
            ) : 
            <li className="w-24 sm:w-40">
              <button onClick={() => setActiveTab('produkpesanan')} className={`relative w-full flex items-center justify-center px-4 py-2 rounded-t-lg group ${activeTab === 'produkpesanan' ? 'bg-mediumaqua text-white' : 'bg-none text-darkaqua'}`} aria-current="page">
                <BoxOrderIcon size={24} hexColor={`${activeTab === 'produkpesanan' ? "#ffffff" : "#007575"}`} />
                <p className="ps-1 relative top-0.5 hidden sm:block">Pesanan Masuk</p>
              </button>
            </li>
            }
          </ul>
        </div>

        {/* Content selected by menu tab */}
        <div className="w-full mt-4">
          {activeTab === 'account' && (session?.user.userType === 'PEMBELI' ? <PembeliProfile handleToast={handleToast} /> : <PenjualProfile handleToast={handleToast} />)}
          {activeTab === 'alamat' && !openAddAlamat && session?.user.userType === 'PEMBELI' && <Alamat handleToast={handleToast} closeFormWindow={handleOpenAddAlamatForm} />}
          {activeTab === 'alamat' && openAddAlamat && session?.user.userType === 'PEMBELI' && <AddAlamat handleToast={handleToast} closeFormWindow={handleOpenAddAlamatForm} />}
          {activeTab === 'riwayat' && session?.user.userType === 'PEMBELI' && <StatusTransaksi />}
          {activeTab === 'produkpesanan' && session?.user.userType === 'PENJUAL' && <PesananMasuk />}
        </div>
        {message && <Toast message={message} toastType={toastType ?? "SUCCESS"} onClose={() => {}} />}
      </div>
    </div>
    {openAddImage && <ProfileImageCropper handleToast={handleToast} closeCropperWindow={handleOpenUpdateProfilePictureForm} onRefetch={fetchUserImage} />}
    </>
  )
}

export default Profile