import { Box, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useShoppingCart } from "../../context/cart.context";
import { useOrderContext } from "../../context/order.context";

const ConfirmationPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { cartItems, emptyCart } = useShoppingCart();
  const { createOrder, order } = useOrderContext();

  useEffect(() => {
    const processOrder = async () => {
      try {
        // Create the order with cartItems
        await createOrder(cartItems);

        // Order creation is complete, set isLoading to false
        setIsLoading(false);

        // Empty the cart
        emptyCart();
      } catch (error) {
        console.error("Error creating order:", error);
        // Handle error as needed
        setIsLoading(false);
      }
    };

    processOrder();
  }, [cartItems, createOrder, emptyCart]);

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
      {/* Display order information here based on the 'order' state */}
      <p>Order Number: {order.orderNumber}</p>
      <p>Total: {/* Calculate and display total based on order details */}</p>
      <br />
    </Container>
  );
};

export default ConfirmationPage;
