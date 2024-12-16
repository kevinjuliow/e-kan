import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Alamat as AlamatType } from 'app/interfaces/Item/types';
import EachAlamat from './EachAlamat';
import { PlusNonSolid } from '../icon';

interface AlamatProps {
  handleToast: (toastType: string, message: string) => void;
  closeFormWindow: () => void;
}

const Alamat: React.FC<AlamatProps> = ({ handleToast, closeFormWindow }) => {
  const { data: session } = useSession()
  const [alamatData, setAlamatData] = useState<AlamatType[] | null>(null)

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.API_BASEURL}/api/alamat`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      const data = response.data.data
      setAlamatData(data)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('Some error occured!')
      }
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [session?.accessToken])

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {alamatData ? alamatData.map((alamat, index) => {
          return(
            <EachAlamat key={index} data={alamat} handleToast={handleToast} onAlamatRemoved={fetchData} />
          )
        }) : <h1 className="w-full text-center text-sm">Belum ada alamat ditambahkan!</h1> }
        <button onClick={closeFormWindow} className="flex items-center justify-center text-sm relative border border-darkaqua px-2 py-1 rounded-lg mt-4">
          <PlusNonSolid size={20} hexColor={"#007575"} />
          <p className="relative top-0.5 ms-1">Tambah Alamat</p>
        </button>
      </div>
    </>
  )
}

export default Alamat