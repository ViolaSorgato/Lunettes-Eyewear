import { useState } from "react";
import "./ProductList.css";
import ProductCard from "../ProductCard/ProductCard";
import { Grid, Pagination } from "@mui/material";
import { useProductContext } from "../../context/product.context";

const ProductList = () => {
  // Retrieve products from the product context
  const { products } = useProductContext();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Calculate the range of products to display based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page change event for pagination
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      {/* Display the grid of product cards */}
      <Grid
        container
        gap={3}
        justifyContent="center"
        alignItems="center"
        marginTop="50px"
        paddingBottom="50px"
      >
        {currentProducts.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </Grid>

      {/* Pagination component for navigating through product pages */}
      <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginBottom: "20px" }}
      />
    </>
  );
};

export default ProductList;
