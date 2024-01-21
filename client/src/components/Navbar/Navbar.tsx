import {
  Container,
  Drawer,
  IconButton,
  Input,
  List,
  ListItem,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Search } from "@mui/icons-material";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useContext } from "react";
import ShoppingCartIcon from "../ShoppingCartIcon/ShoppingCartIcon";
import { UserContextType } from "../../context/user.context";

/*Handles the logic for the navigation bar/menu. The Logo always leads to the Homepage and the SHOP
always leads to products page. The rest of the content is rendered differently depending on
A) The screen size
B) Whether the user is logged in or not.*/
const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { loggedInUser, logout } = useContext(UserContextType);

  //Sets the point where the screen becomes mobile view
  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down("sm"));

  //Handles the menu drawer
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* If it is mobileview, it shows a burger menu icon and drawer opens */}
      {isMobile ? (
        <>
          <div className="wrapper">
            <div className="search-container">
              <Search style={{ color: "gray", fontSize: 16 }} />
            </div>
            <NavLink
              to="/"
              className="nav-link"
              style={{ textDecoration: "none" }}
              onClick={toggleDrawer}
            >
              <div className="logo">Lunettes Eyewear</div>
            </NavLink>

            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </div>

          {/* The drawer for menu in movile view*/}
          <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
            <List>
              <NavLink
                to="/shop"
                className="nav-link"
                style={{ textDecoration: "none" }}
                onClick={toggleDrawer}
              >
                <ListItem>
                  <div className="menu-item">SHOP</div>
                </ListItem>
              </NavLink>
              {/* If user is logged in, it shows My account and Sign out options */}
              {loggedInUser ? (
                <>
                  <NavLink
                    to="/login"
                    className="nav-link"
                    style={{ textDecoration: "none" }}
                    onClick={toggleDrawer}
                  >
                    <div className="menu-item">MY ACCOUNT</div>
                  </NavLink>
                  <div className="menu-item" onClick={logout}>
                    SIGN OUT
                  </div>
                </>
              ) : (
                <>
                  {/* If user is NOT logged in, it shows register and login options */}
                  <NavLink
                    to="/register"
                    className="nav-link"
                    style={{ textDecoration: "none" }}
                    onClick={toggleDrawer}
                  >
                    <ListItem>
                      <div className="menu-item">REGISTER</div>
                    </ListItem>
                  </NavLink>

                  <NavLink
                    to="/login"
                    className="nav-link"
                    style={{ textDecoration: "none" }}
                    onClick={toggleDrawer}
                  >
                    <ListItem>
                      <div className="menu-item">SIGN IN</div>
                    </ListItem>
                  </NavLink>
                </>
              )}

              <ListItem style={{ marginLeft: "25px" }}>
                <ShoppingCartIcon />
              </ListItem>
            </List>
          </Drawer>
        </>
      ) : (
        <>
          {/* This part handles the widescreen (not burger menu) */}
          <Container style={{ maxWidth: "100%" }}>
            <div className="wrapper">
              <div className="left">
                <div className="search-container">
                  <Input placeholder="Search" />
                  <Search style={{ color: "gray", fontSize: 16 }} />
                </div>
              </div>
              <div className="center">
                <NavLink
                  to="/"
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                  onClick={toggleDrawer}
                >
                  <div className="logo">Lunettes Eyewear</div>
                </NavLink>
              </div>
              <div className="right">
                <NavLink
                  to="/shop"
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                  onClick={toggleDrawer}
                >
                  <div className="menu-item">SHOP</div>
                </NavLink>
                {loggedInUser ? (
                  <>
                    {/* If user is logged in, it shows My account and Sign out options */}
                    <NavLink
                      to="/login"
                      className="nav-link"
                      style={{ textDecoration: "none" }}
                      onClick={toggleDrawer}
                    >
                      <div className="menu-item">MY ACCOUNT</div>
                    </NavLink>
                    <div className="menu-item" onClick={logout}>
                      SIGN OUT
                    </div>
                  </>
                ) : (
                  <>
                    {/* If user is NOT logged in, it shows register and login options */}
                    <NavLink
                      to="/register"
                      className="nav-link"
                      style={{ textDecoration: "none" }}
                      onClick={toggleDrawer}
                    >
                      <div className="menu-item">REGISTER</div>
                    </NavLink>
                    <NavLink
                      to="/login"
                      className="nav-link"
                      style={{ textDecoration: "none" }}
                      onClick={toggleDrawer}
                    >
                      <div className="menu-item">SIGN IN</div>
                    </NavLink>
                  </>
                )}
                <ShoppingCartIcon />
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default Navbar;
