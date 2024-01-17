import { Box, Button } from "@mui/material";
import {
  Add,
  Remove,
  DeleteForeverOutlined,
  AddShoppingCart,
} from "@mui/icons-material";
import { useShoppingCart } from "../../context/cart.context";
import { Product } from "../../context/product.context";

type Props = {
  product: Product;
};

export default function AddToCartBtn({ product }: Props) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(product._id);

  return quantity === 0 ? (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "1rem",
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddShoppingCart />}
        onClick={() => increaseCartQuantity(product._id)}
      >
        Add to cart
      </Button>
    </Box>
  ) : (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.75rem",
        margin: "auto",
        marginBottom: "1rem",
      }}
    >
      {quantity > 1 ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => decreaseCartQuantity(product._id)}
        >
          <Remove />
        </Button>
      ) : (
        <Button variant="contained" color="secondary">
          <Remove />
        </Button>
      )}

      <div>
        <span>{quantity}</span> in cart
      </div>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => increaseCartQuantity(product._id)}
      >
        <Add />
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => removeFromCart(product._id)}
      >
        <DeleteForeverOutlined />
      </Button>
    </Box>
  );
}
