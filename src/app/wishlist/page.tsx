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
    // Simply remove the product from wishlist state
    const updatedWishlist = wishlist.filter((item) => item._id !== productId);
    // Update the wishlist state
    removeFromCart(productId);
    // Here we use the context to remove from the wishlist state directly.
    // We will update the localStorage here as well
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Add item to cart and remove it from the wishlist
  const handleAddToCart = (item: any) => {
    addToCart(item); // Add item to cart
    removeFromWishlist(item._id); // Remove item from wishlist
  };

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="md:px-9 xl:pl-16 text-sm flex justify-start gap-x-1 sm:px-10 text-gray-500 mb-6 px-10 py-6 md:py-8 dark:text-gray-300">
        <Link href="/">Home</Link> /{" "}
        <span className="text-black font-semibold dark:text-white">Your Wishlist</span>
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">
            Your Wishlist
          </h1>
          <div>
            {wishlist.map((item: any) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b py-4 dark:border-gray-700"
              >
                <div className="flex items-start sm:items-center flex-col gap-2 sm:flex-row">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded ml-5 sm:ml-0"
                  />
                  <span className="ml-4 text-gray-800 dark:text-gray-100">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center flex-col-reverse sm:flex-row gap-5 sm:gap-x-16">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)} // Call handleAddToCart
                      className="px-4 py-2 text-sm bg-[#01B5DA] text-white rounded-md hover:bg-[#1F2937] dark:bg-[#4C89A1] dark:hover:bg-[#3A5B6E]"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item._id)} // Call removeFromWishlist
                      className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800"
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
