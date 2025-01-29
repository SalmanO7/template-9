"use client";
import Link from "next/link";
import React from "react";
import { CiSearch, CiUser } from "react-icons/ci";
import { IoBagHandle, IoHeart } from "react-icons/io5";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { openSignIn } = useClerk();

  return (
    <header className="bg-black text-white p-4 w-full fixed top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <span className="text-[#FF9F0D]">Food</span>tuck
        </div>

        {/* Hamburger Icon for Mobile */}
        <div
          className="text-[#FF9F0D] md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenuAlt3 className="w-6 h-6" />
          )}
        </div>

        {/* Navigation Links */}
        <nav
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent md:flex items-center space-y-4 md:space-y-0 md:space-x-6 text-sm transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
            <li
              className="hover:text-[#FF9F0D] cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className="hover:text-[#FF9F0D] cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <Link href="/">Menu</Link>
            </li>
            <li
              className="hover:text-[#FF9F0D] cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <Link href="/">Blog</Link>
            </li>
            <li
              className="hover:text-[#FF9F0D] cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <Link href="/">Pages</Link>
            </li>
            <li
              className="hover:text-[#FF9F0D] cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <Link href="/about">About</Link>
            </li>
            <li
              className="hover:text-[#FF9F0D] cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <Link href="/">Shop</Link>
            </li>
            <li
              className="hover:text-[#FF9F0D] cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <Link href="/">Contact</Link>
            </li>
          </ul>

          {/* Mobile Search and User Icon */}
          <div className="md:hidden flex flex-col items-center space-y-4 p-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="bg-black border border-[#FF9F0D] rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring focus:ring-orange-500"
              />
              <span className="absolute top-2.5 right-3 text-[#FF9F0D]">
                <CiSearch />
              </span>
            </div>

            <Link href="/cart" className="text-[#FF9F0D] hover:text-orange-600">
              <IoBagHandle className="w-6 h-6" />
            </Link>
            <SignedOut>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-white hover:bg-gray-600"
                onClick={() => openSignIn()}
              >
                <CiUser className="text-xl" />
              </button>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8 rounded-full",
                  },
                }}
              />
            </SignedIn>
          </div>
        </nav>

        {/* Desktop: Search, Cart, and User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-black border border-[#FF9F0D] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-orange-500"
            />
            <span className="absolute top-2.5 right-3 text-[#FF9F0D]">
              <CiSearch />
            </span>
          </div>
          <div className="flex gap-3 justify-center items-center">
            <Link href="/cart" className="text-[#FF9F0D] hover:text-orange-600">
              <IoBagHandle className="w-7 h-7" />
            </Link>
            <Link href="/wishlist" className="text-[#FF9F0D] hover:text-orange-600">
              <IoHeart className="w-7 h-7" />
            </Link>
            <SignedOut>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-white hover:bg-gray-600"
                onClick={() => openSignIn()}
              >
                <CiUser className="text-xl" />
              </button>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8 rounded-full",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
