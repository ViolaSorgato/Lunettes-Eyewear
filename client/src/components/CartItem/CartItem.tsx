import { useShoppingCart } from "../../context/cart.context";
import { useProductContext } from "../../context/product.context";
import "../CartItem/CartItem.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { formatCurrency } from "../../utilities/formatCurrency";

type CartItemProps = {
  id: string;
  quantity: number;
};

export default function CartItem({ id, quantity }: CartItemProps) {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();
  const { products } = useProductContext();

  const item = products.find((i) => i._id === id);
  if (item === null) return null;

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="start">
        <Box>
          <img
            src={item?.image}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </Box>

        <Box>
          <span className="cartitem-title">{item?.title} </span>
          <br />

          <span className="cartitem-price ">
            {item && formatCurrency(item?.price * quantity)}
          </span>
        </Box>

        <Stack
          direction="row"
          spacing={0.5}
          justifyContent="center"
          alignItems="center"
        >
          {quantity > 1 ? (
            <Button
              className="cartitem-qty-btn"
              onClick={() => item && decreaseCartQuantity(item?._id)}
            >
              <RemoveIcon className="icon" />
            </Button>
          ) : (
            <Button className="cartitem-qty-btn">
              <RemoveIcon className="icon" />
            </Button>
          )}
          <Box className="cartitem-qty-btn">
            <div className="qty-div">x {quantity}</div>
          </Box>
          <Button
            className="cartitem-qty-btn"
            onClick={() => item && increaseCartQuantity(item?._id)}
          >
            <AddIcon className="icon" />
          </Button>

          <Button
            className="cartitem-qty-btn"
            onClick={() => item && removeFromCart(item?._id)}
          >
            <DeleteForeverOutlinedIcon className="icon" />
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
