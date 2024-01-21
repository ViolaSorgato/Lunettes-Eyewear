import { Button, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

const AdminPage = () => {
  return (
    <div
      style={{
        width: "50%",
        minHeight: "50vh",
        margin: "auto",
        paddingTop: "50px",
        paddingBottom: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <p className="title-list">Admin Panel</p>

      <Stack direction="row" spacing={2}>
        <NavLink to="/addnewproduct" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Add product
          </Button>
        </NavLink>

        <NavLink to="/adminproducts" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Edit products
          </Button>
        </NavLink>

        <NavLink to="/adminorders" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Admin orders
          </Button>
        </NavLink>
      </Stack>
    </div>
  );
};

export default AdminPage;
