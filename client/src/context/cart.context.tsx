import { createContext, useContext, ReactNode } from "react";
import useLocalStorage from "../../src/hooks/useLocalStorage";

//Handles the Cart logic

// Define the structure of the Cart Item object
export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type ShoppingCartContext = {
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (id: string, title: string, price: number) => void;
  decreaseCartQuantity: (id: string, title: string, price: number) => void;
  removeFromCart: (id: string) => void;
  emptyCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type ShoppingCartProviderProps = {
  children: ReactNode;
};
const ShoppingCartContext = createContext({} as ShoppingCartContext);

// Custom hook to use the context
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  //The folowing functions are pretty self-explanatory
  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: string, title: string, price: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, title, price, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  function emptyCart() {
    setCartItems([]);
  }

  const contextValue = {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    emptyCart,
    cartQuantity,
    cartItems,
  };

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
