import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import { Stack, List, ListItem, Container } from "@mui/material";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-around"
        alignItems="center"
      >
        <Container className="column">
          <div className="logo">Welcome to Lunettes</div>
          <p className="desc">
            Step into a world of timeless elegance at Lunettes Eyewear, your
            premier destination for exquisitely crafted Italian eyewear. Our
            curated collection captures the essence of Italy's artistic legacy,
            offering a range of frames that seamlessly blend sophistication,
            style, and unparalleled craftsmanship.
          </p>
        </Container>
        <Container className="column">
          <div className="logo">Useful Links</div>
          <div className="list-container">
            {" "}
            <List className="list">
              <ListItem className="list-item">New Collection</ListItem>
              <ListItem className="list-item">Man Fashion</ListItem>
              <ListItem className="list-item">Woman Fashion</ListItem>
              <ListItem className="list-item">Offers</ListItem>
              <ListItem className="list-item">Accessories</ListItem>
            </List>
            <List className="list">
              <ListItem className="list-item">About us</ListItem>
              <ListItem className="list-item">My account</ListItem>
              <ListItem className="list-item">Wishlist</ListItem>
              <ListItem className="list-item">Order Tracking</ListItem>
              <ListItem className="list-item">Terms</ListItem>
            </List>
          </div>
        </Container>
        <Container className="column">
          <div className="logo">Contact</div>
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
          {/* <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" /> */}
        </Container>
      </Stack>
    </div>
  );
};

export default Footer;
