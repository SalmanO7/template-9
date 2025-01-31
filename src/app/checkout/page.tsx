"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/Context";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
    const { cartItems, setCartItems } = useCart();
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
    });

    const [orderPlaced, setOrderPlaced] = useState(false);
    const router = useRouter();

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    useEffect(() => {
        // Clear user details when the page loads
        setUserDetails({
            name: "",
            email: "",
            contact: "",
            address: "",
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = () => {
        if (!userDetails.name || !userDetails.email || !userDetails.contact || !userDetails.address) {
            alert("Please fill all required fields.");
            return;
        }

        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        localStorage.removeItem("cartItems");
        setCartItems([]);

        setOrderPlaced(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 dark:bg-gray-900">
            <nav className="mt-6 md:px-9 xl:pl-16 text-sm flex justify-start gap-x-1 sm:px-10 text-gray-500 mb-6 px-10 py-6 md:py-8 dark:text-gray-300">
                <Link href="/">Home</Link> /
                <span className="text-black font-semibold dark:text-white"> Checkout</span>
            </nav>

            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                    Checkout
                </h2>

                {/* User Details Form */}
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={userDetails.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={userDetails.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                        required
                    />
                    <input
                        type="text"
                        name="contact"
                        placeholder="Contact Number"
                        value={userDetails.contact}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={userDetails.address}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-md mt-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Order Summary</h3>
                    <ul className="space-y-3">
                        {cartItems.map((item) => (
                            <li key={item.product._id} className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                                <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 rounded-md object-cover" />
                                <div className="flex-1">
                                    <span className="block">{item.product.name} (x{item.quantity})</span>
                                    <span className="block text-sm text-gray-500 dark:text-gray-400">${item.product.price * item.quantity}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <hr className="my-4" />
                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                        <span>Total</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        className="mt-6 w-full bg-[#FF9F0D] text-white py-3 rounded-md font-bold hover:bg-orange-700 transition-all"
                    >
                        Place Order
                    </button>
                </div>
            </div>

            {/* Order Success Modal */}
            {orderPlaced && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                            🎉 Order Placed Successfully!
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mt-2">
                            Your order has been successfully placed and will be delivered soon. 🚚
                        </p>
                        <button
                            onClick={() => {
                                setOrderPlaced(false);
                                router.push("/");
                            }}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
