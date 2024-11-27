"use client"

import ArrowBackButton from 'app/components/button/ArrowBackButton'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { SaveIcon } from 'app/components/icon';
import { useSession } from 'next-auth/react';
import { Toast, useToast } from 'app/components/toast/Toast';

const ZodAddProductFormSchema = z.object({
  namaIkan: z.string().min(3, "Minimum name is 3 characters"),
  jenisBibit: z.string().refine((value) => value !== "", {
    message: "Jenis bibit harus dipilih",
  }),
  jenisHabitat: z.string().refine((value) => value !== "", {
    message: "Jenis habitat harus dipilih",
  }),
  harga: z.string().transform((value) => Number(value)).refine((value) => value >= 1, {
    message: "Harga minimal Rp1"
  }),
  stock: z.string().transform((value) => Number(value)),
  ukuranIkan: z.string().nullable().optional(),
  tipePenjualan: z.string().refine((value) => value !== "", {
    message: "Tipe penjualan harus dipilih",
  }),
  description: z.string().min(25, "Minimum description is 25 characters")
});

type AddProductFormSchema = z.infer<typeof ZodAddProductFormSchema>;

const AddProduct = () => {
  const { data: session } = useSession()

  const { register, handleSubmit, watch, reset, formState } = useForm<AddProductFormSchema>({
    resolver: zodResolver(ZodAddProductFormSchema),
  });

  const { errors } = formState;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const { message, toastType, showToast } = useToast()

  const isTipePenjualan = watch("tipePenjualan")

  const handleForm = handleSubmit(async (values) => {
    console.log(process.env.API_BASEURL)
    setLoading(true)
    try {
      const response = await axios.post(`${process.env.API_BASEURL}/api/items`, {
        nama: values.namaIkan,
        jenis_habitat: values.jenisHabitat,
        jenis_bibit: values.jenisBibit,
        harga: values.harga,
        description: values.description,
        stock: values.stock,
        tipe_penjualan: values.tipePenjualan,
        ukuran_ikan: values.ukuranIkan
      }, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (response.status === 500) {
        throw new Error("Gagal menambahkan produk, coba lagi!")
      }

      showToast("Berhasil menambahkan " + values.namaIkan + " ke daftar produk!", "SUCCESS")
      reset()
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

  const [image, setImage] = useState<string | null>(null);

  // CANNOT ADD PRODUCT IMAGE YET 
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Optional chaining to safely access the file
    if (file) {
      setImage(URL.createObjectURL(file)); // Save the image URL
    } else {
      console.error('No file selected');
    }
  };

  // const handleImageReset = () => {
  //   setImage(null);
  // };

  return (
    <div className="w-full flex items-center justify-center mt-24">
      <div className={`bgdashboard-wave`}></div>
      <div className="max-w-screen-xl w-full h-full relative p-8 xl:px-0 flex flex-col items-center justify-center">
        <div className="flex items-center mb-4 w-full">
          <ArrowBackButton url={"/dashboard"} size={20} hexColor={"#1f2937"} />
          <h1 className="text-2xl font-bold text-left w-full ms-2">Tambah Produk</h1>
        </div>

        <form className="w-full grid grid-cols-2 md:grid-cols-3 grid-rows-auto gap-0" onSubmit={handleForm}>

          {/* Nama */}
          <div className="col-span-2 flex flex-col">
            <label htmlFor="nama" className="font-medium mb-1">Nama Ikan</label>
            <input
              type="text"
              id="nama"
              className="h-10 bg-white bg-opacity-75 rounded-md px-2 py-2 text-sm focus:outline-none"
              placeholder={"Contoh: Lele"}
              required
              {...register("namaIkan")}
            />
            {errors?.namaIkan && <p className="text-sm my-1 text-red-500">{errors.namaIkan?.message}</p>}
          </div>

          {/* Jenis Bibit */}
          <div className="md:col-start-1 row-start-2 flex flex-col mt-2">
            <label htmlFor="jenisBibit" className="font-medium mb-1">Jenis Bibit</label>
            <select
              id="jenisBibit"
              className="h-10 bg-white bg-opacity-75 rounded-md px-2 py-2 text-sm focus:outline-none"
              {...register("jenisBibit")}
            >
              <option value={""}>Klik untuk memilih</option>
              <option value={"Benih"}>Benih</option>
              <option value={"Calon Induk"}>Calon Induk</option>
              <option value={"Induk"}>Induk</option>
            </select>
            {errors?.jenisBibit && <p className="text-sm my-1 text-red-500">{errors.jenisBibit?.message}</p>}
          </div>

          {/* Jenis Habitat */}
          <div className="md:col-start-2 row-start-2 flex flex-col mt-2 ms-2">
            <label htmlFor="jenisHabitat" className="font-medium mb-1">Jenis Habitat</label>
            <select
              id="jenisHabitat"
              className="h-10 bg-white bg-opacity-75 rounded-md px-2 py-2 text-sm focus:outline-none"
              {...register("jenisHabitat")}
            >
              <option value={""}>Klik untuk memilih</option>
              <option value={"Tawar"}>Tawar</option>
              <option value={"Payau"}>Payau</option>
              <option value={"Asin"}>Asin</option>
            </select>
            {errors?.jenisHabitat && <p className="text-sm my-1 text-red-500">{errors.jenisHabitat?.message}</p>}
          </div>

          {/* Harga */}
          <div className="md:col-start-1 md:row-start-3 relative flex flex-col mt-2 ms-2 md:ms-0">
            <label htmlFor="harga" className="font-medium mb-1">Harga</label>
            <div className="w-full relative">
              <p className="absolute bottom-2 left-2 font-medium text-sm">Rp</p>
              <input
                type="number"
                id="harga"
                className="h-10 w-full bg-white bg-opacity-75 rounded-md pl-8 pr-2 py-2 text-sm focus:outline-none"
                required
                {...register("harga")}
              />
            </div>
            {errors?.harga && <p className="text-sm my-1 text-red-500">{errors.harga?.message}</p>}
          </div>

          {/* Stock */}
          <div className="md:col-start-2 row-start-3 flex flex-col mt-2 md:ms-2">
            <label htmlFor="stock" className="font-medium mb-1">Stock</label>
            <input
              type="number"
              id="stock"
              className="h-10 bg-white bg-opacity-75 rounded-md px-2 py-2 text-sm focus:outline-none"
              required
              {...register("stock")}
            />
            {errors?.stock && <p className="text-sm my-1 text-red-500">{errors.stock?.message}</p>}
          </div>

          {/* Tipe Penjualan (ekor, PO, paket) */}
          <div className="md:col-start-1 row-start-4 relative flex flex-col mt-2">
            <label htmlFor="tipePenjualan" className="font-medium mb-1">Tipe Penjualan</label>
            <select
              id="tipePenjualan"
              className="h-10 bg-white bg-opacity-75 rounded-md px-2 py-2 text-sm focus:outline-none"
              {...register("tipePenjualan")}
            >
              <option value={""}>Klik untuk memilih</option>
              <option value={"Ekor"}>Ekor</option>
              <option value={"PO (Pre-order)"}>PO (Pre-order)</option>
              <option value={"Paket"}>Paket</option>
            </select>
            {errors?.tipePenjualan && <p className="text-sm my-1 text-red-500">{errors.tipePenjualan?.message}</p>}
          </div>

          {/* Ukuran Ikan (opsional) */}
          <div className={`md:col-start-2 md:row-start-4 flex flex-col mt-2 ms-2 ${isTipePenjualan !== 'Ekor' && 'text-gray-400 cursor-not-allowed'}`}>
            <label htmlFor="ukuranIkan" className={`font-medium mb-1 ${isTipePenjualan !== 'Ekor' && 'text-gray-400'}`}>Ukuran Ikan</label>
            <div className="w-full relative">
              <input
                type="text"
                id="ukuranIkan"
                className={`h-10 w-full bg-white bg-opacity-75 rounded-md px-2 py-2 text-sm focus:outline-none ${isTipePenjualan !== 'Ekor' && 'cursor-not-allowed'}`}
                placeholder={"Contoh: 1-10 cm"}
                disabled={isTipePenjualan !== 'Ekor' && true}
                {...register("ukuranIkan")}
              />
              <p className={`absolute bottom-2 right-2 font-medium text-sm ${isTipePenjualan !== 'Ekor' && 'text-gray-400'}`}>cm</p>
            </div>
            {errors?.ukuranIkan && <p className="text-sm my-1 text-red-500">{errors.ukuranIkan?.message}</p>}
          </div>

          {/* Deskripsi */}
          <div className="col-span-2 md:col-start-1 md:row-start-5 flex flex-col relative mt-2">
            <label htmlFor="description" className="font-medium mb-1">Deskripsi Produk</label>
            <textarea
              typeof="text"
              id="description"
              className="h-18 resize-none bg-white bg-opacity-75 rounded-md px-2 py-2 text-sm focus:outline-none" 
              placeholder={"Masukkan deskripsi dari produk di sini..."}
              rows={4}
              {...register("description")}
            />
            {errors?.description && <p className="absolute top-32 text-sm my-1 text-red-500">{errors.description?.message}</p>}
          </div>

          {/* Add Image & Image Preview */}
          <div className={`col-span-2 md:col-span-2 md:row-span-5 md:col-start-3 row-start-6 md:row-start-1 flex flex-col h-full max-h-[360px] md:max-h-full ${errors.description ? 'mt-8 md:mt-0' : 'mt-2 md:mt-0'} mb-80 md:mb-0 md:ms-2`}>
            <label htmlFor="addImage" className="font-medium mb-1">Gambar Produk</label>
            <div className="h-full flex flex-col bg-white bg-opacity-75 rounded-lg p-2">
              <input onChange={handleImageUpload} accept={"image/png, image/jpeg"} className="block w-full text-sm text-gray-900 rounded-lg cursor-pointer bg-white border-2 border-lightaqua focus:outline-none p-2" aria-describedby="file_input_help" id="file_input" type="file" />
              <p className="mt-1 text-xs text-gray-500 mb-2" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
              <div className="flex flex-col w-full h-full">
                {image ? <img src={image ?? ''} alt={"gambar ikan"} className="w-full min-w-full h-[240px]" /> : <p className="text-sm flex items-center justify-center h-full">Belum ada gambar ditambahkan</p> }
              </div>
            </div>
            {errors?.namaIkan && <p className="text-sm my-1 text-red-500">{errors.namaIkan?.message}</p>}
          </div>

          {error?.message && <p className="w-full text-center md:text-right absolute bottom-9 md:bottom-[-48px] right-0 text-sm mb-4 p-8 xl:p-0 text-red-500">{error?.message}</p>}
          <div className="col-span-2 row-start-7 md:col-span-3 md:row-start-6 text-right mt-0 md:mt-6 w-full relative md:static bottom-20">
            {/* <button type={"submit"} className="w-52 border py-1 custom-hover-button cursor-pointer rounded-md font-medium bg-darkaqua text-white border-none">Tambah</button> */}
            <button type="submit"
              className="w-full md:w-52 border px-5 py-2.5 custom-hover-button cursor-pointer rounded-md bg-darkaqua text-white border-none text-sm">
              {
                loading ? 
                <div role="status" className="">
                    <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
                : 
                <div className="flex items-center justify-center relative">
                  <SaveIcon size={20} hexColor={"#ffffff"} />
                  <p className="ms-2 relative top-0.5">Tambah Produk</p>
                </div>
              }
            </button>
          </div>
        </form>

      </div>
      {message && <Toast message={message} toastType={toastType ?? "SUCCESS"} onClose={() => {}} />}
    </div>
  )
}

export default AddProduct