"use client";
import { useEffect } from "react";
import { useCart } from "@/context/Context";
import Link from "next/link";

const WishlistPage = () => {
  const { wishlist, addToCart, removeFromCart } = useCart();

  // Save wishlist to localStorage whenever wishlist state changes
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  }, [wishlist]);

  // Remove item from wishlist
  const removeFromWishlist = (productId: string) => {
    removeFromCart(productId);
  };

  return (
    <>
      <nav className="md:px-9 xl:pl-16 text-sm flex justify-start gap-x-1 sm:px-10 text-gray-500 mb-6 px-10 py-6 md:py-8">
        <Link href="/">Home</Link> /{" "}
        <span className="text-black font-semibold">Your Wishlist</span>
      </nav>

      {wishlist.length === 0 ? (
        <div className="flex justify-center items-center pt-40 pb-16">
          <p>
            Your wishlist is empty{" "}
            <Link href="/" className="bg-gray-100 py-2 px-3 rounded-2xl">
              Add Products
            </Link>
          </p>
        </div>
      ) : (
        <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Wishlist</h1>
          <div>
            {wishlist.map((item: any) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b py-4"
              >
                <div className="flex items-start sm:items-center flex-col gap-2 sm:flex-row">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded ml-5 sm:ml-0"
                  />
                  <span className="ml-4">{item.name}</span>
                </div>
                <div className="flex items-center flex-col-reverse sm:flex-row gap-5 sm:gap-x-16">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">${item.price}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-4 py-2 text-sm bg-[#01B5DA] text-white rounded-md hover:bg-[#1F2937]"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-700"
                    >
                      Remove from Wishlist
                    </button>
                  </div>
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
