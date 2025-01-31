"use client";
import { useEffect } from "react";
import { useCart } from "@/context/Context";
import Link from "next/link";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useCart(); // Corrected function usage

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  }, [wishlist]);

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="md:px-9 xl:pl-16 text-sm flex justify-start gap-x-1 sm:px-10 text-gray-500 mb-6 px-10 py-6 md:py-8 dark:text-gray-300">
        <Link href="/">Home</Link> /
        <span className="text-black font-semibold dark:text-white"> Your Wishlist</span>
      </nav>

      {/* Wishlist Empty State */}
      {wishlist.length === 0 ? (
        <div className="flex justify-center items-center pt-40 pb-16">
          <p className="text-white">
            Your Wishlist is empty{" "}
            <Link href="/" className="bg-[#FF9F0D] py-2 px-3 rounded-2xl">
              Select Products
            </Link>
          </p>
        </div>
      ) : (
        <div className="p-4 md:p-10 bg-gray-50 min-h-screen dark:bg-gray-900">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 dark:text-white text-center">
            Your Wishlist
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item: any) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg py-3 flex flex-col justify-center items-center"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-64 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white pb-3">
                  {item.name}
                </h3>
                <div className="flex justify-between items-center gap-5">
                  <span className="text-gray-600 dark:text-gray-300 text-lg font-semibold">
                    ${item.price}
                  </span>
                  <button
                    onClick={() => removeFromWishlist(item._id)} // Corrected function call
                    className="px-2 py-1 text-white rounded-md bg-[#FF9F0D] hover:bg-orange-700 transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WishlistPage;
