"use client";

import { useCart } from "@/context/Context";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

interface IFood {
  _id: string;
  category: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IFood | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, addToWishlist } = useCart();

  const fetchProduct = useCallback(async () => {
    try {
      if (!id) return;

      const productData: IFood = await client.fetch(
        `*[_type == "food" && _id == $id]{
          _id,
          category,
          name,
          price,
          description,
          "imageUrl": image.asset->url
        }[0]`,
        { id }
      );

      if (!productData) {
        setError("Product not found.");
      } else {
        setProduct(productData);
      }
    } catch (err) {
      setError("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 gap-8 pt-7">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-green-600 font-semibold text-lg mb-4">
            ${product.price}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => product && addToCart(product)} // Check if product is not null
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
            <button
              onClick={() => product && addToWishlist(product)} // Check if product is not null
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
