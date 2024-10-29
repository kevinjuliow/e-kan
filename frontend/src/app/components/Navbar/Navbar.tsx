"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../globals.css"
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const [opened, setOpened] = useState(false)
  const pathname = usePathname()
  const isSignupPage = pathname === '/auth/signup'
  const isLoginPage = pathname === '/auth/login'
  const isSignupOrLoginPage = pathname === '/auth/signup' || pathname === '/auth/login'
  const isLanding = pathname === '/'

  const handleOpen = () => setOpened(!opened)
  const handleLogin = () => signIn();
  const handleLogout = () => signOut({ callbackUrl: "/", redirect: true });

  const { data: session } = useSession();
  const isLoggedIn = !!session

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`${!isLanding && 'backdrop-blur-md bg-opacity-60'} w-full flex border-gray-200 h-24 items-center fixed z-50`}>
      <div className={`max-w-screen-xl w-full flex items-center ${!isSignupOrLoginPage ? 'justify-between' : 'justify-center'} mx-auto px-8 lg:px-0`}>
        <Link href={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
          {isLanding && <span className={`self-center text-2xl font-semibold whitespace-nowrap transition duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>e-Kan</span>}
          {!isLanding && <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">e-Kan</span>}
        </Link>
        
        {!isLoggedIn && !isSignupOrLoginPage &&
        <div className="flex">
          <div className="flex text-center items-center">
          {isLanding && <Link href={"/auth/signup"} className={`me-4 transition duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>Sign-up</Link>}
          {!isLanding && <Link href={"/auth/signup"} className={`me-4 ${'text-black'}`}>Sign-up</Link>}
          {isLanding && <button onClick={handleLogin} className={`w-20 border py-1 custom-hover-button cursor-pointer rounded-md font-bold ${isScrolled ? 'bg-darkaqua text-white' : 'bg-white text-darkaqua'}  border-none`}>Login</button>}
          {!isLanding && <button onClick={handleLogin} className={`w-20 border py-1 custom-hover-button cursor-pointer rounded-md font-bold ${'bg-darkaqua text-white'}  border-none`}>Login</button>}
          </div>
        </div>}
        
        {(!isSignupPage && !isLoginPage) && isLoggedIn && 
        <div className="flex">
          <div className="flex text-center items-center group relative">
            <Image src="/default_profile.png" alt="default profile" width={32} height={32} className="rounded-full border-2 border-darkaqua" onClick={handleOpen} />
            <div
              id="userDropdown"
              className="bg-white rounded-lg shadow w-fit absolute right-0 mt-3 top-8 transform translate-y-[-10px] opacity-0 duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
              style={{ boxShadow: "0px 2px 8px 1px rgba(0, 0, 0, .1)" }}>
              <div className="px-4 py-3 text-sm text-black">
                <div>John Doe</div>
                <div className="font-medium truncate">johndoe@gmail.com</div>
              </div>
              <div className="py-1 cursor-pointer">
                <a href="/applicants/profile" className="block px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer">
                  Profile
                </a>
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
