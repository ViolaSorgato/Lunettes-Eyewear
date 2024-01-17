import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import "./Drawer.css";
import { useShoppingCart } from "../../context/cart.context";
import { useProductContext } from "../../context/product.context";
import CartItem from "../CartItem/CartItem";
import { formatCurrency } from "../../utilities/formatCurrency";
import CloseIcon from "@mui/icons-material/Close";
import { UserContextType } from "../../context/user.context";
import { useContext } from "react";

interface ShoppingDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ShoppingDrawer({ open, setOpen }: ShoppingDrawerProps) {
  const { cartItems } = useShoppingCart();
  const { products } = useProductContext();
  const { loggedInUser } = useContext(UserContextType);

  const toggleDrawer = () => (event: { type: string; key: string }) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(false);
  };

  const handleButtonClick = () => {
    setOpen(false);
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer()}>
      <div className="drawer">
        <CloseIcon
          className="close-drawer"
          onClick={handleButtonClick}
        ></CloseIcon>

        <div className="body-drawer">
          <Stack>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </Stack>
        </div>

        <div className="total-price">
          {isCartEmpty ? (
            <div className="info-container">
              <p>Your Shopping Cart is empty.</p>
              <Link to="/shop">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleButtonClick}
                >
                  SHOP
                </Button>
              </Link>
            </div>
          ) : (
            `Total ${formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = products.find((i) => i._id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}`
          )}
        </div>

        {!isCartEmpty && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            alignItems="center"
          >
            <Link to="/checkout">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleButtonClick}
              >
                To checkout
              </Button>
            </Link>
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

        {!isCartEmpty && !loggedInUser && (
          <div className="info-container">
            <p>Please sign in to proceed with your purchase.</p>
          </div>
        )}
      </div>
    </Drawer>
  );
}
