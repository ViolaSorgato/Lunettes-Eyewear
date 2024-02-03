import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import { List, ListItem, Grid } from "@mui/material";
import "./Footer.css";
import { NavLink } from "react-router-dom";

//The footer is divided into three columns but adjusts into one with small screens.
//The content was made mostly for the aesthetic purposes,
// so I did not add pages for all the links or socials.
const Footer = () => {
  return (
    <div className="footer-container">
      <Grid container spacing={3} alignItems="stretch">
        {/* Section for general information */}
        <Grid item xs={12} sm={4} md={4}>
          <div className="footer-title">Welcome to Lunettes</div>
          <p className="footer-desc">
            Step into a world of timeless elegance at Lunettes Eyewear, your
            premier destination for exquisitely crafted Italian eyewear. Our
            curated collection captures the essence of Italy's artistic legacy,
            offering a range of frames that seamlessly blend sophistication,
            style, and unparalleled craftsmanship.
          </p>
        </Grid>

        {/* Section for useful links */}
        <Grid item xs={12} sm={4} md={4}>
          <div className="footer-title">Useful Links</div>
          <div className="list-container">
            <List className="list">
              <ListItem className="list-item">New Collection</ListItem>
              <ListItem className="list-item">Man Fashion</ListItem>
              <ListItem className="list-item">Woman Fashion</ListItem>
              <ListItem className="list-item">Offers</ListItem>
              <ListItem className="list-item">Accessories</ListItem>
            </List>
            <List className="list">
              <NavLink
                to={"/about-us"}
                style={{ textDecoration: "none" }}
                className="nav-link"
              >
                <ListItem className="list-item">About us</ListItem>
              </NavLink>
              <ListItem className="list-item">My account</ListItem>
              <ListItem className="list-item">Wishlist</ListItem>
              <ListItem className="list-item">Order Tracking</ListItem>
              <ListItem className="list-item">Terms</ListItem>
            </List>
          </div>
        </Grid>

        {/* Section for contact information */}
        <Grid item xs={12} sm={4} md={4}>
          <div className="footer-title">Contact</div>
          <div className="contact-item">
            <Room /> Via Modigliani 15 Milan Italy
          </div>
          <div className="contact-item">
            <Phone /> +39 348 634 323
          </div>
          <div className="contact-item">
            <MailOutline /> contact@lunetteseyewear.com
          </div>
          <div className="social-container">
            <div className="socia-icon">
              <Facebook />
            </div>
            <div className="socia-icon">
              <Instagram />
            </div>
            <div className="socia-icon">
              <Twitter />
            </div>
            <div className="socia-icon">
              <Pinterest />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
