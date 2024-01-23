import { useState, useContext } from "react";
import { UserContextType } from "../../context/user.context";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  AlertTitle,
  Alert,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const { register, registeredUser, alert, setAlert, setRegisteredUser } =
    useContext(UserContextType);

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
    };

    setUsername("");
    setEmail("");
    setPassword("");

    setOpen(true);
    await register(user);
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
      {registeredUser ? (
        <Stack
          direction={{ sm: "column", md: "row" }}
          spacing={10}
          marginLeft="10%"
          width="80%"
          justifyContent={"space-between"}
        >
          <div className="message-container">
            <p className="title-list">
              Welcome to Lunettes Eyewear! Congratulations on becoming a part of
              our stylish eyewear community. Feel free to browse our collection
              and discover the eyewear that suits your lifestyle. If you have
              any questions or need assistance, our team is here to help.
            </p>
            <p className="title-list"></p>
            <NavLink
              to="/login"
              className="nav-link"
              style={{ textDecoration: "none" }}
            >
              <p>Log in here to access your account.</p>
            </NavLink>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setRegisteredUser(null)}
            >
              Click here to register with a different account.
            </div>
          </div>

          <div className="picture"></div>
        </Stack>
      ) : (
        <form onSubmit={handleRegister}>
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
              Register
            </Typography>
            <TextField
              required
              color="secondary"
              id="username"
              fullWidth={true}
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <TextField
              required
              color="secondary"
              id="email"
              fullWidth={true}
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
              helperText="Password should be at least 6 characters long"
            />
            <br />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
            >
              Register
            </Button>
            <br />
            <NavLink
              to="/login"
              className="nav-link"
              style={{ textDecoration: "none" }}
            >
              <p className="title-list">Already have an account? Login here.</p>
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

export default RegisterPage;
