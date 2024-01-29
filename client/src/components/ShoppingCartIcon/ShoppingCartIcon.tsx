import { useState } from "react";
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import ShoppingDrawer from "../Drawer/Drawer";
import { useShoppingCart } from "../../context/cart.context";
import "./ShoppingCartIcon.css";

//Render the Shopping Cart Icon with correct number of items
const ShoppingCartIcon = () => {
  // State to control the visibility of the shopping cart drawer
  const [open, setOpen] = useState(false);

  // Access cartQuantity from the shopping cart context
  const { cartQuantity } = useShoppingCart();

  // Open the shopping cart drawer
  const handleOpen = () => {
    setOpen(true);
  };

  // Close the shopping cart drawer
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={open ? handleClose : handleOpen}>
        <Badge color="secondary" badgeContent={cartQuantity}>
          <ShoppingCart className="shopping-cart-icon" />
        </Badge>
      </div>
      <ShoppingDrawer open={open} setOpen={setOpen} />
    </div>
  );
};

export default ShoppingCartIcon;
