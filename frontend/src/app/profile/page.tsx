"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const [opened, setOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const handleOpen = () => setOpened(!opened);
  const handleLogin = () => signIn();
  const handleLogout = () => signOut({ callbackUrl: "/", redirect: true });

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
    <nav
      className={`${
        isScrolled ? "backdrop-blur-md bg-opacity-60" : ""
      } w-full flex border-gray-200 h-24 items-center fixed z-50 bg-white`}
    >
      <div className="max-w-screen-xl w-full flex items-center justify-between mx-auto px-8 lg:px-0">
        <Link href={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
            e-Kan
          </span>
        </Link>
        <div className="flex space-x-6">
          <Link href="/home" className="text-black hover:text-gray-500">Home</Link>
          <Link href="/kategori" className="text-black hover:text-gray-500">Kategori</Link>
          <Link href="/tentang-kami" className="text-black hover:text-gray-500">Tentang Kami</Link>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Ikan"
            className="border rounded-md px-3 py-1 mr-4"
          />
        </div>
        {!isLoggedIn ? (
          <div className="flex">
            <Link href="/auth/signup" className="text-black hover:text-gray-500 mr-4">
              Sign-up
            </Link>
            <button
              onClick={handleLogin}
              className="w-20 border py-1 custom-hover-button cursor-pointer rounded-md font-bold bg-darkaqua text-white border-none"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="flex items-center group relative">
            <Link href="/keranjang" className="mr-4">
              <span className="material-icons text-black">shopping_cart</span>
            </Link>
            <Image
              src="/default_profile.png"
              alt="default profile"
              width={32}
              height={32}
              className="rounded-full border-2 border-darkaqua cursor-pointer"
              onClick={handleOpen}
            />
            {opened && (
              <div
                id="userDropdown"
                className="bg-white rounded-lg shadow w-fit absolute right-0 mt-3 top-8 transform translate-y-0 opacity-100"
                style={{ boxShadow: "0px 2px 8px 1px rgba(0, 0, 0, .1)" }}
              >
                <div className="px-4 py-3 text-sm text-black">
                  <div>John Doe</div>
                  <div className="font-medium truncate">johndoe@gmail.com</div>
                </div>
                <div className="py-1 cursor-pointer">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </div>
                <div className="py-1 cursor-pointer">
                  <button
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;