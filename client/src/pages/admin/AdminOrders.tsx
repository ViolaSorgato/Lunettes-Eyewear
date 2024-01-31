import { useEffect, useState } from "react";
import { CartItem } from "../../context/cart.context";
import { User } from "../../context/user.context";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { formatCurrency } from "../../utilities/formatCurrency";
import {
  AddProductButton,
  BackToAdminButton,
  EditProductsButton,
  ScrollToTop,
} from "../../components/AdminBtn/AdminBtn";

// Define the structure of a shipped order
interface ShippedOrder {
  orderItems: CartItem[];
  orderNumber?: number;
  shipped: boolean;
  customer: User;
  _id: string;
}

// AdminOrders component
export default function AdminOrders() {
  // State to hold the list of shipped orders
  const [orders, setOrders] = useState<ShippedOrder[]>([]);

  // Fetch the list of shipped orders from the server
  const getOrders = async () => {
    try {
      const response = await fetch("api/orders");
      const data = await response.json();
      setOrders(data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect to fetch orders when the component mounts
  useEffect(() => {
    getOrders();
  }, []);

  // State to handle the response of marking an order as shipped
  const [newOrder, setNewOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Function to mark an order as shipped
  const markAsShipped = async (id: string) => {
    try {
      const response = await fetch(`api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipped: true,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        setNewOrder(data);
        getOrders(); // Refresh the list of orders after marking as shipped
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle form submission (marking an order as shipped)
  const handleSubmit = async (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    event.preventDefault();
    markAsShipped(id);
  };

  //Handles Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  // Renders the component
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
        {orders.length === 0 ? (
          <p>There are no orders at the moment.</p>
        ) : (
          <p style={{ fontSize: "larger" }}>Here you can manage your orders.</p>
        )}
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
          <EditProductsButton />
        </div>
      </div>

      {/* Display orders */}
      {currentOrders.map((order) => (
        <Accordion key={order.orderNumber}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              alignItems="center"
              marginLeft={"10%"}
              width={"80%"}
              justifyContent={"space-between"}
            >
              <Box style={{ width: "300px" }}>
                <p style={{ fontWeight: "bold", paddingBottom: 7 }}>
                  Order Number: {order.orderNumber}
                </p>
              </Box>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Display shipping status */}
                {order.shipped ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<CheckCircleOutline />}
                  >
                    <p>Successfully shipped</p>
                  </Button>
                ) : (
                  <div>
                    {/* Button to mark an order as shipped */}
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={(e) => handleSubmit(e, order._id)}
                    >
                      Mark as shipped
                    </Button>
                  </div>
                )}
              </div>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Order Items</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{order.customer.username}</TableCell>
                  <TableCell>{order.customer.email}</TableCell>
                  <TableCell>
                    {order.orderItems.map((item) => (
                      <p key={item.title}>
                        {item.title} x {item.quantity} x {item.price}
                      </p>
                    ))}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(
                      order.orderItems.reduce(
                        (total, item) => total + item.quantity * item.price,
                        0
                      )
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      ))}
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
        {orders.length > 6 && (
          <>
            <Pagination
              count={Math.ceil(orders.length / ordersPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="secondary"
            />
            <ScrollToTop />
          </>
        )}
      </div>
    </>
  );
}
