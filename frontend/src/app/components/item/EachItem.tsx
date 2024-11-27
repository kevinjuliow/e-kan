import { Item } from "app/interfaces/Item/types";
// import Image from "next/image";
import React from "react";
import { CartAddIcon } from "../icon";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link"
import { Toast, useToast } from "../toast/Toast";

interface Props {
  data: Item;
}

const EachItem: React.FC<Props> = ({ data }) => {
  const { data: session } = useSession()
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<Error>()
  const { message, toastType, showToast } = useToast()

  const handleAddToCart = async () => {
    console.log(process.env.API_BASEURL)
    // setLoading(true)
    try {
      await axios.post(`${process.env.API_BASEURL}/api/cart/add/${data.id_item}`, {
        jumlah_item: 1
      }, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      showToast("Berhasil menambahkan " + data.nama + " ke dalam keranjang!", "SUCCESS")
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        showToast("Gagal menambahkan item ke keranjang, item sudah ditambahkan!", "WARNING");
      } else if (error instanceof Error) {
        showToast(error.message ?? "Error ketika ingin menambahkan item ke keranjang, coba lagi!", "WARNING");
      }
    } finally {
      // setLoading(false);
    }
  }

  return (
      <div className="flex items-center justify-center">
        <div className="w-full">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            {!!session && session?.user?.userType === 'PEMBELI' &&
            <div className="absolute p-4 z-[40] cursor-pointer" onClick={handleAddToCart}>     
              <CartAddIcon size={32} hexColor={"#ffffff"} />
            </div>}
            <Link href={`/product/item/${data.id_item}`}>
              <Image src={"/pexels-crisdip-35358-128756.jpg"} width={192} height={192} className="w-full" alt="gambar ikan" />
            </Link>
            <div className="p-4">
              <p className="uppercase tracking-wider text-sm font-bold text-darkaqua mb-2">{data.nama}</p>
              <p className="text-2xl text-darkaqua">Rp{data.harga}</p>
              <p className="text-mediumaqua text-xs">*Harga per {data.tipe_penjualan}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-t border-gray-300 text-darkaqua">
              <div className="flex items-center">
                <svg width="20px" height="20px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#007575">
                  <path d="M10.5 9C10.5 9 10.5 7 9.5 5C13.5 5 16 7.49997 16 7.49997C16 7.49997 19.5 7 22 12C21 17.5 16 18 16 18L12 20.5C12 20.5 12 19.5 12 17.5C9.5 16.5 6.99998 14 7 12.5C7.00001 11 10.5 9 10.5 9ZM10.5 9C10.5 9 11.5 8.5 12.5 8.5" stroke="#007575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M2 9.5L3 12.5L2 15.5C2 15.5 7 15.5 7 12.5C7 9.5 2 9.5 2 9.5Z" stroke="#007575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M17 12.01L17.01 11.9989" stroke="#007575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p className="font-light ms-1 text-sm">{data.jenis_bibit}</p>
              </div>
              <div className="flex items-center mt-1 sm:mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#007575">
                  <path d="M0 0h24v24H0z" fill="none"/><path d="M12 2l-5.5 9h11z"/><circle cx="17.5" cy="17.5" r="4.5"/><path d="M3 13.5h8v8H3z"/>
                </svg>
                <p className="font-light ms-1 text-sm">{data.jenis_habitat}</p>
              </div>
            </div>
            {message && <Toast message={message} toastType={toastType ?? "SUCCESS"} onClose={() => {}} />}
          </div>
        </div>
    </div>
  );
};

export default EachItem;
