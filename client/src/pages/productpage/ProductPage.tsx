import "./ProductPage.css";
import { Container } from "@mui/material";
import ProductList from "../../components/ProductList/ProductList";

const ProductPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "100%",
        backgroundColor: "white",
      }}
    >
      <p className="product-title">Our Products</p>
      <p className="product-desc">
        From the sun-drenched landscapes of Sicily to the fashion-forward
        streets of Milan, each pair of eyeglasses is a masterpiece.
      </p>
      <ProductList />
    </Container>
  );
};

export default ProductPage;
