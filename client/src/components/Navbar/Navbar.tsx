import { Badge, Container, Input } from "@mui/material";
import { ShoppingCartOutlined, Search } from "@mui/icons-material";
import "./Navbar.css";

const Navbar = () => {
  return (
    <Container style={{ maxWidth: "100%" }}>
      <div className="wrapper">
        <div className="left">
          <div className="search-container">
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </div>
        </div>
        <div className="center">
          <div className="logo">Lunettes Eyewear</div>
        </div>
        <div className="right">
          <div className="menu-item">SHOP</div>
          <div className="menu-item">REGISTER</div>
          <div className="menu-item">SIGN IN</div>
          <div className="menu-item">
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartOutlined className="icon" />
            </Badge>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
