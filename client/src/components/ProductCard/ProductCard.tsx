import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./ProductCard.css";
import { NavLink } from "react-router-dom";
import { Product } from "../../context/product.context";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";

type Props = {
  product: Product;
};

//Render the Product Cards that are displayed in the ProductList.
//When the image title or price are clicked, the user is redirected to the Product Details.
const ProductCard = ({ product }: Props) => {
  return (
    <Card
      sx={{
        width: 300,
        height: 400,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavLink
        to={`/${product._id}`}
        key={product._id}
        className="nav-link"
        style={{ textDecoration: "none" }}
      >
        <CardMedia
          component="img"
          alt={product.title}
          image={product.image}
          height="280px"
        />
      </NavLink>

      <CardContent>
        <NavLink
          to={`/${product._id}`}
          key={product._id}
          className="nav-link"
          style={{ textDecoration: "none" }}
        >
          <Typography variant="h6" style={{ paddingTop: "0px" }}>
            {product.title}
          </Typography>
        </NavLink>
        <NavLink
          to={`/${product._id}`}
          key={product._id}
          className="nav-link"
          style={{ textDecoration: "none" }}
        >
          <Typography variant="body2">{product.price + " SEK"}</Typography>
        </NavLink>{" "}
        <AddToCartBtn product={product} />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
