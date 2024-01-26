import { Box, Container, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Order, useOrderContext } from "../../context/order.context";
import { UserContextType } from "../../context/user.context";
import { formatCurrency } from "../../utilities/formatCurrency";

const ConfirmationPage = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const { cartItems, emptyCart } = useShoppingCart();
  const { order, setOrder } = useOrderContext();
  const { loggedInUser } = useContext(UserContextType);

  console.log("Initial Order State:", order);

  useEffect(() => {
    cartIntoOrder();
  }, []);

  const cartIntoOrder = async () => {
    const cart = localStorage.getItem("shopping-cart");
    const parsedCart = JSON.parse(cart || "[]");

    const orderFinish = { ...order, orderItems: parsedCart };

    await setOrder(orderFinish);
    sendOrderToDataBase(orderFinish);
  };

  const sendOrderToDataBase = async (orderData: Order) => {
    const { orderItems } = orderData;
    const orderItems2 = orderItems.map((item) => ({
      product: item.id,
      quantity: item.quantity,
    }));

    console.log("Sending order to database with:", orderItems2);

    try {
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderItems: orderItems2,
        }),
      });

      if (orderResponse.ok) {
        const order = await orderResponse.json();
        setOrder((prevOrder) => ({
          ...prevOrder,
          orderNumber: order.orderNumber,
          orderItems: order.orderItems, // Add this line to update orderItems
        }));
        console.log("Order response from server:", order);
        console.log("ORDER.NUMBER", order.orderNumber);
        console.log("ORDER.NUMBER", order.orderNumber);
      } else {
        console.error("Failed to create order. Response:", orderResponse);
      }
    } catch (error) {
      console.error("Error sending order to the database:", error);
    }
  };

  console.log("ORDER DETAILS:", order);

  // if (isLoading) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "60vh",
  //         gap: "30px",
  //       }}
  //     >
  //       <br />
  //       <CircularProgress sx={{ color: "primary.dark" }} />
  //       <p>Your order is being processed.</p>
  //     </Box>
  //   );
  // }

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
