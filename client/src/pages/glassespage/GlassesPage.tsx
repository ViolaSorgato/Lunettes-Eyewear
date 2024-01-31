import { useEffect, useState } from "react";
import { Product } from "../../context/product.context";
import { Container, Grid, Pagination } from "@mui/material";
import { motion } from "framer-motion";
import ProductCard from "../../components/ProductCard/ProductCard";
import { NavLink } from "react-router-dom";

const GlassesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/api/products/byCategory/659c098f8a00da83152e7027"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "100%",
      }}
    >
      <p className="product-title">Explore our glasses collection</p>
      <NavLink
        to="/shop/sunglasses"
        className="nav-link"
        style={{ textDecoration: "none", paddingTop: "10px" }}
      >
        <p>..Or explore sunglasses instead</p>
      </NavLink>
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        {/* Pagination component for navigating through product pages */}
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          style={{ marginBottom: "20px" }}
        />
      </div>
    </Container>
  );
};

export default GlassesPage;
