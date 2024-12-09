"use client"

import { PembeliData } from 'app/interfaces/Item/types'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilEditIcon, SaveIcon, XMarkNonSolidIcon } from '../icon';
import { useRouter } from 'next/navigation';

const ZodUpdateFormSchema = z.object({
  namaLengkap: z.string().min(3, "Minimum name is 3 characters").optional(),
  noTelp: z.string().optional(),
  tanggalLahir: z.string().optional().transform((value) => {
    if (!value) {
      return undefined
    }
      const date = new Date(value);
    if (isNaN(date.getTime())) {
      return // throw error if date is invalid
    }
    return date;
  })
});

type ProfileUpdateFormSchema = z.infer<typeof ZodUpdateFormSchema>;

interface PembeliProfileProps {
  handleToast: (toastType: string) => void;
}

const PembeliProfile: React.FC<PembeliProfileProps> = ({ handleToast }) => {
  const { data: session, update } = useSession()
  const [userData, setUserData] = useState<PembeliData>()
  const [updateFormState, setUpdateFormState] = useState<boolean>(false)
  const router = useRouter()

  const { register, handleSubmit, formState } = useForm<ProfileUpdateFormSchema>({
    resolver: zodResolver(ZodUpdateFormSchema),
  });

  const { errors } = formState;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASEURL}/api/pembeli/profile`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        const data = response.data.data
        setUserData(data)
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log('Some error occured!')
        }
      }
    }

    fetchData()
  }, [session?.accessToken])

  const handleFormUpdate = handleSubmit(async (values) => {
    setLoading(true)
    try {
      const response = await axios.put(`${process.env.API_BASEURL}/api/pembeli/profile`, {
        "nama": values.namaLengkap,
        "no_telp": values.noTelp,
        "tanggal_lahir": values.tanggalLahir
      }, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      const data = await response.data.data;

      if (response.status === 400) {
        // throw new Error("Failed to create an account!\n" + data.message);
        throw new Error("Failed to update an account, please try again!");
      }

      // Updates the session data so the client and server data will be match
      await update({
        user: {
          name: data.nama
        }
      })

      handleToast("SUCCESS")
      // Refresh the page after successfully updated the profile data so the page display will also updated
      router.refresh()

    } catch (error) {
      if (error instanceof Error) {
        handleToast("WARNING")
        console.log(error.message)
      }
    } finally {
      setLoading(false);
      setUpdateFormState(false)
    }
  })

  const handleUpdateState = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setUpdateFormState(!updateFormState)
  }

  return (
    <form className="w-full mb-40 relative" onSubmit={handleFormUpdate}>
      <div className="w-full md:w-[50%] flex flex-col mb-5 relative">
        <label htmlFor="namaLengkap" className="mb-1 text-sm font-medium">Nama lengkap</label>
        <input
          defaultValue={userData?.nama}
          type="text"
          id="namaLengkap"
          className={`border ${updateFormState ? 'border-darkaqua text-inherit' : 'border-gray-300 text-gray-600'} bg-transparent text-sm rounded-md px-2 py-1`}
          placeholder="Nama lengkap"
          required
          disabled={!updateFormState}
          {...register("namaLengkap")}
        />
        {errors?.namaLengkap && <p className="absolute top-14 left-0 text-[12px] text-red-500">{errors.namaLengkap?.message}</p>} 
      </div>

      <div className="w-full md:w-[50%] flex flex-col mb-5 relative">
        <label htmlFor="noTelp" className="mb-1 text-sm font-medium">Nomor telepon</label>
        <input
          defaultValue={userData?.no_telp ? `${userData.no_telp}` : ''}
          type="text"
          id="noTelp"
          className={`border ${updateFormState ? 'border-darkaqua text-inherit' : 'border-gray-300 text-gray-600'} bg-transparent text-sm rounded-md px-2 py-1`}
          placeholder="Nomor telepon"
          required
          disabled={!updateFormState}
          {...register("noTelp")}
        />
        {errors?.noTelp && <p className="absolute top-14 left-0 text-[12px] text-red-500">{errors.noTelp?.message}</p>} 
      </div>

      <div className="w-full md:w-[50%] flex flex-col mb-5 relative">
        <label htmlFor="tanggalLahir" className="mb-1 text-sm font-medium">Tanggal lahir</label>
        <input
          defaultValue={userData?.tanggal_lahir?.split("T")[0]} // Takes only date part
          type="date"
          id="tanggalLahir"
          className={`border ${updateFormState ? 'border-darkaqua text-inherit' : 'border-gray-300 text-gray-600'} bg-transparent text-sm rounded-md px-2 py-1`}
          required
          disabled={!updateFormState}
          {...register("tanggalLahir")}
        />
        {errors?.tanggalLahir && <p className="absolute top-14 left-0 text-[12px] text-red-500">{errors.tanggalLahir?.message}</p>} 
      </div>

      <button onClick={(e) => handleUpdateState(e)} className="hidden md:flex w-32 absolute top-0 right-0 items-center justify-center bg-mediumaqua text-white px-4 py-2 rounded-md">
        <div className="relative right-1">
          <PencilEditIcon size={20} hexColor={"#ffffff"} />
        </div>
        <p className="ms-1 text-sm relative top-0.5">Edit Profil</p>
      </button>
      
      {!updateFormState && <button onClick={(e) => handleUpdateState(e)} className="flex md:hidden w-32 absolute top-56 left-0 items-center justify-center bg-mediumaqua text-white px-4 py-2 rounded-md">
        <div className="relative right-1">
          <PencilEditIcon size={20} hexColor={"#ffffff"} />
        </div>
        <p className="ms-1 text-sm relative top-0.5">Edit Profil</p>
      </button>}

      {updateFormState && 
      <button onClick={(e) => handleUpdateState(e)} className="hidden md:flex w-32 absolute top-0 right-0 items-center justify-center bg-red-500 text-white px-4 py-2 rounded-md">
        <div className="relative right-1">
          <XMarkNonSolidIcon size={20} hexColor={"#ffffff"} />
        </div>
        <p className="ms-1 text-sm relative top-0.5">Batal Edit</p>
      </button>}
      
      {updateFormState && 
      <button onClick={(e) => handleUpdateState(e)} className="flex md:hidden w-32 absolute top-56 left-0 items-center justify-center bg-red-500 text-white px-4 py-2 rounded-md">
        <div className="relative right-1">
          <XMarkNonSolidIcon size={20} hexColor={"#ffffff"} />
        </div>
        <p className="ms-1 text-sm relative top-0.5">Batal Edit</p>
      </button>}

      {updateFormState && 
      <button type="submit" className="w-32 absolute top-56 right-0 md:top-12 md:right-0 flex items-center justify-center bg-mediumaqua text-white px-4 py-2 rounded-md">
        {loading ? 
          <div role="status" className="">
            <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          : <>
            <div className="relative right-1">
              <SaveIcon size={20} hexColor={"#ffffff"} />
            </div>
            <p className="ms-1 text-sm relative top-0.5">Simpan</p>
          </>}
      </button>}
    </form>
  )
}

export default PembeliProfile