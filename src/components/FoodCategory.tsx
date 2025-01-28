import React from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

export interface IFood {
  _id: string;
  category: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const getData = async () => {
  const res = await client.fetch(`   
*[_type == "food"]{
  _id,
  category,
  name,
  price,
  description,
  "imageUrl": image.asset->url
}
    `);

  return res;
};

const FoodCategory = async () => {
  const data = await getData();

  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="container mx-auto text-center">
        <h1 className="md:text-[32px] text-[24px] font-normal text-[#FF9F0D] font-greatVibes">
          Food Category
        </h1>
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 mt-5">
          <span className="text-[#FF9F0D]">Ch</span>oose Food Item
        </h2>

        {/* Grid of food items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-5 sm:px-1 gap-6 sm:gap-7 md:gap-10">
          {data.map((item: IFood) => (
            <div key={item._id} className="relative">
              <Link href={`/${item._id}`}>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="object-cover rounded-lg w-full h-full"
                />
              </Link>
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xl font-semibold p-4 rounded-b-lg">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodCategory;
