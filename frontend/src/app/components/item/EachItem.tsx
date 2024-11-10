import { Item } from "app/interfaces/Item/types";
// import Image from "next/image";
import React from "react";

interface Props {
  data: Item;
}

const EachItem: React.FC<Props> = ({ data }) => {
  return (
      <div className="flex items-center justify-center">
        <div className="w-full">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-cover bg-center h-48 p-4" style={{ backgroundImage: `url("/pexels-crisdip-35358-128756.jpg")` }}>
              <div className="flex justify-end">
                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff">
                  <path d="M3 6H22L19 16H6L3 6ZM3 6L2.25 3.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M9.99219 11H11.9922M13.9922 11H11.9922M11.9922 11V9M11.9922 11V13" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M11 19.5C11 20.3284 10.3284 21 9.5 21C8.67157 21 8 20.3284 8 19.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M17 19.5C17 20.3284 16.3284 21 15.5 21C14.6716 21 14 20.3284 14 19.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <p className="uppercase tracking-wider text-sm font-bold text-darkaqua mb-2">{data.nama}</p>
              <p className="text-2xl text-darkaqua">Rp{data.harga}</p>
              <p className="text-mediumaqua text-xs">*Harga per paket</p>
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
          </div>
        </div>
    </div>
  );
};

export default EachItem;
