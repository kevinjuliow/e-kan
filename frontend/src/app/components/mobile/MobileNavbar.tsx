import Link from 'next/link'
import React from 'react'
import { CartIcon, ChatIcon, HomeIcon, SearchIcon } from '../icon'

const MobileNavbar = () => {
  return (
    <div className="flex md:hidden fixed z-[99] bottom-0 w-full items-center justify-around h-16 bg-[#D4EBEF] custom-box-shadow-top">
      <Link href={"/"}>
        <HomeIcon size={24} hexColor={"#000000"} />
      </Link>
      <Link href={"/dashboard"}>
        <SearchIcon size={24} hexColor={"#000000"} />
      </Link>
      <Link href={"/cart"}>
        <CartIcon size={24} hexColor={"#000000"} />
      </Link>
      <Link href={"/chat"}>
        <ChatIcon size={24} hexColor={"#000000"} />
      </Link>
    </div>
  )
}

export default MobileNavbar