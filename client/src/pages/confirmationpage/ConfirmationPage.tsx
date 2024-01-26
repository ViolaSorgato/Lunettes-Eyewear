import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Order, useOrderContext } from "../../context/order.context";
import { UserContextType } from "../../context/user.context";
import { formatCurrency } from "../../utilities/formatCurrency";

const ConfirmationPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { order, setOrder } = useOrderContext();
  const { loggedInUser } = useContext(UserContextType);

  useEffect(() => {
    // Fetch data when the component mounts
    updateOrderFromCart();
  }, []);

  const updateOrderFromCart = async () => {
    // Retrieve the shopping cart from local storage
    const cart = localStorage.getItem("shopping-cart");
    // Parse the cart data or default to an empty array
    const parsedCart = JSON.parse(cart || "[]");

    // Update the order state with the cart contents
    const orderFinish = { ...order, orderItems: parsedCart };

    // Send the updated order to the database
    createOrder(orderFinish);
  };

  const createOrder = async (orderData: Order) => {
    const { orderItems } = orderData;

    // Map order items to the required format for the backend
    const newOrderItems = orderItems.map((item) => ({
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
          orderItems: newOrderItems,
        }),
      });

      if (orderResponse.ok) {
        // If the request is successful, update the order state with the order number
        const order = await orderResponse.json();
        setOrder((prevOrder) => ({
          ...prevOrder,
          orderNumber: order.orderNumber,
          orderItems: order.orderItems,
        }));
        setIsLoading(false);
        console.log("Order response from server:", order);
        console.log("ORDER.NUMBER", order.orderNumber);
      } else {
        console.error("Failed to create order. Response:", orderResponse);
      }
    } catch (error) {
      console.error("Error sending order to the database:", error);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          gap: "30px",
        }}
      >
        <br />
        <CircularProgress sx={{ color: "primary.dark" }} />
        <p>Your order is being processed.</p>
      </Box>
    );
  }

  console.log("Order details:", order);

  return (
    <Container
      style={{
        textAlign: "center",
        marginTop: "2rem",
        minWidth: "50%",
        padding: "3rem",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <p className="title-list">Thank you! Your order is ready.</p>
      <p>You will soon receive a confirmation email.</p>
      <p>Order Number: {order.orderNumber}</p>
      <p>
        Total:{" "}
        {formatCurrency(
          order.orderItems.reduce(
            (total, item) => total + item.quantity * item.price,
            0
          )
        )}
      </p>
      <br />
      <Container>
        <Typography variant="h5">Order Details</Typography>
        <br />
        <p>
          Email: {loggedInUser?.email}
          <br />
          Username: {loggedInUser?.username}
          <br />
          Ordernumber: {order.orderNumber}
        </p>
      </Container>
      <br />

      <Container
        style={{ borderTop: "3px solid #E9D5EF", marginBottom: "3rem" }}
      >
        <br />
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Order Items
        </Typography>
        <br />
        <ul style={{ listStyleType: "none" }}>
          {order.orderItems.map((item) => (
            <li key={item.title}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: "2px solid #E9D5EF",
                  padding: "1rem",
                  margin: "0.5rem",
                  marginLeft: "0",
                }}
              >
                Product: {item.title}, Quantity: {item.quantity}, Price:
                {item.price}
              </Box>
            </li>
          ))}
        </ul>
      </Container>
    </Container>
  );
};

export default ConfirmationPage;
