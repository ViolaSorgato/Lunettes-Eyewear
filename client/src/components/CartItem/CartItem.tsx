import "../CartItem/CartItem.css";
import { useShoppingCart } from "../../context/cart.context";
import { useProductContext } from "../../context/product.context";
import { Box, Button, Stack } from "@mui/material";
import { Add, Remove, DeleteForeverOutlined } from "@mui/icons-material";
import { formatCurrency } from "../../utilities/formatCurrency";

type CartItemProps = {
  id: string;
  quantity: number;
};

//Renders the products when they are added to the cart (Drawer.tsx) and the logic to manage their quantity

const CartItem = ({ id, quantity }: CartItemProps) => {
  // Access shopping cart functions from the context
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();

  // Access product data from the context
  const { products } = useProductContext();

  // Find the product with the given id
  const item = products.find((i) => i._id === id);

  // If the product is not found, return null
  if (item === null || item === undefined) return null;

  return (
    <>
      {/* Stack to arrange components in a horizontal row */}
      <Stack direction="row" spacing={2} alignItems="start">
        {/* Box for displaying product image */}
        <Box>
          <img
            src={item?.image}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </Box>

        {/* Box for displaying product title and price */}
        <Box>
          {/* Display product title */}
          <span className="cartitem-title">{item?.title} </span>
          <br />

          {/* Display total price for the quantity */}
          <span className="cartitem-price">
            {item && formatCurrency(item?.price * quantity)}
          </span>
        </Box>

        {/* Stack for quantity-related buttons */}
        <Stack
          direction="row"
          spacing={0.5}
          justifyContent="center"
          alignItems="center"
        >
          {/* Button to decrease quantity in the cart */}
          {quantity > 1 ? (
            <Button
              className="cartitem-quantity"
              onClick={() =>
                item && decreaseCartQuantity(item?._id, item.title, item.price)
              }
            >
              <Remove className="cartitem-icon" />
            </Button>
          ) : (
            <Button className="cartitem-quantity">
              <Remove className="cartitem-icon" />
            </Button>
          )}

          {/* Box to display the quantity */}
          <Box className="cartitem-quantity">
            <div className="cartitem-quantity-number">x {quantity}</div>
          </Box>

          {/* Button to increase quantity in the cart */}
          <Button
            className="cartitem-quantity"
            onClick={() =>
              item && increaseCartQuantity(item?._id, item.title, item.price)
            }
          >
            <Add className="cartitem-icon" />
          </Button>

          {/* Button to remove the product from the cart */}
          <Button
            className="cartitem-quantity"
            onClick={() => item && removeFromCart(item?._id)}
          >
            <DeleteForeverOutlined className="cartitem-icon" />
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default CartItem;
