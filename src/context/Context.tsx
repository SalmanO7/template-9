"use client";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

// Define product types
interface ICartType {
  _id: string;
  category: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface CartItem {
  product: ICartType;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>; // Add this line to include setCartItems
  addToCart: (product: ICartType) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  addToWishlist: (product: ICartType) => void;
  removeFromWishlist: (productId: string) => void; // Add removeFromWishlist
  wishlist: ICartType[];
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

// Cart Provider to manage cart and wishlist state
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<ICartType[]>([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedCartItems) setCartItems(JSON.parse(storedCartItems));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
  }, []);

  // Sync cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add item to wishlist
  const addToWishlist = (product: ICartType) => {
    const exists = wishlist.find((item) => item._id === product._id);
    if (!exists) {
      setWishlist([...wishlist, product]);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId: string) => {
    setWishlist((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  // Add item to cart
  const addToCart = (product: ICartType) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product._id === product._id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product._id !== productId)
    );
  };

  // Increase quantity of item in cart
  const increaseQuantity = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity of item in cart
  const decreaseQuantity = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems, // Pass setCartItems here
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        wishlist,
        addToWishlist,
        removeFromWishlist, // Expose removeFromWishlist here
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
