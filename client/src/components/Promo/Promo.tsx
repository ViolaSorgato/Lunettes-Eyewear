import { Container } from "@mui/material";
import "./Promo.css";

const Promo = () => {
  return (
    <Container style={{ maxWidth: "100%" }}>
      <div className="promo">
        <p>Super Deal! Free Shipping on Orders Over $50</p>
      </div>
    </Container>
  );
};

export default Promo;
