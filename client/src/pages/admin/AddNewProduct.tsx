import React, { useState } from "react";
import { TextField, Button, Grid, Box, Alert } from "@mui/material";
import { NavLink } from "react-router-dom";
import { NewProduct } from "../../context/product.context";

export default function AddNewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState("");
  const [inStock, setInStock] = useState<number>(0);

  const [show, setShow] = useState<boolean>();
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice(0);
    setImage("");
    setInStock(0);
  };

  //----------------------------START - Add/send new product to database-------------------------------------//

  const sendNewProductToDataBase = async (productData: NewProduct) => {
    const { title, description, price, image, inStock } = productData;

    try {
      const productResponse = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          price: price,
          image: image,
          inStock: inStock,
        }),
      });

      if (productResponse.ok) {
        const newProductToDatabase = await productResponse.json();
        console.log(
          "New product successfully added to the database:",
          newProductToDatabase
        );

        setSuccess(true);
        resetForm();
      }

      if (productResponse.status === 400) setSuccess(false);
    } catch (error) {
      console.error("Error adding new product to the database:", error);
    }
  };

  //----------------------------END - Add/send new product to database-------------------------------------//

  //----------------------------START - Handle Alert visibility-------------------------------------//

  function handleShow() {
    setShow(!show);
  }

  //----------------------------END - Handle Alert visibility-------------------------------------//

  //----------------------------START - Handle submit / button-------------------------------------//

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProduct: NewProduct = {
      title,
      description,
      price,
      image,
      inStock,
    };

    sendNewProductToDataBase(newProduct);

    setTimeout(() => {
      handleShow();
    }, 300);
  };

  //----------------------------END - Handle submit / button-------------------------------------//

  return (
    <div style={{ padding: "50px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        <p style={{ fontSize: "larger" }}>
          Complete the following form to add a new product to the database.
        </p>
      </div>

      <Box
        sx={{
          width: ["95%", "80%", "60%"],
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "auto",
          paddingBottom: 0,
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
        }}
      >
        <form onSubmit={handleSubmit} style={{ marginBottom: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Product Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Product Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                name="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Stock Quantity"
                name="inStock"
                value={inStock}
                onChange={(e) => setInStock(Number(e.target.value))}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              {show && !success ? (
                <Alert
                  onClose={handleShow}
                  severity="error"
                  style={{ marginBottom: "2rem" }}
                >
                  ERROR - Error adding new product to the database.<br></br>{" "}
                  Please try again
                </Alert>
              ) : (
                <Alert severity="error" style={{ display: "none" }}></Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Product
              </Button>

              {show && success ? (
                <Alert
                  onClose={handleShow}
                  severity="success"
                  style={{ marginTop: "2rem" }}
                >
                  SUCCESS - New product add to the database
                </Alert>
              ) : (
                <Alert severity="success" style={{ display: "none" }}></Alert>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "30px",
          paddingBottom: "30px",
          gap: "30px",
        }}
      >
        <NavLink to="/admin" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            Back to Admin Panel
          </Button>
        </NavLink>
        <NavLink to="/adminproducts" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            Edit Products
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
