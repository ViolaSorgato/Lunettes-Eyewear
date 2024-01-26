import "./Categories.css";
import { Paper, Stack } from "@mui/material";

//Renders the two categories in the homepage

const Categories = () => {
  return (
    <>
      {/*The Stack element makes the component responsive*/}
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
          <h1 className="category-text">Sunglasses</h1>
        </Paper>
      </Stack>
    </>
  );
};

export default Categories;
