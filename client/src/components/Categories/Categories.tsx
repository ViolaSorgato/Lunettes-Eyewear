import { Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import "./Categories.css";

const Categories = () => {
  //Animation on hover
  const hoverEffect = {
    scale: 1.05, // Adjust the scale factor as per your preference
    transition: { duration: 0.3 }, // Adjust the duration of the transition
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
            <Paper
              elevation={3}
              className="category category-left"
              sx={{ width: "100%" }}
            >
              <h1 className="text">Glasses</h1>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <motion.div whileHover={hoverEffect}>
            <Paper elevation={3} className="category category-right">
              <h1 className="category-text">Sunglasses</h1>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </>
  );
};

export default Categories;
