"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../globals.css"
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useUser } from "app/userprovider";
import { navbarMenuList } from "app/constant";
import { Link as ReactScroll } from 'react-scroll'

const Navbar = () => {
  const [opened, setOpened] = useState(false)
  const pathname = usePathname()
  const isSignupPage = pathname === '/auth/signup'
  const isLoginPage = pathname === '/auth/login'
  const isSignupOrLoginPage = pathname === '/auth/signup' || pathname === '/auth/login'
  const isLanding = pathname === '/'
  const isDashboard = pathname === '/dashboard'

  const handleOpen = () => setOpened(!opened)
  const handleLogin = () => signIn();
  const handleLogout = () => signOut({ callbackUrl: "/", redirect: true });

  const { data: session } = useSession();
  const isLoggedIn = !!session

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

  const { user } = useUser();

  const changeTextColor = (isLanding || isDashboard) && isScrolled ? 'text-black' : (isLanding || isDashboard) && !isScrolled ? 'text-white' : (isLoginPage || isSignupPage) || ((!isLanding && !isDashboard && !isLoginPage && !isSignupPage) && isScrolled) ? 'text-black' :  'text-white'
  const changeIconColor = (isLanding || isDashboard) && isScrolled ? '#000000' : (isLanding || isDashboard) && !isScrolled ? '#ffffff' : (isLoginPage || isSignupPage) || ((!isLanding && !isDashboard && !isLoginPage && !isSignupPage) && isScrolled) ? '#000000' :  '#ffffff'

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
              <svg width="20px" height="20px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff">
                <path d="M17 17L21 21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <input className="w-full px-2 py-2 ps-12 text-base rounded-lg bg-darkaqua focus:outline-none" placeholder="Cari ikan di sini..." required />
            <button type="submit" className="text-white absolute end-2 bg-mediumaqua font-medium rounded-lg text-sm px-3 py-1">Search</button>
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
          <Link href={"/"} className="me-4">
            <svg className="transition duration-300" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={`${changeIconColor}`}>
              <path d="M3 6H22L19 16H6L3 6ZM3 6L2.25 3.5" stroke={`${changeIconColor}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M11 19.5C11 20.3284 10.3284 21 9.5 21C8.67157 21 8 20.3284 8 19.5" stroke={`${changeIconColor}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M17 19.5C17 20.3284 16.3284 21 15.5 21C14.6716 21 14 20.3284 14 19.5" stroke={`${changeIconColor}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </Link>
          <div className="flex text-center items-center group relative">
            <Image src="/default_profile.png" alt="default profile" width={32} height={32} className="rounded-full border-2 border-darkaqua" onClick={handleOpen} />
            <div
              id="userDropdown"
              className="bg-white rounded-lg shadow w-fit absolute right-0 mt-3 top-8 transform translate-y-[-10px] opacity-0 duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
              style={{ boxShadow: "0px 2px 8px 1px rgba(0, 0, 0, .1)" }}>
              <div className="px-4 py-3 text-sm text-black">
                <div>{user?.data?.nama}</div>
                <div className="font-medium truncate">{user?.data?.email}</div>
              </div>
              <div className="py-1 cursor-pointer">
                <Link href="/applicants/profile" className="block px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer">
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
