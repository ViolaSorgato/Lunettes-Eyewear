import { FormEvent, useContext, useState } from "react";
import "./Admin.css";
import { TextField, Button, Grid, Alert, Typography } from "@mui/material";
import { NewProduct } from "../../context/product.context";
import {
  AdminOrdersButton,
  BackToAdminButton,
  EditProductsButton,
  ScrollToTop,
} from "../../components/AdminBtn/AdminBtn";
import { UserContextType } from "../../context/user.context";

//This is where an Admin can add a new product to the database
const AddNewProduct = () => {
  const { loggedInUser } = useContext(UserContextType);
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

  //Add new product to database
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

  //Handle Alert visibility
  function handleShow() {
    setShow(!show);
  }

  //Handle submit button
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

  return (
    <>
      {loggedInUser?.isAdmin == true ? (
        <div className="add-product-container">
          <form onSubmit={handleSubmit} className="add-product-form">
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              style={{ marginTop: "10px" }}
            >
              Add a new product to the database
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                paddingBottom: "20px",
              }}
            >
              <BackToAdminButton />
              <EditProductsButton />
              <AdminOrdersButton />
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Product Title"
                  name="add-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Product Description"
                  name="add-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Price"
                  name="add-price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Image URL"
                  name="add-image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Stock Quantity"
                  name="add-inStock"
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
                    SUCCESS - New product add to the database. You might need to
                    refresh the page.
                  </Alert>
                ) : (
                  <Alert severity="success" style={{ display: "none" }}></Alert>
                )}
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "5px",
                gap: "30px",
              }}
            >
              <ScrollToTop />
            </div>
          </form>
        </div>
      ) : (
        <div
          style={{
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          You don't have access to this content.
        </div>
      )}
    </>
  );
};

export default AddNewProduct;
