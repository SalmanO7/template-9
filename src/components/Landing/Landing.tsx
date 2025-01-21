import React from "react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 w-full">
      <div className="w-full h-auto mt-16 md:mt-[45px]">
        <section className="bg-black text-white px-8 py-16 flex flex-col md:flex-row items-center">
          {/* Left Side - Text */}
          <div className="md:w-1/2 space-y-4 text-center md:text-left">
            <p className="text-[#FF9F0D] font-great-vibes text-4xl font-normal leading-10 decoration-none decoration-position-from-font">
              Its Quick & Amusing!
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              <span className="text-[#FF9F0D]">Th</span>e Art of Speed <br />{" "}
              Food Quality
            </h1>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius
              sed pharetra dictum neque massa congue.
            </p>
            <button className="w-[190px] h-[60px] rounded-[30px] bg-[#FF9F0D]">
              See Menu
            </button>
          </div>

          {/* Right Side - Image */}
          <div className="md:w-1/2 flex justify-center relative mt-8 md:mt-0">
            <Image
              width={300}
              height={300}
              src="/Hero-Image.png"
              alt="Food"
              className="w-full max-w-md object-cover"
            />
          </div>
        </section>
      </div>
    </nav>
  );
}
