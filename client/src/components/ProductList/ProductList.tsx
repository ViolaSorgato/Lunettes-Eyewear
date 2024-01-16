import { useProductContext } from "../../context/product.context";
import "./ProductList.css";
import { useShoppingCart } from "../../context/cart.context";
import { Button, Container, Grid } from "@mui/material";
// import ProductCard from "../ProductCard/ProductCard";

//RETURNS LIST OF STRIPE PRODUCTS AND CALLS ADDTOCART FUNCTION
export default function ProductList() {
  const { products } = useProductContext();
  const { addToCart } = useShoppingCart();

  return (
    <Container>
      <h1 className="title-list">Our Products</h1>
      <Grid
        container
        spacing={10}
        columnGap={5}
        rowGap={5}
        justifyContent="center"
        alignItems="center"
        marginTop="50px"
        paddingBottom="50px"
      >
        {products.map((product) => (
          <div key={product.id} className="product-card">
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

            <h3>{product.name}</h3>
            <p>Price: {product.price.unit_amount} kr</p>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                addToCart(product.price.id, product.name, product.price)
              }
            >
              Add to cart
            </Button>
          </div>
        ))}
      </Grid>
    </Container>
  );
}
