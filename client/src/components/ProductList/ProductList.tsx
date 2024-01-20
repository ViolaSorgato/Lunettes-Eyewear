import { useState, useEffect } from "react";
import "./ProductList.css";
import { Product } from "../../context/product.context";
import ProductCard from "../ProductCard/ProductCard";
import { Container, Grid, Pagination } from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const getAllProducts = async () => {
    try {
      const response = await fetch("api/getproducts");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
        {currentProducts.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="secondary"
      />
    </Container>
  );
};

export default ProductList;
