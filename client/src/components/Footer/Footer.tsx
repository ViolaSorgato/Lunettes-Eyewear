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
    <Container
      style={{ maxWidth: "100%", maxHeight: "30%", position: "absolute" }}
    >
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
      >
        <Container className="column">
          <div className="logo">Lunettes Eyewear</div>
          <div className="desc">
            Step into a world of timeless elegance at Lunettes Eyewear, your
            premier destination for exquisitely crafted Italian eyewear. Our
            curated collection captures the essence of Italy's artistic legacy,
            offering a range of frames that seamlessly blend sophistication,
            style, and unparalleled craftsmanship.
          </div>
        </Container>
        <Container className="column">
          <div className="logo">Useful Links</div>
          <div className="list-container">
            {" "}
            <List className="list">
              <ListItem className="list-item">Home</ListItem>
              <ListItem className="list-item">Cart</ListItem>
              <ListItem className="list-item">Man Fashion</ListItem>
              <ListItem className="list-item">Woman Fashion</ListItem>
              <ListItem className="list-item">Accessories</ListItem>
            </List>
            <List className="list">
              <ListItem className="list-item">My Account</ListItem>
              <ListItem className="list-item">Order Tracking</ListItem>
              <ListItem className="list-item">Wishlist</ListItem>
              <ListItem className="list-item">Wishlist</ListItem>
              <ListItem className="list-item">Terms</ListItem>
            </List>
          </div>
        </Container>
        <Container className="column">
          <div className="logo">Contact</div>
          <div className="contact-item">
            <Room /> Via Modigliani 15, Milano, Italy
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
    </Container>
  );
};

export default Footer;
