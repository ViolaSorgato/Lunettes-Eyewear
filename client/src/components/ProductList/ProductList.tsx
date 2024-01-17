import { useState } from "react";
import Grid from "@mui/material/Grid";
import "./ProductList.css";
import { Product } from "../../context/product.context";
import ProductCard from "../ProductCard/ProductCard";
import { Container } from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getAllProducts = async () => {
    try {
      const response = await fetch("api/getproducts");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  getAllProducts();

  return (
    <Container>
      <p className="title-list">Our Products</p>
      <Grid
        container
        columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
        gap={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop="50px"
        paddingBottom="50px"
      >
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
