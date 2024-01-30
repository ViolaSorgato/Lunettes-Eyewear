import * as React from "react";
import { useEffect, useState } from "react";
import { Product } from "../../context/product.context";
import { formatCurrency } from "../../utilities/formatCurrency";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import {
  AddProductButton,
  AdminOrdersButton,
  BackToAdminButton,
  ScrollToTop,
} from "../../components/AdminBtn/AdminBtn";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState("");
  const [inStock, setInStock] = useState<number>(0);

  const getAllProducts = async () => {
    try {
      const response = await fetch("api/products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //----------------------------Alert to confirm before delete-------------------------------------//

  const [open, setOpen] = React.useState(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseAlert = () => {
    setOpen(false);
    setIsDeleteConfirmation(false);
  };

  //----------------------------START - Deleting product from database-------------------------------------//

  const deleteProductFromDatabase = (id: string) => {
    const url = "api/products/" + id;
    fetch(url, { method: "DELETE" })
      .then((response) => {
        if (!response) {
          throw new Error(
            "ERROR - Something went wrong, the product with " +
              id +
              " is not deleted"
          );
        }

        getAllProducts();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //Eventlistener on delete button
  const handleDelete = async (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    event.preventDefault();
    deleteProductFromDatabase(id);
    setIsDeleteConfirmation(true);
  };

  //----------------------------END - Deleting product from database-------------------------------------//

  //----------------------------START - Update a product in database-------------------------------------//

  const updateProductInDatabase = (id: string) => {
    const url = "api/products/" + id;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        title: title,
        description: description,
        price: price,
        image: image,
        inStock: inStock,
        deleted: false,
      }),
    })
      .then((response) => {
        if (!response || response.status === 400) {
          setSuccess(false);
          throw new Error(
            "ERROR - Something went wrong, the product with " +
              id +
              " is not updated"
          );
        }
        if (title || description || price || image || inStock) {
          setSuccess(true);
          getAllProducts();
        }
      })

      .catch((e) => {
        console.log(e);
      });
  };

  const handleEdit = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.preventDefault();
    const selectedProduct = products.find((product) => product._id === id);

    if (selectedProduct) {
      setTitle(selectedProduct.title);
      setDescription(selectedProduct.description);
      setPrice(selectedProduct.price);
      setImage(selectedProduct.image);
      setInStock(selectedProduct.inStock);
    }
  };

  const handleUpdate = async (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    event.preventDefault();
    updateProductInDatabase(id);

    setTimeout(() => {
      handleShow();
    }, 400);
  };

  //----------------------------END - Update a product in database-------------------------------------//

  const [show, setShow] = useState<boolean>();
  const [success, setSuccess] = useState(false);

  function handleShow() {
    setShow(!show);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        <p style={{ fontSize: "larger" }}>
          Here you can manage your products. Click on a product to edit its
          properties.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            paddingTop: "30px",
          }}
        >
          <BackToAdminButton />
          <AddProductButton />
          <AdminOrdersButton />
        </div>
      </div>

      {products.map((product) => (
        <Accordion key={product.title}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              alignItems="center"
              marginLeft={"10%"}
              width={"80%"}
              justifyContent={"space-between"}
            >
              <Box>
                <img
                  src={product?.image}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </Box>

              <Box style={{ width: "300px" }}>
                <span className="product-title">{product?.title} </span>
              </Box>

              <Box>
                <span className="product-price ">
                  {product && formatCurrency(product?.price)}
                </span>
              </Box>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleClickOpen}
              >
                Delete
              </Button>

              <Dialog
                open={open}
                onClose={handleCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {!isDeleteConfirmation
                    ? "Are you sure you want to delete this product from the database?"
                    : "The product is now deleted"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {!isDeleteConfirmation
                      ? "This will delete the product from the database"
                      : ""}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => handleDelete(e, product._id)}
                    autoFocus
                  >
                    {!isDeleteConfirmation ? "YES" : ""}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCloseAlert}
                  >
                    {!isDeleteConfirmation ? "NO" : "CLOSE"}
                  </Button>
                </DialogActions>
              </Dialog>

              <Button
                onClick={(e) => handleEdit(e, product._id)}
                variant="contained"
                color="secondary"
                endIcon={<ExpandMore />}
              >
                Edit
              </Button>
            </Stack>
          </AccordionSummary>

          <AccordionDetails>
            <Box style={{ marginTop: "1rem" }}>
              {show && success ? (
                <Alert onClose={handleShow} severity="success">
                  SUCCESS - The product is updated!
                </Alert>
              ) : (
                <Alert severity="success" style={{ display: "none" }}></Alert>
              )}
            </Box>

            <Box style={{ marginTop: "1rem" }}>
              {show && !success ? (
                <Alert onClose={handleShow} severity="error">
                  ERROR - The product is not updated! Try again
                </Alert>
              ) : (
                <Alert severity="error" style={{ display: "none" }}></Alert>
              )}
            </Box>

            <Grid container spacing={2} alignItems={"center"}>
              <Grid item xs={12} md={12}>
                <span className="product-description">
                  {product.description}
                </span>
              </Grid>

              <Grid item xs={6} md={2}>
                <TextField
                  id="product-title"
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <TextField
                  id="product-desc"
                  label="Description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <TextField
                  id="product-price"
                  label="Price"
                  variant="outlined"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <TextField
                  id="product-image"
                  label="Image URL"
                  variant="outlined"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <TextField
                  id="product-instock"
                  label="In Stock"
                  variant="outlined"
                  value={inStock}
                  onChange={(e) => setInStock(Number(e.target.value))}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={(e) => handleUpdate(e, product._id)}
                >
                  UPDATE
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        <ScrollToTop />
      </div>
    </>
  );
}
