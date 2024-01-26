import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Order, useOrderContext } from "../../context/order.context";
import { UserContextType } from "../../context/user.context";
import { formatCurrency } from "../../utilities/formatCurrency";
import "./Confirmation.css";

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
      title: item.title,
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

  return (
    <div className="confirmation-container">
      <p className="title-list">Thank you! Your order is ready.</p>{" "}
      <Grid container spacing={2} alignItems="stretch">
        {/* Order Details Section */}
        <Grid item xs={12} sm={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px", height: "100%" }}>
            <Typography variant="h5" align="center">
              Order Details
            </Typography>
            <p className="order-info">Email: {loggedInUser?.email}</p>

            <p className="order-info">Order Number: {order.orderNumber}</p>
            <p className="order-info">
              Total:{" "}
              {formatCurrency(
                order.orderItems.reduce(
                  (total, item) => total + item.quantity * item.price,
                  0
                )
              )}
            </p>
          </Paper>
        </Grid>

        {/* Order Items Section */}
        <Grid item xs={12} sm={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px", height: "100%" }}>
            <Typography variant="h5" align="center">
              Order Items
            </Typography>
            <TableContainer style={{ maxHeight: "100%", overflowY: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderItems.map((item) => (
                    <TableRow key={item.title}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ConfirmationPage;
