import { useProductContext } from "../../context/product.context";
import "./ProductList.css";
import { useShoppingCart } from "../../context/cart.context";
import { Button, Paper, Stack } from "@mui/material";

//RETURNS LIST OF STRIPE PRODUCTS AND CALLS ADDTOCART FUNCTION
export default function ProductList() {
  const { products } = useProductContext();
  const { addToCart } = useShoppingCart();

  return (
    <div className="ProductListContainer">
      <Stack
        direction={{ sm: "column", md: "row" }}
        style={{ display: "flex" }}
      ></Stack>
      {products.map((product) => (
        <Paper style={{ width: 250, display: "flex" }} key={product.id}>
          <h3>{product.name}</h3>
          <div>
            {product.images.map((image, index) => (
              <img
                className="img"
                key={index}
                src={image}
                alt={`${product.name} Image ${index + 1}`}
              />
            ))}
          </div>
          <p>Price: {product.price.unit_amount} kr</p>
          <Button
            onClick={() =>
              addToCart(product.price.id, product.name, product.price)
            }
          >
            Add to cart
          </Button>
        </Paper>
      ))}
    </div>
  );
}
