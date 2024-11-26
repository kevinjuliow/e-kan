import { Item } from 'app/interfaces/Item/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EachItem from './EachItem'

interface ShowItemProps {
  searchQuery: string
}

const ShowItem: React.FC<ShowItemProps> = ({ searchQuery }) => {
  const [itemData, setItemData] = useState<Item[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASEURL}/api/items`)

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
  }, [])

  // Check data from API
  useEffect(() => {
    console.log({ itemData });
  }, [itemData]);

  // Filter the items based on searchQuery
  const filteredItems = itemData.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by item name
  )

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center w-full mt-12 ${!itemData && 'h-full mt-56 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1'}`}>
      {filteredItems.length > 0 && filteredItems.map((item, index) => {
        return(
          <EachItem key={index} data={item} />
        )
      })}
      {!itemData && 
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="font-black text-5xl">MOHON MAAF</h1>
        <h2 className="font-bold text-darkaqua">BELUM ADA IKAN YANG DIJUAL!</h2>
      </div>}
    </div>
  )
}

export default ShowItem