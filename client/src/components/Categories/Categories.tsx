import { Paper, Stack } from "@mui/material";
import "./Categories.css";

const Categories = () => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      className="categories-container"
    >
      <Paper
        elevation={3}
        className="category category-left"
        sx={{ width: { xs: "100%", sm: "50%" } }}
      >
        <h1 className="text">Glasses</h1>
      </Paper>
      <Paper
        elevation={3}
        className="category category-right"
        sx={{ width: { xs: "100%", sm: "50%" } }}
      >
        <h1 className="text">Sunglasses</h1>
      </Paper>
    </Stack>
  );
};

export default Categories;
