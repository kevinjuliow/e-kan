import { Alamat } from 'app/interfaces/Item/types';
import React from 'react'
import { Trash } from '../icon';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Props {
  data: Alamat;
  handleToast: (toastType: string, message: string) => void;
  onAlamatRemoved: () => void;
}

const EachAlamat: React.FC<Props> = ({ data, handleToast, onAlamatRemoved }) => {
  const { data: session } = useSession()
  console.log({data})

  const handleDeleteAlamat = async () => {
    console.log("CLICK DELETE")
    try {
      const response = await axios.delete(`${process.env.API_BASEURL}/api/alamat/${data.id_alamat}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        }
      })

      if (response.status !== 200) {
        throw new Error('Something went wrong when deleting an alamat!')
      }

      handleToast("Berhasil menghapus alamat!", "SUCCESS")
      onAlamatRemoved()
    } catch (error) {
      if (error instanceof Error) {
        handleToast("Gagal menghapus alamat, coba lagi!", "WARNING")
        console.log(error.message)
      }
    }
  }

  return (
    <div className="w-full flex items-center justify-between mb-2 border border-gray-300 rounded-lg">
      {data.keterangan ? 
      <>
        <div className="w-full flex flex-col items-start p-2">
          <div className="w-full border-r border-gray-300">
            <p className="">
              {`${data.alamat_lengkap}, RT ${data.rt}/RW ${data.rw}, ${data.kecamatan}, ${data.kabupaten}, ${data.provinsi}, ${data.kode_pos}`}
            </p>
            <p className="text-justify pr-2">
              {`Keterangan: ${data.keterangan}`}
            </p>
          </div>
        </div>
        <button className="pl-2 pr-4" onClick={handleDeleteAlamat}>
          <Trash size={24} hexColor={"#ef4444"} />
        </button>
      </>
      :
      <>
        <p className="w-full px-2 border-r border-gray-300">
        {`${data.alamat_lengkap} RT ${data.rt}/RW ${data.rw}, ${data.kecamatan}, ${data.kabupaten}, ${data.provinsi}, ${data.kode_pos}`}
        </p>
        <button className="px-4 py-2" onClick={handleDeleteAlamat}>
          <Trash size={24} hexColor={"#ef4444"} />
        </button>
      </>}
    </div>
  )
}

export default EachAlamat