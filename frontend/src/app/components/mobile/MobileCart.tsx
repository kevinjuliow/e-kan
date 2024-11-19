import React from 'react'

interface Props {
  totalPrice: number
}

const MobileCart: React.FC<Props> = ({ totalPrice }) => {
  const handleBuy = () => {

  }

  return (
    <div className="fixed z-[999] border-none bottom-4 left-0 ms-0 md:ms-2 mb-12 md:mb-0 p-4 w-full md:max-w-80 bg-white custom-box-shadow-top">
      <h1 className="font-bold">Ringkasan pesanan</h1>
      <div className="w-full mt-4 flex items-center justify-between">
        <p className="">Total biaya</p>
        <p className="font-bold">Rp{totalPrice}</p>
      </div>
      <hr className="mt-4" />
      <button onClick={handleBuy} className="w-full mt-6 border py-1 custom-hover-button cursor-pointer rounded-md font-medium bg-darkaqua text-white border-none">Beli</button>
    </div>
  )
}

export default MobileCart