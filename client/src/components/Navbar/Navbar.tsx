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

const Navbar = () => {
  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { loggedInUser, logout } = useContext(UserContextType);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {isMobile ? (
        <>
          <div className="wrapper">
            <div className="search-container">
              <Search style={{ color: "gray", fontSize: 16 }} />
            </div>
            <div className="logo">Lunettes Eyewear</div>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </div>

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
              {loggedInUser ? (
                <div className="menu-item" onClick={logout}>
                  SIGN OUT
                </div>
              ) : (
                <>
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
                <div className="menu-item" onClick={logout}>
                  SIGN OUT
                </div>
              ) : (
                <>
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
      )}
    </>
  );
};

export default Navbar;
