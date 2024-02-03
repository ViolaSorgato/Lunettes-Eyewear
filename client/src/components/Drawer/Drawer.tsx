import "./Drawer.css";
import { Dispatch, SetStateAction, useContext } from "react";
import { Drawer, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../context/cart.context";
import { useProductContext } from "../../context/product.context";
import CartItem from "../CartItem/CartItem";
import { formatCurrency } from "../../utilities/formatCurrency";
import { Close } from "@mui/icons-material";
import { UserContextType } from "../../context/user.context";
import img from "../../assets/emptycart.jpg";

interface ShoppingDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

/*Renders the Drawer which is also the Shopping Cart.
The content is rendered depending on whether the cart is empty or not,
and whether the user is logged in or not.*/

const ShoppingDrawer = ({ open, setOpen }: ShoppingDrawerProps) => {
  const { cartItems } = useShoppingCart();
  const { products } = useProductContext();
  const { loggedInUser } = useContext(UserContextType);

  // Function to close the drawer
  const toggleDrawer = () => (event: { type: string; key: string }) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };

  // Function to handle close button click
  const handleButtonClick = () => {
    setOpen(false);
  };

  // Check if the cart is empty
  const isCartEmpty = cartItems.length === 0;

  // Function to handle payment
  async function handlePayment() {
    try {
      // Map cart items to the required format for payment
      const itemsToCheckout = cartItems.map((cartItem) => ({
        price_data: {
          currency: "sek",
          unit_amount: cartItem.price * 100,
          product_data: cartItem.title,
        },
        quantity: cartItem.quantity,
      }));

      // Send a POST request to create a checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: itemsToCheckout }),
      });

      // If the request is successful, redirect to the checkout URL
      if (response.ok) {
        const { url } = await response.json();
        window.location = url;
      } else {
        console.error("Error creating checkout session:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during payment:", error);
    }
  }

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer()}>
      <div className="drawer">
        {/* Close button */}
        <Close className="drawer-close" onClick={handleButtonClick}></Close>

        {/* Cart items */}
        <div className="body-drawer">
          <Stack>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </Stack>
        </div>

        {/* Total price */}
        <div>
          {isCartEmpty ? (
            // Display message and SHOP button if the cart is empty
            <div className="drawer-info-container">
              <p className="drawer-info">Your cart is empty.</p>
              <img
                src={img}
                alt="glasses"
                style={{ width: "200px", objectFit: "cover", opacity: "0.5" }}
              />
              <Link to="/shop">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleButtonClick}
                >
                  TO SHOP
                </Button>
              </Link>
            </div>
          ) : (
            // Display total price if the cart is not empty
            `Total ${formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = products.find((i) => i._id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}`
          )}
        </div>

        {/*The Checkout button is displayed only if the cart is NOT empty but user is logged in */}
        {!isCartEmpty && loggedInUser && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            alignItems="center"
          >
            {/* Checkout button */}
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePayment}
            >
              To checkout
            </Button>
            {/* Shop more button */}
            <Link to="/shop">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleButtonClick}
              >
                Shop more
              </Button>
            </Link>
          </Stack>
        )}

        {/*SignIn message is displayed if cart NOT empty and user NOT logged in */}
        {!isCartEmpty && !loggedInUser && (
          <div className="info-container">
            <p className="cart-info">
              Please sign in to proceed with your purchase.
            </p>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default ShoppingDrawer;
