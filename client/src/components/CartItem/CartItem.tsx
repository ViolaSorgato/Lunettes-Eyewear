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

//Renders the products when they are added to the cart (Drawer.tsx) and the logic
// to manage their quantity

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
      <Stack direction="row" spacing={2} alignItems="start">
        <Box>
          <img
            src={item?.image}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </Box>

        <Box>
          <span className="cartitem-title">{item?.title} </span>
          <br />

          <span className="cartitem-price">
            {item && formatCurrency(item?.price * quantity)}
          </span>
        </Box>

        <Stack
          direction="row"
          spacing={0.5}
          justifyContent="center"
          alignItems="center"
        >
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

          <Box className="cartitem-quantity">
            <div className="cartitem-quantity-number">x {quantity}</div>
          </Box>

          <Button
            className="cartitem-quantity"
            onClick={() =>
              item && increaseCartQuantity(item?._id, item.title, item.price)
            }
          >
            <Add className="cartitem-icon" />
          </Button>

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
