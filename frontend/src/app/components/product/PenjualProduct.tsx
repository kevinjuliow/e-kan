import { Item } from 'app/interfaces/Item/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EachItemForPenjualProfile from '../item/EachItemForPenjualProfile'

const PenjualProduct = ({ penjualId }: { penjualId: string }) => {
  const [itemData, setItemData] = useState<Item[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASEURL}/api/items/penjual/${penjualId}`)

        if (!response) {
          throw new Error('Some error occurred!')
        }

        const data: Item[] = response.data.data
        setItemData(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
    console.log("RUN ONCEEEE")
  }, [penjualId])

  // Check data from API
  useEffect(() => {
    console.log({ itemData });
  }, [itemData]);

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 items-center justify-center w-full ${!itemData && 'h-full mt-56 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1'} mb-16 md:mb-0`}>
      {itemData ? itemData.map((item, index) => {
        return(
          <EachItemForPenjualProfile key={index} data={item} />
        )
      }) :
      <div className="col-span-5 w-full flex flex-col items-center justify-center">
        <h1 className="font-black text-3xl md:text-5xl">BELUM ADA IKAN YANG DIJUAL!</h1>
      </div>}
    </div>
  )
}

export default PenjualProduct