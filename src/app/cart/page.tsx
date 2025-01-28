import Image from "next/image";
import { useCart } from "@/context/Context"; // Adjust the path as necessary

export default function ShoppingCart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = 0.25 * subtotal; // Example: 25% discount
  const tax = 0.1 * (subtotal - discount); // Example: 10% tax
  const total = subtotal - discount + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
      <div className="grid gap-8 lg:grid-cols-2 md:grid-cols-1">
        {/* Left Column - Cart Items */}
        <div className="space-y-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between space-x-4"
              >
                <div className="relative h-16 w-16">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="p-6 rounded-lg border-2 border-gray-300">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium">- ${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">+ ${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full mt-6 px-6 py-3 bg-[#FF9F0D] text-white rounded-md shadow-sm text-sm font-medium hover:bg-[#FF9F0D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9F0D]">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
