import { ArrowUpwardOutlined, ArrowBackOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

//Here I've grouped all the buttons used in admin pages (all of them exported individually)

// Function to scroll to the top of the page
const handleClick = () => {
  window.scrollTo(0, 0);
};

//Button to go back to Admin Page
export const BackToAdminButton = () => {
  return (
    <NavLink
      to="/login"
      style={{ textDecoration: "none" }}
      onClick={handleClick}
    >
      <Button variant="contained" color="secondary">
        <ArrowBackOutlined />
      </Button>
    </NavLink>
  );
};

//Button to Add New Product Page
export const AddProductButton = () => (
  <NavLink
    to="/addnewproduct"
    style={{ textDecoration: "none" }}
    onClick={handleClick}
  >
    <Button variant="contained" color="secondary">
      Add product
    </Button>
  </NavLink>
);

// Button to Edit Products Page
export const EditProductsButton = () => (
  <NavLink
    to="/adminproducts"
    style={{ textDecoration: "none" }}
    onClick={handleClick}
  >
    <Button variant="contained" color="secondary">
      Edit products
    </Button>
  </NavLink>
);

// Button to Admin Orders Page
export const AdminOrdersButton = () => (
  <NavLink
    to="/adminorders"
    style={{ textDecoration: "none" }}
    onClick={handleClick}
  >
    <Button variant="contained" color="secondary">
      Admin orders
    </Button>
  </NavLink>
);

//Button to scroll to top (just displays an arrow)
export const ScrollToTop = () => (
  <Button variant="contained" color="secondary" onClick={handleClick}>
    <ArrowUpwardOutlined />
  </Button>
);
