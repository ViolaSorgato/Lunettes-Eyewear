import { useContext, useEffect, useState } from "react";
import { CartItem } from "../../context/cart.context";
import { UserContextType } from "../../context/user.context";
import "./MyOrders.css";
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
import { formatCurrency } from "../../utilities/formatCurrency";
import { ScrollToTop } from "../../components/AdminBtn/AdminBtn";

interface Order {
  orderItems: CartItem[];
  orderNumber?: number;
  shipped: boolean;
  _id: string;
}

const MyOrders = () => {
  const { loggedInUser } = useContext(UserContextType); // Use the UserContextType

  // State to hold the list of orders for the current customer
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

  // Fetch the list of orders for the current customer from the server
  const getMyOrders = async () => {
    try {
      if (loggedInUser) {
        const response = await fetch(
          `/api/orders/customer/${loggedInUser._id}`
        );
        const data = await response.json();
        console.log("Data fetched so I mean the ORDERS", data);
        setOrders(data.reverse());
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // useEffect to fetch orders when the component mounts
  useEffect(() => {
    getMyOrders();
  }, [loggedInUser]); // Add loggedInUser to dependencies to re-fetch orders when user changes

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

  return (
    <div className="myorders-container">
      <p className="myorders-title">My orders</p>
      {/* Render orders for the current customer */}
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
              <Box style={{ width: "300px" }}>
                <p style={{ fontWeight: "bold", paddingBottom: 7 }}>
                  Order Total:{" "}
                  {formatCurrency(
                    order.orderItems.reduce(
                      (total, item) => total + item.quantity * item.price,
                      0
                    )
                  )}
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
                  <Button variant="contained" color="secondary">
                    <p>On its way</p>
                  </Button>
                ) : (
                  <div>
                    {/* Button to mark an order as shipped */}
                    <Button variant="contained" color="primary">
                      Processing
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
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {order.orderItems.map((item) => (
                      <p key={item.title}>{item.title}</p>
                    ))}
                  </TableCell>
                  <TableCell>
                    {order.orderItems.map((item) => (
                      <p key={item.title}>{item.quantity}</p>
                    ))}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {order.orderItems.map((item) => (
                      <p key={item.title}>{item.price} kr</p>
                    ))}
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
        <Pagination
          count={Math.ceil(orders.length / ordersPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
        />
        <ScrollToTop />
      </div>
    </div>
  );
};

export default MyOrders;
