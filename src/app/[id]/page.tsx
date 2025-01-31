"use client";

import { useCart } from "@/context/Context";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useCart();

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

  const isInWishlist =
    product && wishlist.some((item) => item._id === product._id);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success("Product added to cart!"); 
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      if (isInWishlist) {
        removeFromWishlist(product._id);
        toast.info("Product removed from wishlist"); 
      } else {
        addToWishlist(product);
        toast.success("Product added to wishlist!"); 
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white">Loading...</p>
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
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-12 max-w-5xl w-full  rounded-lg p-10 shadow-xl">
        <div className="flex justify-center items-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover rounded-lg shadow-md border border-gray-700"
          />
        </div>

        <div className="text-white space-y-5">
          <h1 className="text-3xl font-extrabold">{product.name}</h1>
          <p className="text-gray-400 leading-relaxed">{product.description}</p>
          <p className="text-[#FF9F0D] font-bold text-2xl">${product.price}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-[#FF9F0D] text-white px-6 py-3 rounded-lg font-medium transition duration-300 hover:bg-[#e88709] hover:scale-105"
            >
              Add to Cart 🛒
            </button>
            <button
              onClick={handleAddToWishlist}
              className={`px-6 py-3 rounded-lg font-medium transition duration-300 ${isInWishlist
                  ? "bg-red-500 hover:bg-red-600 hover:scale-105"
                  : "bg-gray-700 hover:bg-gray-600 hover:scale-105"
                }`}
            >
              {isInWishlist ? "Remove from Wishlist ❤️" : "Add to Wishlist 🤍"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeButton={false}
        rtl={false}
      />
    </div>
  );
};

export default Page;
