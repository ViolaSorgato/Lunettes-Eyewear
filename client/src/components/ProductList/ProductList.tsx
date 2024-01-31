import { useState } from "react";
import "./ProductList.css";
import ProductCard from "../ProductCard/ProductCard";
import { Grid, Pagination } from "@mui/material";
import { useProductContext } from "../../context/product.context";
import { motion } from "framer-motion";

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
    handleClick();
  };

  //Animation on hover
  const hoverEffect = {
    scale: 1.05, // Adjust the scale factor as per your preference
    transition: { duration: 0.3 }, // Adjust the duration of the transition
  };

  // Function to scroll to the top of the page
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Display the grid of product cards */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        marginTop="50px"
        paddingBottom="50px"
        paddingLeft="40px"
      >
        {currentProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <motion.div whileHover={hoverEffect}>
              <ProductCard product={product} />
            </motion.div>
          </Grid>
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
