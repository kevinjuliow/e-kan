import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon, XMarkNonSolidIcon } from '../icon';

const ZodAlamatFormSchema = z.object({
  alamatLengkap: z.string().min(1, "Minimum alamat is 1 characters"),
  kodePos: z.string().min(1, "Minimum alamat is 1 characters"),
  kota: z.string().min(1, "Minimum alamat is 1 characters"),
  provinsi: z.string().min(1, "Minimum alamat is 1 characters"),
  kabupaten: z.string().min(1, "Minimum alamat is 1 characters"),
  keterangan: z.string().optional(),
});

type AddAlamatFormSchema = z.infer<typeof ZodAlamatFormSchema>;

interface AddAlamatProps {
  handleToast: (toastType: string, message: string) => void;
  closeFormWindow: () => void;
}

const AddAlamat: React.FC<AddAlamatProps> = ({ handleToast, closeFormWindow }) => {
  const { data: session } = useSession()

  const { register, handleSubmit, reset, formState } = useForm<AddAlamatFormSchema>({
    resolver: zodResolver(ZodAlamatFormSchema),
  });

  const { errors } = formState;
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleForm = handleSubmit(async (values) => {
    console.log({values})
    console.log(process.env.API_BASEURL)
    setLoading(true)
    try {
      const response = await axios.post(`${process.env.API_BASEURL}/api/alamat`, {
        alamat_lengkap: values.alamatLengkap,
        kode_pos: values.kodePos,
        kota: values.kota,
        provinsi: values.provinsi,
        kabupaten: values.kabupaten,
        keterangan: values.keterangan
      }, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (response.status === 500) {
        throw new Error("Gagal menambahkan produk, coba lagi!")
      }

      handleToast("Berhasil menambahkan alamat!", "SUCCESS")
      reset()
      closeFormWindow()
    } catch (error) {
      if (error instanceof Error) {
        console.log("ERROR BOS")
        console.log(error)
        setError(error)
      }
    } finally {
      setLoading(false)
    }
  })

  return (
    <form className="grid grid-cols-2 auto-rows-auto gap-x-2 w-full mb-20" onSubmit={handleForm}>
      <div className="w-full flex flex-col mb-5 relative">
        <label htmlFor="kabupaten" className="mb-1 text-sm font-medium">Kabupaten</label>
        <input
          type="text"
          id="kabupaten"
          className="border border-darkaqua text-inherittext-gray-600 bg-transparent text-sm rounded-md px-2 py-1"
          placeholder="Kabupaten"
          required
          {...register("kabupaten")}
        />
        {errors?.kabupaten && <p className="absolute top-14 left-0 text-[12px] text-red-500">{errors.kabupaten?.message}</p>} 
      </div>

      <div className="w-full flex flex-col mb-5 relative">
        <label htmlFor="kodePos" className="mb-1 text-sm font-medium">Kode Pos</label>
        <input
          type="text"
          id="kodePos"
          className="border border-darkaqua text-inherittext-gray-600 bg-transparent text-sm rounded-md px-2 py-1"
          placeholder="Kode Post"
          required
          {...register("kodePos")}
        />
        {errors?.kodePos && <p className="absolute top-14 left-0 text-[12px] text-red-500">{errors.kodePos?.message}</p>} 
      </div>

      <div className="w-full flex flex-col mb-5 relative">
        <label htmlFor="kota" className="mb-1 text-sm font-medium">Kota</label>
        <input
          type="text"
          id="kota"
          className="border border-darkaqua text-inherittext-gray-600 bg-transparent text-sm rounded-md px-2 py-1"
          placeholder="Kota"
          required
            {...register("kota")}
        />
        {errors?.kota && <p className="absolute top-14 left-0 text-[12px] text-red-500">{errors.kota?.message}</p>} 
      </div>

      <div className="w-full flex flex-col mb-5 relative">
        <label htmlFor="provinsi" className="mb-1 text-sm font-medium">Provinsi</label>
        <input
          type="text"
          id="provinsi"
          className="border border-darkaqua text-inherittext-gray-600 bg-transparent text-sm rounded-md px-2 py-1"
          placeholder="Provinsi"
          required
          {...register("provinsi")}
        />
        {errors?.provinsi && <p className="absolute top-14 left-0 text-[12px] text-red-500">{errors.provinsi?.message}</p>} 
      </div>

      <div className="col-span-2 w-full flex flex-col mb-5 relative">
        <label htmlFor="namaLengkap" className="mb-1 text-sm font-medium">Alamat Lengkap</label>
        <input
          type="text"
          id="namaLengkap"
          className="border border-darkaqua text-inherittext-gray-600 bg-transparent text-sm rounded-md px-2 py-1"
          placeholder="Alamat lengkap"
          required
          {...register("alamatLengkap")}
        />
        {errors?.alamatLengkap && <p className="absolute top-14 left-0 text-[12px] text-red-500">{errors.alamatLengkap?.message}</p>} 
      </div>

      <div className="col-span-2 row-start-4 w-full flex flex-col mb-5 relative">
        <label htmlFor="keterangan" className="mb-1 text-sm font-medium">Keterangan (opsional)</label>
        <input
          type="text"
          id="keterangan"
          className="border border-darkaqua text-inherittext-gray-600 bg-transparent text-sm rounded-md px-2 py-1"
          placeholder="Keterangan"
          {...register("keterangan")}
        />
        {errors?.keterangan && <p className="absolute top-14 left-0 text-[12px] text-red-500">{errors.keterangan?.message}</p>} 
      </div>

      {error?.message && <p className="w-full text-center md:text-right absolute bottom-20 md:bottom-[-48px] right-0 text-sm mb-4 p-8 xl:p-0 text-red-500">{error?.message}</p>}
      <div className="col-span-2 row-start-5 justify-self-end flex items-center justify-center">
        <button onClick={closeFormWindow} className="flex w-32 top-56 left-0 items-center justify-center bg-red-500 text-white px-4 py-2 rounded-md">
          <div className="relative right-1">
            <XMarkNonSolidIcon size={20} hexColor={"#ffffff"} />
          </div>
          <p className="ms-1 text-sm relative top-0.5">Batal</p>
        </button>
        <button type="submit" className="ms-2 w-32 top-56 right-0 md:top-12 md:right-0 flex items-center justify-center bg-mediumaqua text-white px-4 py-2 rounded-md">
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
        </button>
      </div>
    </form>
  )
}

export default AddAlamat