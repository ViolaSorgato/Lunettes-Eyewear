import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  AlertTitle,
  Alert,
} from "@mui/material";
import "./LoginPage.css";
import { UserType, UserContextType } from "../../context/user.context";
import { useContext, useState } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
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

    const isAdminUser = isAdmin(user);
    console.log("Is Admin:", isAdminUser);
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
            <p className="account-title">You are logged in as an Admin.</p>
          </div>
          <NavLink to="/admin">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AdminPanelSettingsIcon />}
            >
              Go to Admin Panel
            </Button>
          </NavLink>
        </div>
      ) : loggedInUser ? (

        <div className="account-container">
          <div>
            <p className="account-title">You are logged in as a member.</p>

          </div>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <Box
            sx={{
              width: ["95%", "80%", "50%"],
              height: 480,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 5,
              boxShadow: 3,
              borderRadius: 2,
              px: 4,
              py: 6,
            }}
          >
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
              id="standard-required"
              fullWidth={true}
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <br />
            <TextField
              required
              color="secondary"
              id="standard-required"
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
          </Box>
        </form>
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
