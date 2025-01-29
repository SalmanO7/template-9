"use client";

import { useCart } from "@/context/Context";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

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

  const isInWishlist = product && wishlist.some((item) => item._id === product._id);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success("Product added to cart!"); // Success toast for adding to cart
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      if (isInWishlist) {
        removeFromWishlist(product._id);
        toast.info("Product removed from wishlist"); // Info toast for removing from wishlist
      } else {
        addToWishlist(product);
        toast.success("Product added to wishlist!"); // Success toast for adding to wishlist
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
    <div className="p-4 md:p-10 bg-black min-h-screen">
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
          <h1 className="text-xl font-bold text-white mb-4">
            {product.name}
          </h1>
          <p className="text-gray-400 mb-4">{product.description}</p>
          <p className="text-[#FF9F0D] font-semibold text-lg mb-4">
            ${product.price}
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart} // Trigger toast when adding to cart
              className="bg-[#FF9F0D] text-white px-4 py-2 rounded hover:bg-[#e88709]"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist} // Trigger toast when adding/removing from wishlist
              className={`${
                isInWishlist ? "bg-red-500" : "bg-gray-700"
              } text-white px-4 py-2 rounded hover:bg-gray-600`}
            >
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer
        position="bottom-right" // Move to the bottom-right corner
        autoClose={3000} // Auto close after 3 seconds
        hideProgressBar={true} // Hide the progress bar
        newestOnTop={false} // Toast notifications appear in the order they are triggered
        closeButton={false} // Optionally hide the close button
        rtl={false} // If you need right-to-left direction (for languages)
      />
    </div>
  );
};

export default Page;
