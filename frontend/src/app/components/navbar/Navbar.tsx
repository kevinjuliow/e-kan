"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../globals.css"
import { usePathname, useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { navbarMenuList } from "app/constant";
import { Link as ReactScroll } from 'react-scroll'
import { BoxIcon, CartIcon, ChatIcon, PlusNonSolid, SearchIcon } from "../icon";
import { useUser } from "app/userprovider";

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const isSignupPage = pathname === '/auth/signup'
  const isLoginPage = pathname === '/auth/login'
  const isSignupOrLoginPage = pathname === '/auth/signup' || pathname === '/auth/login'
  const isLanding = pathname === '/'
  const isDashboard = pathname === '/dashboard'
  const isAddProductPage = pathname === '/product/add'

  const handleLogin = () => signIn();
  const handleLogout = () => signOut({ callbackUrl: "/", redirect: true });

  const { data: session } = useSession();
  const isLoggedIn = !!session

  const { userImage } = useUser()

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > (isLanding ? 380 : 80)) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLanding]);

  const [isBlur, setIsBlur] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > (isLanding ? 380 : 80)) {
        setIsBlur(true);
      } else {
        setIsBlur(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLanding]);

  const [searchQuery, setSearchQuery] = useState<string>("")
  const handleSearch = () => {
    router.push(`/dashboard?search=${searchQuery}`)
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const changeTextColor = (isLanding || isDashboard) && isScrolled ? 'text-gray-800' : (isLanding || isDashboard) && !isScrolled ? 'text-white' : (isLoginPage || isSignupPage) || ((!isLanding && !isDashboard && !isLoginPage && !isSignupPage) && isScrolled) ? 'text-gray-800' : 'text-gray-800' // changed from text-white temporarily
  const changeIconColor = (isLanding || isDashboard) && isScrolled ? '#1f2937' : (isLanding || isDashboard) && !isScrolled ? '#ffffff' : (isLoginPage || isSignupPage) || ((!isLanding && !isDashboard && !isLoginPage && !isSignupPage) && isScrolled) ? '#1f2937' :  '#ffffff'

  return (
    <nav className={`${!isLanding && isBlur ? 'backdrop-blur-xl bg-opacity-100 bg-[#D4EBEF] transition duration-300 custom-box-shadow-bottom' : isBlur ? 'backdrop-blur-md bg-opacity-60' : 'backdrop-blur-none bg-opacity-100'} w-full flex h-24 items-center fixed z-50`}>
      <div className={`max-w-screen-xl w-full flex items-center ${!isSignupOrLoginPage ? 'justify-between' : 'justify-center'} mx-auto px-8 xl:px-0`}>
        <Link href={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className={`self-center text-2xl font-semibold whitespace-nowrap transition duration-300 ${changeTextColor}`}>e-Kan</span>
        </Link>

        {isLanding && <>
          <div className="hidden md:flex items-center justify-items-center">
            {navbarMenuList.map((value, index) => {
              return(
                <ReactScroll to={value.to} offset={value.offset} duration={500} key={index} className={`cursor-pointer mx-2 px-2 py-1 duration-300 font-medium ${changeTextColor}`}  >
                  {value.name}
                </ReactScroll>
              )
            })}
          </div>

          <div className="relative max-w-96 md:w-[50%] hidden lg:flex items-center justify-center text-white border-none">
            <div className="absolute inset-y-0 start-0 flex items-center px-4">
              <SearchIcon size={20} hexColor={"#ffffff"} />
            </div>
            <input onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} className="w-full px-2 py-2 ps-12 text-base rounded-lg bg-darkaqua focus:outline-none" placeholder="Cari ikan di sini..." required />
            <button onClick={handleSearch} type="submit" className="text-white absolute end-2 bg-mediumaqua font-medium rounded-lg text-sm px-3 py-1">Cari</button>
          </div>
        </>}

        {!isLoggedIn && !isSignupOrLoginPage && (
          <div className="flex">
            <div className="flex text-center items-center">
              <Link href={"/auth/signup"} className={`me-4 transition duration-300 font-medium ${(isLanding || isDashboard) && isScrolled ? 'text-black' : ((!isLanding && !isDashboard && !isLoginPage && !isSignupPage) && isScrolled) ? 'text-black' : 'text-white'}`}>Sign-up</Link>
              <button onClick={handleLogin} className={`w-20 border py-1 custom-hover-button cursor-pointer rounded-md font-bold ${((isLanding || isDashboard ) && isScrolled) || ((!isLanding && !isDashboard && !isLoginPage && !isSignupPage) && isScrolled) ? 'bg-darkaqua text-white' : 'bg-white text-darkaqua'} border-none`}>Login</button>
            </div>
          </div>
        )}

        {(!isSignupPage && !isLoginPage) && isLoggedIn && 
        <div className="flex items-center justify-center">
          {session?.user?.userType === 'PEMBELI'
            ? <Link href={"/cart"} className="me-4">
                <CartIcon size={24} hexColor={changeIconColor} />
              </Link>
            : !isAddProductPage && (
              <>
                <Link href={"/product/add"} className={`flex items-end justify-center rounded-lg border-2 px-2 py-1 me-4`} style={{ borderColor: changeIconColor }}>
                  <PlusNonSolid size={24} hexColor={changeIconColor} />
                  <p className={`${changeTextColor} ms-1 font-medium text-sm`}>Tambah Produk</p>
                </Link>
                <Link href={"/product/myproduct"} className="me-4">
                  <BoxIcon size={24} hexColor={changeIconColor} />
                </Link>
              </>
            )}
          <Link href={"/chat"} className="me-4">
            <ChatIcon size={24} hexColor={changeIconColor} />
          </Link>
          <div className="flex text-center items-center group relative">
            <Image src={userImage ?? "/default_profile.png"} alt="default profile" width={32} height={32} className="rounded-full border-2 border-darkaqua" />
            <div
              id="userDropdown"
              className="bg-white rounded-lg shadow w-fit absolute right-0 mt-3 top-8 transform translate-y-[-10px] opacity-0 duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
              style={{ boxShadow: "0px 2px 8px 1px rgba(0, 0, 0, .1)" }}>
              <div className="px-4 py-3 text-sm text-black">
                <div>{session?.user?.name}</div>
                <div className="font-medium truncate">{session?.user?.email}</div>
              </div>
              <div className="py-1 cursor-pointer">
                <Link href="/profile" className="block px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer">
                  Profile
                </Link>
              </div>
              <div className="py-1 cursor-pointer">
                <button className="block px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer w-full" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </nav>
  );
};

export default Navbar;
