import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Box from "@mui/material/Box";
import { useShoppingCart } from "../../context/cart.context";
import { Product } from "../../context/product.context";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

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
        startIcon={<AddShoppingCartIcon />}
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
      <Button
        variant="contained"
        color="secondary"
        onClick={() => increaseCartQuantity(product._id)}
      >
        <AddIcon />
      </Button>

      <div>
        <span>{quantity}</span> in cart
      </div>

      {quantity > 1 ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => decreaseCartQuantity(product._id)}
        >
          <RemoveIcon />
        </Button>
      ) : (
        <Button variant="contained" color="secondary">
          <RemoveIcon />
        </Button>
      )}

      <Button
        variant="contained"
        color="secondary"
        onClick={() => removeFromCart(product._id)}
      >
        <DeleteForeverOutlinedIcon />
      </Button>
    </Box>
  );
}
