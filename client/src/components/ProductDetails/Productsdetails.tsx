import { useEffect, useState } from "react";
import { Product } from "../../context/product.context";
import { useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import "./ProductDetails.css";

const ProductDetails = () => {
  function inStockProduct(inStock: number) {
    if (inStock == 0) {
      return "Not in stock";
    } else if (inStock < 20) {
      return "Few in stock";
    } else {
      return "In stock";
    }
  }

  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const apiUrl = `http://localhost:3000/api/products/${id}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetails();
  }, [id]);

  return product ? (
    <Container
      style={{
        marginTop: "40px",
        marginBottom: "40px",
      }}
    >
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} sm={12} md={6}>
          <img
            className="img-details"
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              paddingTop: "5px",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div
            className="info-container"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <p className="title">{product.title}</p>
            <p className="title-list">{product.description}</p>
            <p style={{ fontStyle: "italic" }}>{product.price} kr</p>
            <span style={{ fontWeight: "bold" }}>
              {inStockProduct(product.inStock)}
            </span>
            <div>
              <AddToCartBtn product={product} />
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  ) : null;
};

export default ProductDetails;
