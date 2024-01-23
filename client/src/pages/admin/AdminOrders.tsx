import { useEffect, useState } from "react";
import { CartItem } from "../../context/cart.context";
import { User } from "../../context/user.context";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";

// Define the structure of a shipped order
interface ShippedOrder {
  orderItems: CartItem[];
  orderNumber?: number;
  shipped: boolean;
  customer: User;
  _id: string;
}

// AdminOrders component
export default function AdminOrders() {
  // State to hold the list of shipped orders
  const [orders, setOrders] = useState<ShippedOrder[]>([]);

  // Fetch the list of shipped orders from the server
  const getOrders = async () => {
    try {
      const response = await fetch("api/orders");
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(orders);

  // useEffect to fetch orders when the component mounts
  useEffect(() => {
    getOrders();
  }, []);

  // State to handle the response of marking an order as shipped
  const [newOrder, setNewOrder] = useState("");

  // Function to mark an order as shipped
  const markAsShipped = async (id: string) => {
    try {
      const response = await fetch(`api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipped: true,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        setNewOrder(data);
        getOrders(); // Refresh the list of orders after marking as shipped
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle form submission (marking an order as shipped)
  const handleSubmit = async (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    event.preventDefault();
    markAsShipped(id);
  };

  // Render the component
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ width: "80vw" }}>
        {/* Heading */}
        <p className="title-list">List of Orders</p>
        <p>Here you can visualize all orders and mark them as shipped.</p>

        {/* Display orders */}
        {orders.map((order) => (
          <div
            key={order.orderNumber}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottom: "2px solid  lightgrey",
            }}
          >
            <div>
              <div style={{ paddingBottom: 20, paddingTop: 20 }}>
                {/* Order details */}
                <p style={{ fontWeight: "bold", paddingBottom: 7 }}>
                  Ordernumber: {order.orderNumber}
                </p>
                <p>Name: {order.customer.username}</p>
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Display shipping status */}
              {order.shipped ? (
                <Button variant="contained" color="secondary">
                  <CheckCircleOutline />
                  <p>Order is shipped</p>
                </Button>
              ) : (
                <div>
                  {/* Button to mark an order as shipped */}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e, order._id)}
                    style={{ paddingTop: 40 }}
                  >
                    Mark as shipped
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Back button to navigate to the admin page */}
      <NavLink
        to="/admin"
        style={{ textDecoration: "none", marginTop: "20px" }}
      >
        <Button variant="contained" color="primary">
          Back to Admin Panel
        </Button>
      </NavLink>
    </div>
  );
}
