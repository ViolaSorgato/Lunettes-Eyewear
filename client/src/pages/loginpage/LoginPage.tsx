import {
  TextField,
  Button,
  Typography,
  Snackbar,
  AlertTitle,
  Alert,
  Stack,
} from "@mui/material";
import "./LoginPage.css";
import { UserType, UserContextType } from "../../context/user.context";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const { login, loggedInUser, isAdmin, alert, setAlert } =
    useContext(UserContextType);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user: UserType = {
      username,
      email,
      password,
    };

    setEmail("");
    setPassword("");
    setUsername("");

    isAdmin(user);
    setOpen(true);
    await login(user);
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(null);
    setOpen(false);
  };

  return (
    <>
      {loggedInUser?.isAdmin == true ? (
        <div className="account-container">
          <div>
            <p className="account-title">Welcome to your Admin page.</p>
          </div>
          <Stack direction="row" spacing={2}>
            <NavLink to="/addnewproduct" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "150px", height: "100px" }}
              >
                Add product
              </Button>
            </NavLink>

            <NavLink to="/adminproducts" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "150px", height: "100px" }}
              >
                Edit products
              </Button>
            </NavLink>

            <NavLink to="/adminorders" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "150px", height: "100px" }}
              >
                Admin orders
              </Button>
            </NavLink>
          </Stack>
        </div>
      ) : loggedInUser ? (
        <div className="account-container">
          <div>
            <p className="account-title">You are logged in as a member.</p>
          </div>
        </div>
      ) : (
        <div className="account-container">
          <form className="login-form" onSubmit={handleLogin}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              style={{ marginTop: "10px" }}
            >
              Sign In
            </Typography>
            <TextField
              required
              color="secondary"
              id="email"
              fullWidth={true}
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <br />
            <TextField
              required
              color="secondary"
              id="password"
              fullWidth={true}
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <br />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
            >
              Sign In
            </Button>{" "}
            <br />
            <NavLink
              to="/register"
              className="nav-link"
              style={{ textDecoration: "none" }}
            >
              <p className="title-list">New User? Register here.</p>
            </NavLink>
          </form>
        </div>
      )}

      {alert && (
        <Snackbar autoHideDuration={3000} open={open} onClose={handleClose}>
          <Alert
            elevation={6}
            variant="filled"
            severity={alert.type}
            onClose={handleClose}
            sx={{ width: "100%" }}
          >
            <AlertTitle>
              {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
            </AlertTitle>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default LoginPage;
