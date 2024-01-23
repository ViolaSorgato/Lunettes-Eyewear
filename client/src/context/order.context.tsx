import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";
import { CartItem } from "./cart.context";

// Define the structure of the Order object
export interface Order {
  orderItems: CartItem[];
  orderNumber?: number;
}

// Define the structure of the OrderContext
interface IOrderContext {
  order: Order;
  setOrder: Dispatch<SetStateAction<Order>>;
  cartIntoOrder: () => void;
  createOrder: (cartItems: CartItem[]) => void;
}

// Create a default Order object
const defaultOrder = {
  orderItems: [],
};

// Set OrderContext default values
export const OrderContext = createContext<IOrderContext>({
  order: defaultOrder,
  setOrder: () => {},
  cartIntoOrder: () => {},
  createOrder: () => {},
});

// Custom hook to use the OrderContext
export const useOrderContext = () => useContext(OrderContext);

// OrderProvider component responsible for managing the order state
export const OrderProvider = ({ children }: PropsWithChildren<{}>) => {
  // State to manage the order
  const [order, setOrder] = useState<Order>(defaultOrder);

  // Function to update the order state based on the contents of the shopping cart
  const cartIntoOrder = () => {
    // Retrieve the shopping cart from local storage
    const cart = localStorage.getItem("shopping-cart");
    // Parse the cart data or default to an empty array
    const parsedCart = JSON.parse(cart || "[]");

    // Update the order state with the cart contents
    const orderFinish = { ...order, orderItems: parsedCart };
    setOrder(orderFinish);

    // Send the updated order to the database
    sendOrderToDataBase(orderFinish);
  };

  const createOrder = async (cartItems: CartItem[]) => {
    // Map cart items to the required format for the backend
    const orderItems = cartItems.map((item) => ({
      product: item.id,
      quantity: item.quantity,
    }));

    try {
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderItems,
        }),
      });

      if (orderResponse.ok) {
        const order = await orderResponse.json();
        setOrder((prevOrder) => ({
          ...prevOrder,
          orderNumber: order.orderNumber,
        }));
        console.log("ORDER", order);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Function to send the order data to the database
  const sendOrderToDataBase = async (orderData: Order) => {
    const { orderItems } = orderData;

    // Map order items to the required format for the backend
    const orderItems2 = orderItems.map((item) => ({
      product: item.id,
      quantity: item.quantity,
    }));

    try {
      // Send a POST request to the server with the order data
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderItems: orderItems2,
        }),
      });

      // If the request is successful, update the order state with the order number
      if (orderResponse.ok) {
        const order = await orderResponse.json();
        setOrder((prevOrder) => ({
          ...prevOrder,
          orderNumber: order.orderNumber,
        }));
      }
    } catch (error) {
      // Handle errors when sending the order to the database
      console.error("Error sending order to the database:", error);
    }
  };

  // Provide the order state and functions to child components via context
  return (
    <OrderContext.Provider
      value={{ order, setOrder, cartIntoOrder, createOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};
