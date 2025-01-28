"use client";
import Link from "next/link";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { IoBagHandle } from "react-icons/io5";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="bg-black text-white p-4 w-full">
      <div className="text-2xl font-bold flex justify-center items-center">
        <span className="text-[#FF9F0D]">Food</span>tuck
      </div>
      <section className="flex items-center justify-between px-4 md:px-[135px]">
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

        <ul
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent md:flex items-center space-y-4 md:space-y-0 md:space-x-6 text-sm transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <li
            className="hover:text-[#FF9F0D] cursor-pointer px-4 md:px-0"
            onClick={() => setMenuOpen(false)}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className="hover:text-[#FF9F0D] cursor-pointer px-4 md:px-0"
            onClick={() => setMenuOpen(false)}
          >
            <Link href="/">Menu</Link>
          </li>
          <li
            className="hover:text-[#FF9F0D] cursor-pointer px-4 md:px-0"
            onClick={() => setMenuOpen(false)}
          >
            <Link href="/">Blog</Link>
          </li>
          <li
            className="hover:text-[#FF9F0D] cursor-pointer px-4 md:px-0"
            onClick={() => setMenuOpen(false)}
          >
            <Link href="/">Pages</Link>
          </li>
          <li
            className="hover:text-[#FF9F0D] cursor-pointer px-4 md:px-0"
            onClick={() => setMenuOpen(false)}
          >
            <Link href="/about">About</Link>
          </li>
          <li
            className="hover:text-[#FF9F0D] cursor-pointer px-4 md:px-0"
            onClick={() => setMenuOpen(false)}
          >
            <Link href="/">Shop</Link>
          </li>
          <li
            className="hover:text-[#FF9F0D] cursor-pointer px-4 md:px-0"
            onClick={() => setMenuOpen(false)}
          >
            <Link href="/">Contact</Link>
          </li>
        </ul>


        <div className="hidden md:flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-black border border-[#FF9F0D] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-orange-500"
            />
            <span className="absolute top-2.5 right-3">
              <CiSearch />
            </span>
          </div>
          <Link href="/cart">
            <IoBagHandle className="w-[24px] h-[24px]" />
          </Link>
          <Link href="/signin">
            <FaUser className="w-[20px] h-[20px]" />
          </Link>
        </div>
      </section>
    </header>
  );
};

export default Navbar;
