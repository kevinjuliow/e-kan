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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#007575" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.996 9c1.413 0 2.16-.747 2.705-1.293.49-.49.731-.707 1.292-.707s.802.217 1.292.707C11.83 8.253 12.577 9 13.991 9c1.415 0 2.163-.747 2.71-1.293.491-.49.732-.707 1.295-.707s.804.217 1.295.707C19.837 8.253 20.585 9 22 9V7c-.563 0-.804-.217-1.295-.707C20.159 5.747 19.411 5 17.996 5s-2.162.747-2.709 1.292c-.491.491-.731.708-1.296.708-.562 0-.802-.217-1.292-.707C12.154 5.747 11.407 5 9.993 5s-2.161.747-2.706 1.293c-.49.49-.73.707-1.291.707s-.801-.217-1.291-.707C4.16 5.747 3.413 5 2 5v2c.561 0 .801.217 1.291.707C3.836 8.253 4.583 9 5.996 9zm0 5c1.413 0 2.16-.747 2.705-1.293.49-.49.731-.707 1.292-.707s.802.217 1.292.707c.545.546 1.292 1.293 2.706 1.293 1.415 0 2.163-.747 2.71-1.293.491-.49.732-.707 1.295-.707s.804.217 1.295.707C19.837 13.253 20.585 14 22 14v-2c-.563 0-.804-.217-1.295-.707-.546-.546-1.294-1.293-2.709-1.293s-2.162.747-2.709 1.292c-.491.491-.731.708-1.296.708-.562 0-.802-.217-1.292-.707C12.154 10.747 11.407 10 9.993 10s-2.161.747-2.706 1.293c-.49.49-.73.707-1.291.707s-.801-.217-1.291-.707C4.16 10.747 3.413 10 2 10v2c.561 0 .801.217 1.291.707C3.836 13.253 4.583 14 5.996 14zm0 5c1.413 0 2.16-.747 2.705-1.293.49-.49.731-.707 1.292-.707s.802.217 1.292.707c.545.546 1.292 1.293 2.706 1.293 1.415 0 2.163-.747 2.71-1.293.491-.49.732-.707 1.295-.707s.804.217 1.295.707C19.837 18.253 20.585 19 22 19v-2c-.563 0-.804-.217-1.295-.707-.546-.546-1.294-1.293-2.709-1.293s-2.162.747-2.709 1.292c-.491.491-.731.708-1.296.708-.562 0-.802-.217-1.292-.707C12.154 15.747 11.407 15 9.993 15s-2.161.747-2.706 1.293c-.49.49-.73.707-1.291.707s-.801-.217-1.291-.707C4.16 15.747 3.413 15 2 15v2c.561 0 .801.217 1.291.707C3.836 18.253 4.583 19 5.996 19z"/>
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
