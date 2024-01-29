import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./ProductCard.css";
import { NavLink } from "react-router-dom";
import { Product } from "../../context/product.context";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";

type Props = {
  product: Product;
};

//Render the Product Cards that are displayed in the ProductList.
//When the imagem title or price are clicked, the user is redirected to the Product Details page.
const ProductCard = ({ product }: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 500,
        height: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
          height="300"
        />
      </NavLink>

      <CardContent>
        <NavLink
          to={`/${product._id}`}
          key={product._id}
          className="nav-link"
          style={{ textDecoration: "none" }}
        >
          <Typography variant="h5">{product.title}</Typography>
        </NavLink>
        <NavLink
          to={`/${product._id}`}
          key={product._id}
          className="nav-link"
          style={{ textDecoration: "none" }}
        >
          <Typography variant="body2">{product.price + " SEK"}</Typography>
        </NavLink>
      </CardContent>

      <CardActions>
        <AddToCartBtn product={product} />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
