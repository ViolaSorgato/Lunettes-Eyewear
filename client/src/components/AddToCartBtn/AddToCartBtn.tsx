import { Box, Button } from "@mui/material";
import {
  Add,
  AddShoppingCart,
  DeleteForeverOutlined,
  Remove,
} from "@mui/icons-material";
import { useShoppingCart } from "../../context/cart.context";
import { Product } from "../../context/product.context";

type Props = {
  product: Product;
};

const AddToCartBtn = ({ product }: Props) => {
  // Access shopping cart functions from the context
  const {
    decreaseCartQuantity,
    getItemQuantity,
    increaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  // Get the quantity of this product in the cart
  const quantity = getItemQuantity(product._id);

  // If the product is not in the cart
  if (quantity === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        {/* Button to add the product to the cart */}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddShoppingCart />}
          onClick={() =>
            increaseCartQuantity(product._id, product.title, product.price)
          }
        >
          Add to cart
        </Button>
      </Box>
    );
  } else {
    // If the product is already in the cart
    return (
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
        {/* Button to decrease quantity in the cart */}
        {quantity > 1 ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              decreaseCartQuantity(product._id, product.title, product.price)
            }
          >
            <Remove />
          </Button>
        ) : (
          <Button variant="contained" color="secondary">
            <Remove />
          </Button>
        )}

        {/* Display the quantity of the product in the cart */}
        <div>
          <span>{quantity}</span> in cart
        </div>

        {/* Button to increase quantity in the cart */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            increaseCartQuantity(product._id, product.title, product.price)
          }
        >
          <Add />
        </Button>

        {/* Button to remove the product from the cart */}
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
};

export default AddToCartBtn;
