import { Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import "./Categories.css";
import { NavLink } from "react-router-dom";

//Renders the two categories in the Homepage.
const Categories = () => {
  //Animation on hover
  const hoverEffect = {
    scale: 1.05,
    transition: { duration: 0.3 },
  };

  //Scrolls to top
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* The Grid element makes the component responsive */}
      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 4 }}
        style={{
          height: "50vh",
          minWidth: "100%",
          padding: "10px",
          gap: 0,
        }}
      >
        <Grid item xs={12} sm={6}>
          <motion.div whileHover={hoverEffect}>
            <NavLink
              to="/shop/glasses"
              style={{ textDecoration: "none" }}
              onClick={handleClick}
            >
              <Paper
                elevation={3}
                className="category category-left"
                sx={{ width: "100%" }}
              >
                <h1 className="text">Glasses</h1>
              </Paper>
            </NavLink>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <motion.div whileHover={hoverEffect}>
            <NavLink
              to="/shop/sunglasses"
              className="nav-link"
              style={{ textDecoration: "none" }}
              onClick={handleClick}
            >
              <Paper elevation={3} className="category category-right">
                <h1 className="category-text">Sunglasses</h1>
              </Paper>
            </NavLink>
          </motion.div>
        </Grid>
      </Grid>
    </>
  );
};

export default Categories;
